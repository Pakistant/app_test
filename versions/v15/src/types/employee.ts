export interface Employee {
  id: string;
  name: string;
  age: number;
  role: string[];
  email: string;
  phone?: string;
  avatar?: string;
  startDate: string;
  department: string;
  status: 'active' | 'inactive';
  performance: {
    onTimeDelivery: number;
    delayedProjects: number;
    totalProjects: number;
  };
  workLog: {
    projectId: number;
    taskId: string;
    startTime: string;
    endTime?: string;
    status: 'ongoing' | 'completed';
    delay?: {
      reason: string;
      description: string;
      category: 'absence' | 'workload' | 'technical' | 'other';
    };
  }[];
}

export interface WorkSession {
  id: string;
  employeeId: string;
  projectId: number;
  taskId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'ongoing' | 'completed';
  notes?: string;
}

export interface DelayReport {
  id: string;
  employeeId: string;
  projectId: number;
  taskId: string;
  date: string;
  reason: string;
  category: 'absence' | 'workload' | 'technical' | 'other';
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  reviewedBy?: string;
  resolution?: string;
}