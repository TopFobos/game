// server/src/routes/gameRoutes.ts
import express from 'express';
import GameService from '../services/gameService';
import authenticateJWT, { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Создать новую комнату (HTTP)
router.post('/create', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { username } = req.body;
    const userId = req.user?.userId;

    if (!userId || !username) {
      return res.status(400).json({ error: 'username обязателен' });
    }

    const room = await GameService.createRoom(userId, username);
    res.status(201).json({
      success: true,
      roomId: room.roomId,
      message: 'Комната успешно создана'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Присоединиться к комнате
router.post('/join', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { roomId, username } = req.body;
    const userId = req.user?.userId;

    if (!roomId || !userId || !username) {
      return res.status(400).json({ error: 'roomId и username обязательны' });
    }

    const result = await GameService.joinRoom(roomId, userId, username);

    res.json({
      success: true,
      room: result.room,
      player: result.player
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Начать игру
router.post('/start', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const { roomId } = req.body;
    if (!roomId) return res.status(400).json({ error: 'roomId обязателен' });

    await GameService.startGame(roomId);
    res.json({ success: true, message: 'Игра успешно запущена' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить состояние комнаты
router.get('/:roomId', authenticateJWT, async (req: AuthRequest, res) => {
  try {
    const room = await GameService.getRoomState(req.params.roomId);
    res.json(room);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;