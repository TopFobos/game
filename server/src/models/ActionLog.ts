// server/src/models/ActionLog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IActionLog extends Document {
  roomId: string;
  turn: number;
  playerId: string;
  actionType: string;
  target?: string;           // playerId или faction
  success: boolean;
  partialSuccess?: boolean;
  effects: Record<string, number>;
  detectedBy?: string[];     // кто раскрыл действие
  metadata?: Record<string, any>;
}

const ActionLogSchema = new Schema<IActionLog>({
  roomId: { type: String, required: true },
  turn: { type: Number, required: true },
  playerId: { type: String, required: true },
  actionType: { type: String, required: true },
  target: String,
  success: { type: Boolean, required: true },
  partialSuccess: Boolean,
  effects: { type: Schema.Types.Mixed, default: {} },
  detectedBy: [String],
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model<IActionLog>('ActionLog', ActionLogSchema);