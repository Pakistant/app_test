export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'manager' | 'photographer' | 'videographer' | 'editor';
  avatar?: string;
  teams: string[];
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
    defaultView: 'kanban' | 'calendar' | 'list';
  };
  lastActive: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  displayName: string;
  role: User['role'];
}