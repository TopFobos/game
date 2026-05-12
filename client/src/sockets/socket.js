// client/src/sockets/socket.js
import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'

export const socket = io(URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 10000,
  transports: ['websocket', 'polling']
})

socket.on('connect', () => {
  console.log('✅ Socket подключён:', socket.id)
})

socket.on('connect_error', (err) => {
  console.error('❌ Ошибка подключения:', err.message)
})

socket.on('disconnect', (reason) => {
  console.log('❌ Socket отключён:', reason)
})

export default socket