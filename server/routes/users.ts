import express from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { auth } from '../middleware/auth';

export const router = express.Router();

// Route pour obtenir les informations de l'utilisateur connecté
router.get('/me', auth, AuthController.getMe);

// Route pour mettre à jour le profil utilisateur
router.put(
  '/profile',
  auth,
  [
    body('displayName').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail(),
    body('currentPassword').optional().isLength({ min: 6 }),
    body('newPassword').optional().isLength({ min: 6 }),
  ],
  async (req, res) => {
    // TODO: Implémenter la mise à jour du profil
    res.status(501).json({ message: 'Not implemented yet' });
  }
);

// Route pour obtenir la liste des utilisateurs (admin seulement)
router.get('/', auth, async (req, res) => {
  // TODO: Implémenter la liste des utilisateurs
  res.status(501).json({ message: 'Not implemented yet' });
});
