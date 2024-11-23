import { create } from 'zustand';
import { Project, Season, Task, Filter, ActivityLog } from '../types';
import { formulas } from '../data/formulas';
import { addDays, format, isAfter, parseISO } from 'date-fns';
import { toast } from 'sonner';

interface ProjectStore {
  projects: Project[];
  seasons: Season[];
  activeSeason: Season | null;
  filters: Filter;
  addProject: (project: Omit<Project, 'id' | 'tasks' | 'status'>) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addSeason: (season: Omit<Season, 'id'>) => void;
  setActiveSeason: (seasonId: string) => void;
  updateProjectStatus: (projectId: number, status: Project['status']) => void;
  updateTaskStatus: (projectId: number, taskId: string, status: Task['status']) => void;
  updateProjectNotes: (projectId: number, notes: string) => void;
  getProjectProgress: (projectId: number) => number;
  setFilters: (filters: Partial<Filter>) => void;
  resetFilters: () => void;
  addActivityLog: (projectId: number, log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  updateTask: (projectId: number, taskId: string, updates: Partial<Task>) => void;
}

const initialFilters: Filter = {
  weddingType: [],
  formula: [],
  status: [],
  search: '',
  date: null,
  priority: [],
  tags: [],
  country: [],
  type: []
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  seasons: [
    {
      id: '2024',
      name: 'Saison 2024',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
    }
  ],
  activeSeason: {
    id: '2024',
    name: 'Saison 2024',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
  },
  filters: initialFilters,

  addProject: (project) => set((state) => {
    const formula = formulas.find(f => f.id === project.formula?.name);
    if (!formula && project.type === 'wedding') return state;

    const tasks = project.type === 'wedding' && formula ? formula.tasks.map((task, index) => ({
      id: `${project.couple}-task-${index}`,
      title: task.title,
      dueDate: format(addDays(new Date(project.date), task.daysOffset), 'yyyy-MM-dd'),
      status: 'pending' as const,
      assignedTo: task.assignedTo,
      daysOffset: task.daysOffset,
      priority: task.priority || 'medium',
      comments: [],
      tags: [],
      subTasks: [],
      dependencies: [],
      estimatedTime: 0,
      actualTime: 0
    })) : [];

    const newProject: Project = {
      id: Date.now(),
      ...project,
      status: 'en_cours',
      tasks,
      tags: [],
      priority: 'medium',
      activityLog: [],
      documents: []
    };

    toast.success('Projet créé avec succès');
    return {
      projects: [...state.projects, newProject]
    };
  }),

  updateProject: (id, updates) => set((state) => {
    const projectIndex = state.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return state;

    const updatedProjects = [...state.projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      ...updates
    };

    const log: ActivityLog = {
      id: Date.now().toString(),
      type: 'update',
      description: 'Projet mis à jour',
      user: 'current-user',
      timestamp: new Date().toISOString(),
      details: updates
    };

    updatedProjects[projectIndex].activityLog.push(log);
    toast.success('Projet mis à jour avec succès');

    return { projects: updatedProjects };
  }),

  updateTask: (projectId, taskId, updates) => set((state) => {
    const projectIndex = state.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return state;

    const updatedProjects = [...state.projects];
    const project = updatedProjects[projectIndex];
    if (!('tasks' in project)) return state;

    const taskIndex = project.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return state;

    project.tasks[taskIndex] = {
      ...project.tasks[taskIndex],
      ...updates
    };

    return { projects: updatedProjects };
  }),

  deleteProject: (id) => set((state) => {
    const updatedProjects = state.projects.filter(p => p.id !== id);
    toast.success('Projet supprimé avec succès');
    return { projects: updatedProjects };
  }),

  addSeason: (season) => set((state) => ({
    seasons: [...state.seasons, { ...season, id: Date.now().toString() }]
  })),

  setActiveSeason: (seasonId) => set((state) => ({
    seasons: state.seasons.map(s => ({
      ...s,
      isActive: s.id === seasonId
    })),
    activeSeason: state.seasons.find(s => s.id === seasonId) || null
  })),

  updateProjectStatus: (projectId, status) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === projectId ? { ...p, status } : p
    )
  })),

  updateTaskStatus: (projectId, taskId, status) => set((state) => {
    const newProjects = state.projects.map(p => 
      p.id === projectId && 'tasks' in p
        ? {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId 
                ? { ...t, status, completedDate: status === 'completed' ? new Date().toISOString() : undefined } 
                : t
            )
          }
        : p
    );

    const project = newProjects.find(p => p.id === projectId);
    if (project && 'tasks' in project) {
      const allTasks = project.tasks;
      const completedTasks = allTasks.filter(t => t.status === 'completed');
      
      let newStatus: Project['status'] = project.status;
      
      if (completedTasks.length === allTasks.length) {
        newStatus = 'termine';
      } else if (allTasks.some(t => 
        t.status !== 'completed' && 
        isAfter(new Date(), parseISO(t.dueDate))
      )) {
        newStatus = 'en_retard';
      } else {
        newStatus = 'en_cours';
      }

      return {
        projects: newProjects.map(p =>
          p.id === projectId ? { ...p, status: newStatus } : p
        )
      };
    }

    return { projects: newProjects };
  }),

  updateProjectNotes: (projectId, notes) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === projectId ? { ...p, notes } : p
    )
  })),

  getProjectProgress: (projectId) => {
    const project = get().projects.find(p => p.id === projectId);
    if (!project || !('tasks' in project)) return 0;
    
    const completedTasks = project.tasks.filter(t => t.status === 'completed');
    return Math.round((completedTasks.length / project.tasks.length) * 100);
  },

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  resetFilters: () => set(() => ({
    filters: initialFilters
  })),

  addActivityLog: (projectId, log) => set((state) => {
    const projectIndex = state.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return state;

    const updatedProjects = [...state.projects];
    updatedProjects[projectIndex].activityLog.push({
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });

    return { projects: updatedProjects };
  })
}));