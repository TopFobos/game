// server/src/models/GameRoom.ts
import mongoose, { Schema, Document } from 'mongoose';
import { GamePhase, PublicRole, DictatorArchetype } from '../shared/types';

export interface IGameRoom extends Document {
  roomId: string;
  players: mongoose.Types.ObjectId[];
  countryState: mongoose.Types.ObjectId;
  currentPhase: GamePhase;
  turn: number;
  status: 'lobby' | 'playing' | 'ended';
  winner?: string;
  settings: {
    maxPlayers: number;
    scenario: string;
  };
}

const GameRoomSchema = new Schema<IGameRoom>({
  roomId: { type: String, required: true, unique: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  countryState: { type: Schema.Types.ObjectId, ref: 'CountryState' },
  currentPhase: { 
    type: String, 
    enum: ['lobby', 'event', 'council', 'secret_actions', 'resolution'],
    default: 'lobby' 
  },
  turn: { type: Number, default: 0 },
  status: { type: String, enum: ['lobby', 'playing', 'ended'], default: 'lobby' },
  winner: String,
  settings: {
    maxPlayers: { type: Number, default: 6 },
    scenario: { type: String, default: 'standard' }
  }
}, { timestamps: true });

export default mongoose.model<IGameRoom>('GameRoom', GameRoomSchema);