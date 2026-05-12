// server/src/models/Compromat.ts
import mongoose, { Schema } from 'mongoose';

const CompromatSchema = new Schema({
  roomId: String,
  ownerId: String,           // кто владеет
  targetId: String,          // на кого компромат
  title: String,
  description: String,
  severity: { type: Number, min: 1, max: 5 }, // 1-5
  used: { type: Boolean, default: false },
  tags: [String],            // например: ["corruption", "murder", "foreign"]
  createdTurn: Number
});

export default mongoose.model('Compromat', CompromatSchema);