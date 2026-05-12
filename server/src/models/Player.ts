// server/src/models/Player.ts
import mongoose, { Schema } from 'mongoose';
import { PublicRole, DictatorArchetype } from '../shared/types';

const PlayerSchema = new Schema({
  userId: { type: String, required: true },
  roomId: { type: String, required: true },
  username: String,
  publicRole: { type: String, enum: [
    'MinisterOfDefense', 'DirectorOfSpecialServices', 'MediaMagnate',
    'Oligarch', 'PopulistPolitician', 'RegionalGovernor', 'ConstitutionalCourtChairman'
  ]},
  archetype: { type: String, enum: [
    'IronGeneral', 'CharismaticPopulist', 'TechnocratReformer',
    'ReligiousLeader', 'ClanChief', 'SecuritySilovik',
    'RadicalIdeologue', 'ShadowFigure'
  ]},
  resources: {
    influence: { type: Number, default: 10 },
    finance: { type: Number, default: 8 },
    agents: { type: Number, default: 3 }
  },
  secretSupport: { type: Number, default: 30 },
  personalParanoia: { type: Number, default: 0 },
  isAlive: { type: Boolean, default: true },
  hasConsolidatedPower: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Player', PlayerSchema);