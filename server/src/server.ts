// server/src/server.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import config from './config/index';
import connectDB from './config/db';
import initSocket from './config/socket';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';        // ← должен быть router
import { initializeSockets } from './sockets/index';
import errorHandler from './middleware/errorHandler';

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);   // ← здесь была ошибка

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    version: '1.0.1' 
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    initSocket(server);
    initializeSockets();

    server.listen(config.port, () => {
      console.log(`🚀 Сервер «Тень Республики» запущен на http://localhost:${config.port}`);
      console.log(`🌐 Socket.IO активен`);
    });
  } catch (error) {
    console.error('❌ Критическая ошибка запуска:', error);
    process.exit(1);
  }
};

startServer();

export { app, server };