import express from 'express';
import { TaskController } from '../controllers/TaskController';
import { auth } from '../middleware/auth';
import { body } from 'express-validator';

export const router = express.Router();

// Validation middleware
const validateTask = [
  body('title').notEmpty().trim(),
  body('dueDate').isISO8601(),
  body('status').isIn(['pending', 'in_progress', 'completed']),
  body('assignedTo').notEmpty().trim()
];

router.get('/project/:projectId', auth, TaskController.getProjectTasks);
router.post('/', [auth, ...validateTask], TaskController.create);
router.put('/:id', [auth, ...validateTask], TaskController.update);
router.delete('/:id', auth, TaskController.delete);