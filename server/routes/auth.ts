import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { auth } from '../middleware/auth';
import { body } from 'express-validator';

export const router = express.Router();

// Validation middleware
const validateRegister = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('displayName').notEmpty().trim(),
  body('role').isIn(['admin', 'manager', 'photographer', 'videographer', 'editor'])
];

const validateLogin = [
  body('email').isEmail(),
  body('password').exists()
];

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/me', auth, AuthController.getMe);