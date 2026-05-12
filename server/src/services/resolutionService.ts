// server/src/services/resolutionService.ts
import formulas from '../utils/formulas';
import CountryState from '../models/CountryState';
import Player from '../models/Player';
import { OpenParameters } from '../shared/types';

export class ResolutionService {
  async resolveTurn(roomId: string) {
    const countryDoc = await CountryState.findOne({ roomId });
    if (!countryDoc) throw new Error('Country state not found');

    // Безопасное извлечение параметров
    const openParams = countryDoc.openParams as OpenParameters;

    const players = await Player.find({ roomId, isAlive: true }).lean();

    // Обновляем параметры государства
    const updatedParams: OpenParameters = formulas.updateParameters(openParams);

    // Сохраняем изменения
    countryDoc.openParams = updatedParams;
    await countryDoc.save();

    // Проверки поражения
    if (formulas.isRevolution(updatedParams)) {
      return { gameOver: true, reason: 'revolution' };
    }

    if (formulas.isTotalCollapse(updatedParams)) {
      return { gameOver: true, reason: 'total_collapse' };
    }

    if (formulas.isCivilWar(updatedParams.radicalization, updatedParams.discontent)) {
      return { gameOver: true, reason: 'civil_war' };
    }

    // Проверка консолидации власти
    for (const player of players) {
      if (player.hasConsolidatedPower === true) {
        console.log(`[Resolution] Игрок ${player.username || player.userId} удерживает власть`);
      }
    }

    return { 
      gameOver: false, 
      parameters: updatedParams 
    };
  }

  async checkCoupAttempt(roomId: string, playerId: string) {
    const countryDoc = await CountryState.findOne({ roomId });
    const player = await Player.findOne({ roomId, userId: playerId });

    if (!countryDoc || !player) {
      return { success: false, chance: 0 };
    }

    const openParams = countryDoc.openParams as OpenParameters;
    const hiddenParams = countryDoc.hiddenParams as any;

    const conspiracy = hiddenParams?.conspiracyLevel || 30;

    const chance = formulas.coupChance(
      conspiracy,
      openParams.militaryPower,
      openParams.stability,
      player.secretSupport
    );

    const success = Math.random() * 100 < Math.max(5, Math.min(95, chance));

    return { 
      success, 
      chance: Math.round(chance * 100) / 100 
    };
  }
}

export default new ResolutionService();