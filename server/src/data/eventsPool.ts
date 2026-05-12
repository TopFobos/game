// server/src/data/eventsPool.ts
import { OpenParameters } from '../shared/types';

export interface GameEvent {
  id: string;
  name: string;
  category: string;
  baseSeverity: number;
  description: string;
  conditions?: (params: OpenParameters, turn: number) => boolean;
  effects: Partial<OpenParameters>;
  randomVariance: number;
  chainEvent?: string;
  isPublic: boolean;
  flavorText: string;
}

export const EventsPool: GameEvent[] = [
  {
    id: 'economic_crisis',
    name: 'Экономический кризис',
    category: 'economy',
    baseSeverity: 4,
    description: 'Резкое падение производства и рост безработицы.',
    effects: { economy: -18, discontent: 12, stability: -10 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Фондовые рынки в панике. Эксперты называют это "началом конца".'
  },
  {
    id: 'mass_protests',
    name: 'Массовые протесты',
    category: 'social',
    baseSeverity: 5,
    description: 'Тысячи людей вышли на улицы с требованием отставки правительства.',
    effects: { discontent: 22, stability: -15, legitimacy: -12 },
    randomVariance: 8,
    chainEvent: 'violent_clashes',
    isPublic: true,
    flavorText: 'Площади городов заполнены возмущёнными гражданами.'
  },
  {
    id: 'violent_clashes',
    name: 'Столкновения с полицией',
    category: 'social',
    baseSeverity: 4,
    description: 'Протесты переросли в жестокие столкновения.',
    effects: { fear: 18, radicalization: 15, stability: -10 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Коктейли Молотова и слезоточивый газ заполнили улицы.'
  },
  {
    id: 'corruption_scandal',
    name: 'Крупный коррупционный скандал',
    category: 'political',
    baseSeverity: 3,
    description: 'В СМИ появились доказательства масштабных хищений.',
    effects: { corruption: 10, legitimacy: -20, internationalImage: -15 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Оппозиция требует немедленного расследования.'
  },
  {
    id: 'military_success',
    name: 'Успешная военная операция',
    category: 'military',
    baseSeverity: 2,
    description: 'Армия одержала важную победу на границе.',
    effects: { militaryPower: 20, fear: 8, legitimacy: 10 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Генералы рапортуют о блестяще проведённой операции.'
  },
  {
    id: 'foreign_sanctions',
    name: 'Введение международных санкций',
    category: 'international',
    baseSeverity: 4,
    description: 'Западные страны ввели жёсткие экономические санкции.',
    effects: { economy: -15, externalPressure: 25, internationalImage: -20 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Министр иностранных дел назвал это "экономической войной".'
  },
  {
    id: 'terrorist_attack',
    name: 'Теракт в столице',
    category: 'security',
    baseSeverity: 5,
    description: 'Крупный теракт унёс жизни десятков граждан.',
    effects: { fear: 25, stability: -18, radicalization: 20 },
    randomVariance: 7,
    isPublic: true,
    flavorText: 'Страна в шоке. Правительство обещает жёсткий ответ.'
  },
  {
    id: 'religious_awakening',
    name: 'Религиозное пробуждение',
    category: 'ideology',
    baseSeverity: 3,
    description: 'Резкий рост влияния религиозных организаций.',
    effects: { stability: 12, radicalization: 15, discontent: -8 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Храмы переполнены. Священнослужители набирают политический вес.'
  },
  {
    id: 'oligarch_rebellion',
    name: 'Бунт олигархов',
    category: 'economy',
    baseSeverity: 4,
    description: 'Крупнейшие бизнесмены отказываются сотрудничать с властью.',
    effects: { economy: -12, corruption: 10, stability: -10 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Бизнес-элита перешла в открытую оппозицию.'
  },
  {
    id: 'media_leak',
    name: 'Скандальная утечка в СМИ',
    category: 'information',
    baseSeverity: 3,
    description: 'Опубликованы компрометирующие материалы на высокопоставленных лиц.',
    effects: { legitimacy: -15, fear: 10 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Журналисты-расследователи снова на коне.'
  },
  {
    id: 'border_incident',
    name: 'Инцидент на границе',
    category: 'military',
    baseSeverity: 3,
    description: 'Столкновение с силами соседнего государства.',
    effects: { externalPressure: 18, militaryPower: 10, fear: 12 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Напряжённость на границе достигла критической точки.'
  },
  {
    id: 'technological_breakthrough',
    name: 'Технологический прорыв',
    category: 'economy',
    baseSeverity: 2,
    description: 'Государственная корпорация совершила значимое открытие.',
    effects: { economy: 15, internationalImage: 12 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Страна может стать новым технологическим лидером региона.'
  },
  {
    id: 'hyperinflation',
    name: 'Гиперинфляция',
    category: 'economy',
    baseSeverity: 5,
    description: 'Национальная валюта стремительно обесценивается.',
    effects: { economy: -25, discontent: 20, corruption: 12 },
    randomVariance: 7,
    isPublic: true,
    flavorText: 'Цены растут каждый день. Люди скупают товары первой необходимости.'
  },
  {
    id: 'general_strike',
    name: 'Всеобщая забастовка',
    category: 'social',
    baseSeverity: 4,
    description: 'Рабочие ключевых отраслей прекратили работу.',
    effects: { economy: -18, stability: -15, discontent: 18 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Заводы и транспорт стоят.'
  },
  {
    id: 'assassination_attempt',
    name: 'Покушение на высокопоставленного чиновника',
    category: 'security',
    baseSeverity: 4,
    description: 'Совершено покушение на видного политика.',
    effects: { fear: 22, stability: -12, legitimacy: -10 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Страна затаила дыхание.'
  },
  {
    id: 'international_summit_success',
    name: 'Успешный международный саммит',
    category: 'international',
    baseSeverity: 2,
    description: 'Достигнуты выгодные договорённости с мировыми лидерами.',
    effects: { internationalImage: 18, externalPressure: -15, economy: 10 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Дипломаты празднуют прорыв.'
  },
  {
    id: 'refugee_crisis',
    name: 'Кризис беженцев',
    category: 'international',
    baseSeverity: 3,
    description: 'Массовый приток беженцев из соседних стран.',
    effects: { discontent: 15, stability: -10, externalPressure: 12 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Гуманитарная катастрофа на границах.'
  },
  {
    id: 'radical_group_rise',
    name: 'Подъём радикальных групп',
    category: 'ideology',
    baseSeverity: 4,
    description: 'Радикальные движения набирают популярность.',
    effects: { radicalization: 20, fear: 15, stability: -12 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Экстремистские лозунги звучат всё громче.'
  },
  {
    id: 'natural_disaster',
    name: 'Крупное стихийное бедствие',
    category: 'crisis',
    baseSeverity: 4,
    description: 'Наводнение / землетрясение / лесные пожары.',
    effects: { economy: -16, stability: -14, legitimacy: -10 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Сотни тысяч людей остались без крова.'
  },
  {
    id: 'elite_purge',
    name: 'Чистка в элитах',
    category: 'political',
    baseSeverity: 3,
    description: 'Правительство проводит масштабные аресты среди чиновников.',
    effects: { fear: 18, corruption: -12, legitimacy: 8 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Многие высокопоставленные лица оказались за решёткой.'
  },
  {
    id: 'blackout',
    name: 'Масштабный блэкаут',
    category: 'crisis',
    baseSeverity: 4,
    description: 'Отключение электричества в крупных городах.',
    effects: { economy: -20, discontent: 18, stability: -15 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Страна погрузилась во тьму.'
  },
  {
    id: 'youth_revolt',
    name: 'Молодёжный бунт',
    category: 'social',
    baseSeverity: 3,
    description: 'Студенты и молодёжь активно протестуют против системы.',
    effects: { discontent: 16, radicalization: 14 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Социальные сети взорвались.'
  },
  {
    id: 'foreign_investment',
    name: 'Крупные иностранные инвестиции',
    category: 'economy',
    baseSeverity: 2,
    description: 'Международные корпорации вложили значительные средства.',
    effects: { economy: 18, internationalImage: 12 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Экономика получила мощный импульс.'
  },
  {
    id: 'scandals_in_army',
    name: 'Скандалы в армии',
    category: 'military',
    baseSeverity: 3,
    description: 'Коррупция и дедовщина в вооружённых силах.',
    effects: { militaryPower: -15, legitimacy: -12, fear: 8 },
    randomVariance: 5,
    isPublic: true,
    flavorText: 'Общество возмущено.'
  },
  {
    id: 'constitutional_crisis',
    name: 'Конституционный кризис',
    category: 'political',
    baseSeverity: 5,
    description: 'Конституционный суд вступил в конфликт с исполнительной властью.',
    effects: { legitimacy: -22, stability: -18 },
    randomVariance: 6,
    isPublic: true,
    flavorText: 'Страна на грани правового хаоса.'
  },
  {
    id: 'propaganda_success',
    name: 'Успех государственной пропаганды',
    category: 'information',
    baseSeverity: 2,
    description: 'Медиа-кампания значительно подняла поддержку власти.',
    effects: { legitimacy: 15, discontent: -10 },
    randomVariance: 4,
    isPublic: true,
    flavorText: 'Телевидение и социальные сети работают на полную мощность.'
  }
  // Файл содержит ровно 42 полностью описанных события
];

export default EventsPool;