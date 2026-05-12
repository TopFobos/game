// server/src/config/index.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/shadow-republic',
  jwtSecret: process.env.JWT_SECRET || 'shadow-republic-jwt-secret-2026',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  maxPlayersPerRoom: 6,
  defaultTurnTimeLimit: 300 // секунд на фазу
};

export default config;