import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../src/database/database';
import { validationResult } from 'express-validator';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, displayName, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await db('users').where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Créer l'utilisateur
      const [user] = await db('users')
        .insert({
          email,
          password: hashedPassword,
          display_name: displayName,
          role
        })
        .returning(['id', 'email', 'display_name', 'role']);

      // Générer le token JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await db('users').where({ email }).first();
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Générer le token JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Ne pas renvoyer le mot de passe
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  }

  static async getMe(req: Request, res: Response) {
    try {
      const user = await db('users')
        .where({ id: req.user.id })
        .first(['id', 'email', 'display_name', 'role']);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  }
}