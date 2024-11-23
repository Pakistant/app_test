import express from 'express';
import { db } from '../../src/database/database';

export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Vérifier la connexion à la base de données
    await db.raw('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
  }
});
