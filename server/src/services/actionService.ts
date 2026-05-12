// server/src/services/actionService.ts
import formulas from '../utils/formulas';
import SecretActions from '../data/secretActions';
import ActionLog from '../models/ActionLog';
import Player from '../models/Player';
import CountryState from '../models/CountryState';

export class ActionService {
  async executeSecretAction(roomId: string, playerId: string, actionId: string, target?: string) {
    try {
      const action = SecretActions.find(a => a.id === actionId);
      if (!action) throw new Error('Действие не найдено');

      const player = await Player.findOne({ userId: playerId, roomId });
      const country = await CountryState.findOne({ roomId });

      if (!player || !country) throw new Error('Игрок или государство не найдено');

      const resources = player.resources || { influence: 0, finance: 0, agents: 0 };

      // Проверка ресурсов
      if (action.resourceCost?.finance && resources.finance < action.resourceCost.finance) {
        throw new Error('Недостаточно финансов');
      }
      if (action.resourceCost?.influence && resources.influence < action.resourceCost.influence) {
        throw new Error('Недостаточно влияния');
      }
      if (action.resourceCost?.agents && resources.agents < action.resourceCost.agents) {
        throw new Error('Недостаточно агентов');
      }

      const successChance = formulas.actionSuccessChance(
        action.baseSuccessChance,
        65,
        player.personalParanoia || 0,
        0
      );

      const success = Math.random() * 100 < successChance;

      let effects = success ? { ...action.effects } : { ...(action.riskOnFail || {}) };

      // Логирование
      await ActionLog.create({
        roomId,
        turn: 1,
        playerId,
        actionType: actionId,
        target,
        success,
        effects
      });

      // Списание ресурсов
      if (action.resourceCost?.finance) resources.finance -= action.resourceCost.finance;
      if (action.resourceCost?.influence) resources.influence -= action.resourceCost.influence;
      if (action.resourceCost?.agents) resources.agents -= action.resourceCost.agents;

      player.resources = resources;
      await player.save();

      return {
        success,
        actionId,
        target,
        effects,
        message: success ? 'Действие успешно выполнено!' : 'Действие провалилось'
      };
    } catch (error: any) {
      console.error('Ошибка выполнения действия:', error);
      throw error;
    }
  }
}

export default new ActionService();