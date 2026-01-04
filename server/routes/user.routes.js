import { Router } from 'express';
import { getDb } from '../lib/database.js';
import { logger } from '../lib/logger.js';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (err) {
    logger.error({ err }, 'Error fetching users');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const user = { ...req.body, createdAt: new Date() };
    const result = await db.collection('users').insertOne(user);
    res.status(201).json({ id: result.insertedId, ...user });
  } catch (err) {
    logger.error({ err }, 'Error creating user');
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
