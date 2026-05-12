// server/src/sockets/gameSocket.ts
import { getIO } from '../config/socket';
import GameService from '../services/gameService';

export const setupGameSockets = () => {
  const io = getIO();

  io.on('connection', (socket) => {
    console.log(`🟢 Клиент подключился: ${socket.id}`);

    let currentUserId: string | null = null;

    // Создание комнаты
    socket.on('createRoom', async ({ username }, callback) => {
      try {
        if (!username || typeof username !== 'string' || username.trim().length < 2) {
          const errorMsg = 'Имя пользователя обязательно (минимум 2 символа)';
          if (typeof callback === 'function') callback({ success: false, error: errorMsg });
          return socket.emit('error', { message: errorMsg });
        }

        const userId = `user_${Date.now()}_${socket.id.slice(0, 8)}`;
        currentUserId = userId;

        const room = await GameService.createRoom(userId, username.trim());

        socket.join(room.roomId);

        console.log(`✅ Создана комната ${room.roomId} игроком ${username}`);

        const response = { success: true, roomId: room.roomId };
        if (typeof callback === 'function') callback(response);

        socket.emit('roomInfo', {
          playerCount: 1,
          isHost: true,
          phase: 'lobby',
          turn: 0
        });

        io.to(room.roomId).emit('playerJoined', {
          username,
          message: `${username} создал комнату`
        });

      } catch (error: any) {
        console.error('Ошибка создания комнаты:', error);
        const errorMsg = error.message || 'Не удалось создать комнату';
        if (typeof callback === 'function') callback({ success: false, error: errorMsg });
        else socket.emit('error', { message: errorMsg });
      }
    });

    // Присоединение к комнате
    socket.on('joinRoom', async ({ roomId, username }, callback) => {
      try {
        if (!roomId || !username) {
          const errorMsg = 'roomId и username обязательны';
          if (typeof callback === 'function') callback({ success: false, error: errorMsg });
          return socket.emit('error', { message: errorMsg });
        }

        const userId = `user_${Date.now()}_${socket.id.slice(0, 8)}`;
        currentUserId = userId;

        await GameService.joinRoom(roomId, userId, username.trim());

        socket.join(roomId);

        console.log(`👥 ${username} присоединился к комнате ${roomId}`);

        const response = { success: true };
        if (typeof callback === 'function') callback(response);

        io.to(roomId).emit('playerJoined', {
          username,
          message: `${username} присоединился к игре`
        });

        setTimeout(() => {
          io.to(roomId).emit('refreshRoomInfo');
        }, 400);

      } catch (error: any) {
        console.error('Ошибка присоединения:', error);
        const errorMsg = error.message || 'Не удалось присоединиться';
        if (typeof callback === 'function') callback({ success: false, error: errorMsg });
        else socket.emit('error', { message: errorMsg });
      }
    });

    // Получение информации о комнате
    socket.on('getRoomInfo', async ({ roomId }, callback) => {
      try {
        const roomState = await GameService.getRoomState(roomId);
        const players = Array.isArray(roomState.players) ? roomState.players : [];
        const playerCount = players.length || 1;

        let isHost = false;
        if (players.length > 0 && currentUserId) {
          const firstPlayer = players[0] as any;
          let hostUserId: string | undefined = firstPlayer?.userId || 
                                               firstPlayer?._doc?.userId || 
                                               (typeof firstPlayer?.get === 'function' ? firstPlayer.get('userId') : undefined);

          if (hostUserId) {
            isHost = hostUserId.includes(currentUserId.split('_')[2] || '');
          }
        }

        const response = {
          playerCount,
          isHost,
          phase: roomState.currentPhase || 'lobby',
          turn: roomState.turn || 0
        };

        socket.emit('roomInfo', response);
        if (typeof callback === 'function') callback(response);
      } catch (error) {
        console.error('Ошибка getRoomInfo:', error);
      }
    });

    // Запуск игры
    socket.on('startGame', async ({ roomId }, callback) => {
      try {
        await GameService.startGame(roomId);
        if (typeof callback === 'function') callback({ success: true });
      } catch (error: any) {
        const errorMsg = error.message || 'Ошибка запуска игры';
        if (typeof callback === 'function') callback({ success: false, error: errorMsg });
        else socket.emit('error', { message: errorMsg });
      }
    });

    // Выполнение тайного действия
    socket.on('performSecretAction', async (data) => {
      try {
        if (!currentUserId) {
          throw new Error('Пользователь не идентифицирован');
        }

        const result = await GameService.executeSecretAction(
          data.roomId,
          currentUserId,
          data.actionId,
          data.target
        );

        io.to(data.roomId).emit('actionResult', result);
      } catch (error: any) {
        console.error('Ошибка выполнения действия:', error);
        socket.emit('actionError', { message: error.message || 'Ошибка выполнения действия' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔴 Клиент отключился: ${socket.id}`);
    });
  });
};