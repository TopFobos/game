// server/src/data/secretActions.ts
export interface SecretAction {
  id: string;
  name: string;
  cost: number;                    // очки действий (1-3)
  resourceCost?: { finance?: number; influence?: number; agents?: number };
  baseSuccessChance: number;
  stealth: number;                 // сопротивление обнаружению
  description: string;
  category: 'manipulation' | 'force' | 'information' | 'political';
  effects: Record<string, number>;
  riskOnFail?: Record<string, number>;
}

export const SecretActions: SecretAction[] = [
  {
    id: 'bribe_faction',
    name: 'Подкуп фракции',
    cost: 1,
    resourceCost: { finance: 4 },
    baseSuccessChance: 75,
    stealth: 10,
    description: 'Увеличить лояльность выбранной фракции',
    category: 'manipulation',
    effects: { factionLoyalty: 18 },
    riskOnFail: { paranoia: 8 }
  },
  {
    id: 'gather_compromat',
    name: 'Сбор компромата',
    cost: 1,
    resourceCost: { agents: 1 },
    baseSuccessChance: 65,
    stealth: 15,
    description: 'Получить компромат на выбранного игрока',
    category: 'information',
    effects: { compromat: 1 }
  },
  {
    id: 'disinformation_campaign',
    name: 'Кампания дезинформации',
    cost: 2,
    resourceCost: { influence: 3 },
    baseSuccessChance: 70,
    stealth: 12,
    description: 'Снизить legitimacy цели на 12–20',
    category: 'political',
    effects: { targetLegitimacy: -16 }
  },
  {
    id: 'sabotage_parameter',
    name: 'Саботаж параметра',
    cost: 2,
    resourceCost: { finance: 5 },
    baseSuccessChance: 60,
    stealth: 8,
    description: 'Ухудшить один открытый параметр государства',
    category: 'force',
    effects: { parameterDamage: -14 }
  },
  {
    id: 'coup_preparation',
    name: 'Подготовка переворота',
    cost: 3,
    resourceCost: { influence: 6, agents: 2 },
    baseSuccessChance: 45,
    stealth: 5,
    description: 'Значительно увеличить уровень заговора',
    category: 'force',
    effects: { conspiracyLevel: 25 }
  },
  {
    id: 'strengthen_military',
    name: 'Укрепление военных связей',
    cost: 1,
    resourceCost: { finance: 6 },
    baseSuccessChance: 80,
    stealth: 20,
    description: '+12 militaryPower',
    category: 'manipulation',
    effects: { militaryPower: 12 }
  },
  {
    id: 'media_manipulation',
    name: 'Манипуляция СМИ',
    cost: 1,
    resourceCost: { influence: 2 },
    baseSuccessChance: 85,
    stealth: 18,
    description: '+10 legitimacy или -10 discontent',
    category: 'political',
    effects: { legitimacy: 10, discontent: -8 }
  },
  {
    id: 'foreign_lobbying',
    name: 'Иностранное лоббирование',
    cost: 2,
    resourceCost: { finance: 8 },
    baseSuccessChance: 55,
    stealth: 10,
    description: 'Снизить externalPressure',
    category: 'political',
    effects: { externalPressure: -15 }
  },
  {
    id: 'assassination_attempt',
    name: 'Попытка устранения',
    cost: 3,
    resourceCost: { agents: 3, influence: 8 },
    baseSuccessChance: 35,
    stealth: 3,
    description: 'Высокий риск для цели',
    category: 'force',
    effects: { targetEliminationChance: 40 }
  },
  {
    id: 'spread_rumors',
    name: 'Распространение слухов',
    cost: 1,
    resourceCost: { influence: 1 },
    baseSuccessChance: 90,
    stealth: 25,
    description: 'Повысить paranoia у цели',
    category: 'information',
    effects: { targetParanoia: 12 }
  }
];

export default SecretActions;