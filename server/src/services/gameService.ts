// server/src/services/gameService.ts
import GameRoom from '../models/GameRoom';
import CountryState from '../models/CountryState';
import EventLog from '../models/EventLog';
import { getIO } from '../config/socket';
import formulas from '../utils/formulas';
import EventsPool from '../data/eventsPool';
import PlayerService from './playerService';
import ResolutionService from './resolutionService';
import ActionService from './actionService';
import { OpenParameters } from '../shared/types';

export class GameService {
  async createRoom(hostId: string, username: string) {
    const roomId = `ROOM_${Date.now().toString(36).toUpperCase()}`;

    const country = await CountryState.create({ roomId });
    const hostPlayer = await PlayerService.createPlayer(hostId, username, roomId);

    const gameRoom = await GameRoom.create({
      roomId,
      hostId,
      players: [hostPlayer._id],
      countryState: country._id,
      currentPhase: 'lobby',
      turn: 0,
      status: 'lobby',
      settings: { maxPlayers: 6, scenario: 'standard' }
    });

    return gameRoom;
  }

  async joinRoom(roomId: string, userId: string, username: string) {
    const room = await GameRoom.findOne({ roomId });
    if (!room) throw new Error('Комната не найдена');
    if (room.players.length >= 6) throw new Error('Комната заполнена');

    const player = await PlayerService.createPlayer(userId, username, roomId);
    room.players.push(player._id);
    await room.save();

    return { room, player };
  }

  async getRoomState(roomId: string) {
    const room = await GameRoom.findOne({ roomId })
      .populate('players')
      .populate('countryState');

    if (!room) throw new Error('Комната не найдена');

    return {
      roomId: room.roomId,
      status: room.status,
      currentPhase: room.currentPhase,
      turn: room.turn,
      players: room.players,
      countryState: room.countryState,
      settings: room.settings
    };
  }

  async startGame(roomId: string) {
    const room = await GameRoom.findOne({ roomId });
    if (!room) throw new Error('Комната не найдена');

    room.status = 'playing';
    room.turn = 1;
    room.currentPhase = 'event';
    await room.save();

    const io = getIO();
    
    console.log(`🎮 Игра в комнате ${roomId} запущена`);

    // Важно: отправляем всем
    io.to(roomId).emit('phaseChanged', { 
      phase: 'event', 
      turn: 1 
    });

    // Запускаем первый этап событий
    await this.processNextPhase(roomId);
  }

  async processNextPhase(roomId: string) {
    const room = await GameRoom.findOne({ roomId }).populate('countryState');
    if (!room) return;

    const io = getIO();

    switch (room.currentPhase) {
      case 'event':
        await this.handleEventPhase(room);
        room.currentPhase = 'secret_actions';   // сразу переходим к действиям
        break;

      case 'secret_actions':
        room.currentPhase = 'resolution';
        break;

      case 'resolution':
        const result = await ResolutionService.resolveTurn(roomId);
        room.turn += 1;
        room.currentPhase = 'event';

        if (result.gameOver) {
          io.to(roomId).emit('gameOver', { reason: result.reason });
          room.status = 'ended';
          await room.save();
          return;
        }
        break;
    }

    await room.save();

    io.to(roomId).emit('phaseChanged', {
      phase: room.currentPhase,
      turn: room.turn
    });
  }

  private async handleEventPhase(room: any) {
    const openParams = room.countryState.openParams as OpenParameters;
    const stability = openParams.stability ?? 50;
    const numEvents = stability < 45 ? 3 : stability < 65 ? 2 : 1;

    const shuffled = [...EventsPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numEvents);

    const io = getIO();

    for (const event of selected) {
      const effects: Partial<OpenParameters> = { ...event.effects };

      Object.keys(effects).forEach((key) => {
        const variance = Math.floor(Math.random() * (event.randomVariance * 2 + 1)) - event.randomVariance;
        (effects as any)[key] = ((effects as any)[key] || 0) + variance;
      });

      await EventLog.create({
        roomId: room.roomId,
        turn: room.turn,
        eventName: event.name,
        category: event.category,
        severity: event.baseSeverity,
        effects,
        isPublic: event.isPublic
      });

      Object.assign(room.countryState.openParams, effects);

      io.to(room.roomId).emit('newEvent', {
        name: event.name,
        description: event.description,
        flavorText: event.flavorText,
        effects,
        severity: event.baseSeverity,
        time: new Date().toLocaleTimeString()
      });
    }

    await room.countryState.save();
  }

  async executeSecretAction(roomId: string, playerId: string, actionId: string, target?: string) {
    return ActionService.executeSecretAction(roomId, playerId, actionId, target);
  }
}

export default new GameService();