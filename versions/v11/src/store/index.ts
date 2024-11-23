import { create } from 'zustand';
import { Project, Season, Task, Filter, ActivityLog, WeddingProject } from '../types';
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
  tags: []
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
    let newProject: Project;

    if (project.type === 'wedding') {
      const weddingProject = project as Omit<WeddingProject, 'id' | 'tasks' | 'status'>;
      const formula = formulas.find(f => f.id === weddingProject.formula.name);
      if (!formula) return state;

      const tasks = formula.tasks.map((task, index) => ({
        id: `${weddingProject.couple}-task-${index}`,
        title: task.title,
        dueDate: format(addDays(new Date(weddingProject.date), task.daysOffset), 'yyyy-MM-dd'),
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
      }));

      newProject = {
        id: Date.now(),
        ...weddingProject,
        status: 'en_cours',
        tasks,
        tags: [],
        priority: 'medium',
        activityLog: [],
        documents: []
      };
    } else {
      // For studio and corporate projects
      newProject = {
        id: Date.now(),
        ...project,
        status: 'en_cours',
        tags: [],
        priority: 'medium',
        activityLog: [],
        documents: []
      };
    }

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

    const project = state.projects[projectIndex] as WeddingProject;
    if (!('tasks' in project)) return state;

    const updatedProjects = [...state.projects];
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
    const project = state.projects.find(p => p.id === projectId) as WeddingProject;
    if (!project || !('tasks' in project)) return state;

    const newProjects = state.projects.map(p => 
      p.id === projectId 
        ? {
            ...p,
            tasks: (p as WeddingProject).tasks.map(t => 
              t.id === taskId 
                ? { ...t, status, completedDate: status === 'completed' ? new Date().toISOString() : undefined } 
                : t
            )
          }
        : p
    );

    const updatedProject = newProjects.find(p => p.id === projectId) as WeddingProject;
    if (updatedProject) {
      const allTasks = updatedProject.tasks;
      const completedTasks = allTasks.filter(t => t.status === 'completed');
      
      let newStatus: Project['status'] = updatedProject.status;
      
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
    const project = get().projects.find(p => p.id === projectId) as WeddingProject;
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