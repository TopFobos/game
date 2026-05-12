// server/src/services/playerService.ts
import Player from '../models/Player';
import { PublicRole, DictatorArchetype } from '../shared/types';
import Archetypes from '../data/archetypes';

const publicRoles: PublicRole[] = [
  'MinisterOfDefense',
  'DirectorOfSpecialServices',
  'MediaMagnate',
  'Oligarch',
  'PopulistPolitician',
  'RegionalGovernor',
  'ConstitutionalCourtChairman'
];

const archetypes: DictatorArchetype[] = [
  'IronGeneral', 'CharismaticPopulist', 'TechnocratReformer',
  'ReligiousLeader', 'ClanChief', 'SecuritySilovik',
  'RadicalIdeologue', 'ShadowFigure'
];

export class PlayerService {
  async createPlayer(userId: string, username: string, roomId: string) {
    const publicRole = publicRoles[Math.floor(Math.random() * publicRoles.length)];
    const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];

    const player = await Player.create({
      userId,
      roomId,
      username,
      publicRole,
      archetype,
      resources: {
        influence: 10,
        finance: 8,
        agents: 3
      },
      secretSupport: 30,
      personalParanoia: 0,
      isAlive: true,
      hasConsolidatedPower: false
    });

    return player;
  }

  async getPlayer(roomId: string, userId: string) {
    return Player.findOne({ roomId, userId });
  }

  async getAllPlayersInRoom(roomId: string) {
    return Player.find({ roomId, isAlive: true });
  }

  // Исправленный метод
  applyArchetypeBonuses(player: any, countryParams: any) {
    const archetypeData = Archetypes[player.archetype as keyof typeof Archetypes];
    if (!archetypeData?.passiveBonuses) return;

    Object.entries(archetypeData.passiveBonuses).forEach(([key, value]) => {
      if (key in countryParams) {
        countryParams[key as keyof typeof countryParams] = 
          (countryParams[key as keyof typeof countryParams] || 0) + value;
      }
    });
  }
}

export default new PlayerService();