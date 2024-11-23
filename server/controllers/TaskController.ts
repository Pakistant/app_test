import { Request, Response } from 'express';
import { dbUtils } from '../../src/database/database';
import { validationResult } from 'express-validator';

export class TaskController {
  static async getProjectTasks(req: Request, res: Response) {
    try {
      const tasks = await dbUtils.getProjectTasks(parseInt(req.params.projectId));
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await dbUtils.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await dbUtils.updateTask(parseInt(req.params.id), req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await dbUtils.deleteTask(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
}