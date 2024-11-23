import knex from 'knex';
import config from './knexfile';

// Déterminer l'environnement
const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment];

// Créer l'instance de connexion
export const db = knex(knexConfig);

// Types pour TypeScript
export interface DBProject {
  id: number;
  type: 'wedding' | 'studio' | 'corporate';
  couple: string;
  date: Date;
  email: string;
  phone: string;
  country: string;
  delivery_days: number;
  status: string;
  notes?: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface DBTask {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  due_date: Date;
  status: string;
  assigned_to: string;
  priority: string;
  created_at: Date;
  updated_at: Date;
}

// Fonctions utilitaires pour la base de données
export const dbUtils = {
  // Projets
  async getProjects() {
    return await db<DBProject>('projects')
      .select('*')
      .orderBy('date', 'desc');
  },

  async getProjectById(id: number) {
    return await db<DBProject>('projects')
      .where({ id })
      .first();
  },

  async createProject(project: Partial<DBProject>) {
    const [newProject] = await db<DBProject>('projects')
      .insert(project)
      .returning('*');
    return newProject;
  },

  async updateProject(id: number, updates: Partial<DBProject>) {
    const [updatedProject] = await db<DBProject>('projects')
      .where({ id })
      .update(updates)
      .returning('*');
    return updatedProject;
  },

  async deleteProject(id: number) {
    await db<DBProject>('projects')
      .where({ id })
      .delete();
  },

  // Tâches
  async getProjectTasks(projectId: number) {
    return await db<DBTask>('tasks')
      .where({ project_id: projectId })
      .orderBy('due_date', 'asc');
  },

  async createTask(task: Partial<DBTask>) {
    const [newTask] = await db<DBTask>('tasks')
      .insert(task)
      .returning('*');
    return newTask;
  },

  async updateTask(id: number, updates: Partial<DBTask>) {
    const [updatedTask] = await db<DBTask>('tasks')
      .where({ id })
      .update(updates)
      .returning('*');
    return updatedTask;
  },

  async deleteTask(id: number) {
    await db<DBTask>('tasks')
      .where({ id })
      .delete();
  }
};