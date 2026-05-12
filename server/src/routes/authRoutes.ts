// server/src/routes/authRoutes.ts
import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { userId, username } = req.body;

    if (!userId || !username) {
      return res.status(400).json({ error: 'userId и username обязательны' });
    }

    const token = jwt.sign(
      { userId, username },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { userId, username }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/verify', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(403).json({ error: 'Неверный токен' });
  }
});

export default router;   // ← важно: default export