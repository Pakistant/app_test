import express from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { auth } from '../middleware/auth';
import { body } from 'express-validator';

export const router = express.Router();

// Validation middleware
const validateProject = [
  body('couple').notEmpty().trim(),
  body('date').isISO8601(),
  body('country').isIn(['fr', 'cm']),
  body('deliveryDays').isInt({ min: 1 }),
  body('type').isIn(['wedding', 'studio', 'corporate'])
];

router.get('/', auth, ProjectController.getAll);
router.get('/:id', auth, ProjectController.getById);
router.post('/', [auth, ...validateProject], ProjectController.create);
router.put('/:id', [auth, ...validateProject], ProjectController.update);
router.delete('/:id', auth, ProjectController.delete);