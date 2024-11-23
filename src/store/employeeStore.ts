import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Employee, WorkSession, DelayReport } from '../types/employee';
import { toast } from 'sonner';

interface EmployeeStore {
  employees: Employee[];
  workSessions: WorkSession[];
  delayReports: DelayReport[];
  
  // Employee management
  addEmployee: (employee: Omit<Employee, 'id' | 'performance' | 'workLog'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
  
  // Work tracking
  startWorkSession: (session: Omit<WorkSession, 'id' | 'duration'>) => void;
  endWorkSession: (sessionId: string) => void;
  updateWorkSession: (sessionId: string, updates: Partial<WorkSession>) => void;
  
  // Delay reporting
  submitDelayReport: (report: Omit<DelayReport, 'id' | 'status'>) => void;
  reviewDelayReport: (reportId: string, resolution: string, reviewedBy: string) => void;
  
  // Performance tracking
  getEmployeePerformance: (employeeId: string) => {
    onTimeDelivery: number;
    delayedProjects: number;
    totalProjects: number;
  };
  getEmployeeWorkload: (employeeId: string) => WorkSession[];
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      workSessions: [],
      delayReports: [],

      addEmployee: (employee) => set((state) => {
        const newEmployee: Employee = {
          id: Date.now().toString(),
          ...employee,
          performance: {
            onTimeDelivery: 0,
            delayedProjects: 0,
            totalProjects: 0
          },
          workLog: []
        };

        toast.success('Employé ajouté avec succès');
        return { employees: [...state.employees, newEmployee] };
      }),

      updateEmployee: (id, updates) => set((state) => ({
        employees: state.employees.map(emp =>
          emp.id === id ? { ...emp, ...updates } : emp
        )
      })),

      removeEmployee: (id) => set((state) => ({
        employees: state.employees.filter(emp => emp.id !== id)
      })),

      startWorkSession: (session) => set((state) => {
        const newSession: WorkSession = {
          id: Date.now().toString(),
          ...session,
          status: 'ongoing'
        };

        return { workSessions: [...state.workSessions, newSession] };
      }),

      endWorkSession: (sessionId) => set((state) => ({
        workSessions: state.workSessions.map(session =>
          session.id === sessionId
            ? {
                ...session,
                endTime: new Date().toISOString(),
                status: 'completed',
                duration: session.startTime
                  ? (new Date().getTime() - new Date(session.startTime).getTime()) / (1000 * 60)
                  : 0
              }
            : session
        )
      })),

      updateWorkSession: (sessionId, updates) => set((state) => ({
        workSessions: state.workSessions.map(session =>
          session.id === sessionId ? { ...session, ...updates } : session
        )
      })),

      submitDelayReport: (report) => set((state) => {
        const newReport: DelayReport = {
          id: Date.now().toString(),
          ...report,
          status: 'pending'
        };

        toast.info('Rapport de retard soumis');
        return { delayReports: [...state.delayReports, newReport] };
      }),

      reviewDelayReport: (reportId, resolution, reviewedBy) => set((state) => ({
        delayReports: state.delayReports.map(report =>
          report.id === reportId
            ? {
                ...report,
                status: 'reviewed',
                resolution,
                reviewedBy
              }
            : report
        )
      })),

      getEmployeePerformance: (employeeId) => {
        const employee = get().employees.find(emp => emp.id === employeeId);
        return employee?.performance || {
          onTimeDelivery: 0,
          delayedProjects: 0,
          totalProjects: 0
        };
      },

      getEmployeeWorkload: (employeeId) => {
        return get().workSessions.filter(
          session => session.employeeId === employeeId && session.status === 'ongoing'
        );
      }
    }),
    {
      name: 'employee-storage'
    }
  )
);