import { Request, Response } from 'express';
import { dbUtils } from '../../src/database/database';
import { validationResult } from 'express-validator';

export class ProjectController {
  static async getAll(req: Request, res: Response) {
    try {
      const projects = await dbUtils.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching projects' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const project = await dbUtils.getProjectById(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching project' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = await dbUtils.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Error creating project' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = await dbUtils.updateProject(parseInt(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Error updating project' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await dbUtils.deleteProject(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting project' });
    }
  }
}