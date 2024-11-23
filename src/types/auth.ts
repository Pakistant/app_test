export interface User {
  id: number;
  email: string;
  password?: string;
  display_name: string;
  role: 'admin' | 'user';
  created_at?: Date;
  updated_at?: Date;
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
  display_name: string;
  role: User['role'];
}