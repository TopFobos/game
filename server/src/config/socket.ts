// server/src/config/socket.ts
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import config from './index';

let io: Server;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: config.corsOrigin,
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.IO не инициализирован');
  }
  return io;
};

export default initSocket;