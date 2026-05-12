// shared/types/index.ts
export type GamePhase = 
  | 'lobby' 
  | 'event' 
  | 'council' 
  | 'secret_actions' 
  | 'resolution';

export type PublicRole = 
  | 'MinisterOfDefense'
  | 'DirectorOfSpecialServices'
  | 'MediaMagnate'
  | 'Oligarch'
  | 'PopulistPolitician'
  | 'RegionalGovernor'
  | 'ConstitutionalCourtChairman';

export type DictatorArchetype = 
  | 'IronGeneral'
  | 'CharismaticPopulist'
  | 'TechnocratReformer'
  | 'ReligiousLeader'
  | 'ClanChief'
  | 'SecuritySilovik'
  | 'RadicalIdeologue'
  | 'ShadowFigure';

export interface OpenParameters {
  economy: number;
  stability: number;
  discontent: number;
  fear: number;
  corruption: number;
  legitimacy: number;
  militaryPower: number;
  externalPressure: number;
  radicalization: number;
  internationalImage: number;
}

export interface PlayerResources {
  influence: number;
  finance: number;
  agents: number;
  mediaCapital?: number;
}

export interface GamePlayer {
  id: string;
  userId: string;
  username: string;
  publicRole: PublicRole;
  archetype: DictatorArchetype;
  resources: PlayerResources;
  secretSupport: number;
  personalParanoia: number;
  isAlive: boolean;
  hasConsolidatedPower: boolean;
}

export interface CountryState {
  openParams: OpenParameters;
  hiddenParams: {
    factionLoyalties: Record<string, any>;
    conspiracyLevel: number;
    globalParanoia: number;
    foreignInfluence: Record<string, number>;
  };
}

export interface GameRoom {
  id?: string;
  roomId: string;
  players: any[];
  countryState: any;
  currentPhase: GamePhase;
  turn: number;
  status: 'lobby' | 'playing' | 'ended';
  winner?: string;
  settings: {
    maxPlayers: number;
    scenario: string;
  };
}