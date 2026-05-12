// server/src/utils/formulas.ts
import { OpenParameters } from '../shared/types';

export const formulas = {
  /** Сила голоса на Государственном Совете */
  voicePower: (legitimacy: number, roleBonus: number, factionLoyaltySum: number): number => {
    return Math.floor(legitimacy / 20) + roleBonus + Math.floor(factionLoyaltySum / 30);
  },

  /** Шанс успеха тайного действия */
  actionSuccessChance: (
    baseChance: number,
    loyalty: number,
    paranoia: number,
    archetypeBonus: number = 0
  ): number => {
    return Math.max(5, Math.min(95,
      baseChance + (loyalty * 0.35) - (paranoia * 0.45) + archetypeBonus
    ));
  },

  /** Шанс обнаружения действия */
  detectionChance: (paranoia: number, actionStealth: number): number => {
    return Math.min(80, paranoia * 0.6 - actionStealth);
  },

  /** Шанс переворота */
  coupChance: (conspiracy: number, militaryPower: number, stability: number, support: number): number => {
    return (conspiracy * 0.55) + (militaryPower * 0.25) + (support * 0.2) - (stability * 0.35);
  },

  /** Проверка революции */
  isRevolution: (params: OpenParameters): boolean => {
    return params.discontent > 82 &&
           params.legitimacy < 28 &&
           params.radicalization > 68 &&
           params.stability < 35;
  },

  /** Тотальный коллапс */
  isTotalCollapse: (params: OpenParameters): boolean => {
    return Object.values(params).every(value => value <= 15);
  },

  /** Гражданская война (3+ региона в бунте) — упрощённо */
  isCivilWar: (radicalization: number, discontent: number): boolean => {
    return radicalization > 75 && discontent > 70;
  },

  /** Обновление параметров государства */
  updateParameters: (params: OpenParameters): OpenParameters => {
    const newParams = { ...params };

    // Экономика
    newParams.economy = Math.max(0, Math.min(100,
      newParams.economy 
      - (newParams.corruption * 0.12) 
      - (newParams.externalPressure * 0.08) 
      + (newParams.militaryPower * 0.04)
    ));

    // Стабильность
    newParams.stability = Math.max(0, Math.min(100,
      newParams.stability 
      - (newParams.discontent * 0.22) 
      - (newParams.radicalization * 0.25) 
      + (newParams.legitimacy * 0.18)
    ));

    // Недовольство
    newParams.discontent = Math.max(0, Math.min(100,
      newParams.discontent 
      + (newParams.economy < 40 ? 12 : 0) 
      + (newParams.fear * 0.12) 
      - (newParams.legitimacy * 0.2)
    ));

    // Радикализация
    newParams.radicalization = Math.max(0, Math.min(100,
      newParams.radicalization 
      + (newParams.discontent * 0.18) 
      + (newParams.corruption * 0.09)
    ));

    // Внешнее давление
    newParams.externalPressure = Math.max(0, Math.min(100,
      newParams.externalPressure 
      + (newParams.internationalImage < 40 ? 18 : 0) 
      - (newParams.militaryPower * 0.1)
    ));

    // Ограничение всех параметров
    Object.keys(newParams).forEach(key => {
      newParams[key as keyof OpenParameters] = Math.max(0, Math.min(100, newParams[key as keyof OpenParameters]));
    });

    return newParams;
  }
};

export default formulas;