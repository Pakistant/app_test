import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';
import { toast } from 'sonner';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

// Simuler un utilisateur test pour le développement
const testUser: User = {
  id: 'test-user',
  email: 'test@lesmarvelous.com',
  displayName: 'Utilisateur Test',
  role: 'photographer',
  teams: [],
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      desktop: true
    },
    defaultView: 'kanban'
  },
  lastActive: new Date().toISOString(),
  createdAt: new Date().toISOString()
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          // En mode développement, on simule une connexion réussie
          if (credentials.email === 'test@lesmarvelous.com' && credentials.password === 'Test123!') {
            set({ user: testUser, loading: false });
            toast.success('Connexion réussie');
          } else {
            throw new Error('Identifiants invalides');
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ error: (error as Error).message, loading: false });
          toast.error('Erreur de connexion');
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          // En mode développement, on simule une inscription réussie
          const newUser: User = {
            id: Date.now().toString(),
            email: data.email,
            displayName: data.displayName,
            role: data.role,
            teams: [],
            preferences: {
              theme: 'light',
              notifications: {
                email: true,
                push: true,
                desktop: true
              },
              defaultView: 'kanban'
            },
            lastActive: new Date().toISOString(),
            createdAt: new Date().toISOString()
          };

          set({ user: newUser, loading: false });
          toast.success('Inscription réussie');
        } catch (error) {
          console.error('Register error:', error);
          set({ error: (error as Error).message, loading: false });
          toast.error('Erreur lors de l\'inscription');
        }
      },

      logout: async () => {
        try {
          set({ user: null, error: null });
          toast.success('Déconnexion réussie');
        } catch (error) {
          console.error('Logout error:', error);
          set({ error: (error as Error).message });
          toast.error('Erreur lors de la déconnexion');
        }
      },

      updateUser: async (updates) => {
        set({ loading: true, error: null });
        try {
          set(state => ({
            user: state.user ? { ...state.user, ...updates } : null,
            loading: false
          }));
          toast.success('Profil mis à jour');
        } catch (error) {
          console.error('Update user error:', error);
          set({ error: (error as Error).message, loading: false });
          toast.error('Erreur lors de la mise à jour du profil');
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);