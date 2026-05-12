// server/src/models/CountryState.ts
import mongoose, { Schema } from 'mongoose';

const CountryStateSchema = new Schema({
  roomId: String,
  openParams: {
    economy: { type: Number, default: 50 },
    stability: { type: Number, default: 50 },
    discontent: { type: Number, default: 50 },
    fear: { type: Number, default: 50 },
    corruption: { type: Number, default: 50 },
    legitimacy: { type: Number, default: 50 },
    militaryPower: { type: Number, default: 50 },
    externalPressure: { type: Number, default: 50 },
    radicalization: { type: Number, default: 50 },
    internationalImage: { type: Number, default: 50 }
  },
  hiddenParams: {
    factionLoyalties: { type: Map, of: Schema.Types.Mixed },
    conspiracyLevel: { type: Number, default: 30 },
    globalParanoia: { type: Number, default: 25 },
    foreignInfluence: { type: Map, of: Number }
  }
});

export default mongoose.model('CountryState', CountryStateSchema);