// server/src/sockets/index.ts
import { setupGameSockets } from './gameSocket';

export const initializeSockets = () => {
  setupGameSockets();
};

export default initializeSockets;