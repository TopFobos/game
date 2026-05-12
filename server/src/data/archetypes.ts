// server/src/data/archetypes.ts
import { DictatorArchetype } from '../shared/types';

export interface ArchetypeData {
  id: DictatorArchetype;
  name: string;
  description: string;
  passiveBonuses: Record<string, number>;
  specialAbility: {
    name: string;
    description: string;
    uses: number;           // сколько раз за игру (0 = без ограничений, но с кулдауном)
    cooldown: number;       // ходов
  };
}

export const Archetypes: Record<DictatorArchetype, ArchetypeData> = {
  IronGeneral: {
    id: 'IronGeneral',
    name: 'Жёсткий генерал',
    description: 'Прагматичный милитарист, ставящий порядок и силу превыше всего.',
    passiveBonuses: {
      militaryPower: 15,
      externalPressure: -10,
      fear: 8
    },
    specialAbility: {
      name: 'Железный кулак',
      description: 'Мгновенно +30 militaryPower и +20 fear на 2 хода, но +15 radicalization.',
      uses: 1,
      cooldown: 0
    }
  },

  CharismaticPopulist: {
    id: 'CharismaticPopulist',
    name: 'Харизматичный популист',
    description: 'Мастер манипуляции толпой и создания образа "своего парня".',
    passiveBonuses: {
      legitimacy: 12,
      discontent: -10
    },
    specialAbility: {
      name: 'Народный трибун',
      description: 'Мгновенно +25 legitimacy и +20 лояльности двух случайных фракций.',
      uses: 2,
      cooldown: 0
    }
  },

  TechnocratReformer: {
    id: 'TechnocratReformer',
    name: 'Технократ-реформатор',
    description: 'Холодный рационалист, верящий в эффективность и технологии.',
    passiveBonuses: {
      economy: 10,
      internationalImage: 10,
      corruption: -5
    },
    specialAbility: {
      name: 'Цифровой контроль',
      description: 'Автоматически подавляет один кризис и даёт +20 stability.',
      uses: 1,
      cooldown: 0
    }
  },

  ReligiousLeader: {
    id: 'ReligiousLeader',
    name: 'Религиозный лидер',
    description: 'Духовный авторитет, использующий веру как оружие.',
    passiveBonuses: {
      stability: 12,
      radicalization: -8
    },
    specialAbility: {
      name: 'Священная миссия',
      description: '+30 лояльности всех фракций на 1 ход.',
      uses: 1,
      cooldown: 0
    }
  },

  ClanChief: {
    id: 'ClanChief',
    name: 'Клановый вождь',
    description: 'Глава мощного клана, полагающийся на личную преданность.',
    passiveBonuses: {
      factionLoyalty: 20 // к своей основной фракции
    },
    specialAbility: {
      name: 'Клановая мобилизация',
      description: '+25 militaryPower от лояльных клановых структур.',
      uses: 2,
      cooldown: 0
    }
  },

  SecuritySilovik: {
    id: 'SecuritySilovik',
    name: 'Силовик спецслужб',
    description: 'Параноик с огромным опытом тайных операций.',
    passiveBonuses: {
      fear: 15,
      detectionResistance: 20
    },
    specialAbility: {
      name: 'Ночь длинных ножей',
      description: 'Попытка нейтрализации (устранения) одного игрока.',
      uses: 1,
      cooldown: 0
    }
  },

  RadicalIdeologue: {
    id: 'RadicalIdeologue',
    name: 'Радикальный идеолог',
    description: 'Фанатик идеи, готовый сжечь систему ради "нового порядка".',
    passiveBonuses: {
      radicalization: 18,
      discontent: 10
    },
    specialAbility: {
      name: 'Великая чистка',
      description: 'Резкий рост fear и radicalization, но высокий риск революции.',
      uses: 1,
      cooldown: 0
    }
  },

  ShadowFigure: {
    id: 'ShadowFigure',
    name: 'Теневая фигура',
    description: 'Невидимый кукловод, мастер интриг и манипуляций.',
    passiveBonuses: {
      detectionResistance: 25,
      corruption: 10
    },
    specialAbility: {
      name: 'Призрачный совет',
      description: 'Имитирует любое действие другого игрока или крадёт компромат.',
      uses: 2,
      cooldown: 0
    }
  }
};

export default Archetypes;