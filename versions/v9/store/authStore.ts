import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'sonner';

// Configuration Firebase (à remplacer par vos propres clés)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          // Ici, vous devriez récupérer les données supplémentaires de l'utilisateur depuis votre backend
          const userData: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email!,
            displayName: userCredential.user.displayName || 'Utilisateur',
            role: 'photographer', // À récupérer depuis votre backend
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
            createdAt: userCredential.user.metadata.creationTime || new Date().toISOString()
          };

          set({ user: userData, loading: false });
          toast.success('Connexion réussie');
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
          toast.error('Erreur de connexion');
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );

          await updateProfile(userCredential.user, {
            displayName: data.displayName
          });

          const userData: User = {
            id: userCredential.user.uid,
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

          set({ user: userData, loading: false });
          toast.success('Inscription réussie');
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
          toast.error('Erreur lors de l\'inscription');
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, error: null });
          toast.success('Déconnexion réussie');
        } catch (error) {
          set({ error: (error as Error).message });
          toast.error('Erreur lors de la déconnexion');
        }
      },

      updateUser: async (updates) => {
        set({ loading: true, error: null });
        try {
          // Ici, vous devriez mettre à jour les données dans votre backend
          set(state => ({
            user: state.user ? { ...state.user, ...updates } : null,
            loading: false
          }));
          toast.success('Profil mis à jour');
        } catch (error) {
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