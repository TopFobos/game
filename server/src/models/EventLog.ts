// server/src/models/EventLog.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEventLog extends Document {
  roomId: string;
  turn: number;
  eventName: string;
  category: string;
  severity: number;
  effects: Record<string, number>;
  isPublic: boolean;
  hiddenInfo?: string;        // для "слухов"
}

const EventLogSchema = new Schema<IEventLog>({
  roomId: { type: String, required: true },
  turn: { type: Number, required: true },
  eventName: { type: String, required: true },
  category: String,
  severity: Number,
  effects: { type: Schema.Types.Mixed },
  isPublic: { type: Boolean, default: true },
  hiddenInfo: String
}, { timestamps: true });

export default mongoose.model<IEventLog>('EventLog', EventLogSchema);