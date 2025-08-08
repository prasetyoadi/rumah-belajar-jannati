import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT' | 'VISITOR'
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (token: string, user: AuthUser) => void
  logout: () => void
  register: (userData: {
    name: string
    email: string
    password: string
    role?: 'STUDENT' | 'INSTRUCTOR'
  }) => Promise<boolean>
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (token: string, newPassword: string) => Promise<boolean>
  updateProfile: (userData: Partial<AuthUser>) => Promise<boolean>
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        login: (token: string, user: AuthUser) => {
          set({
            user,
            token,
            isAuthenticated: true,
            error: null,
          })
        },
        
        logout: async () => {
          // Call logout API to clear cookies
          try {
            await fetch('/api/auth/logout', { 
              method: 'POST',
              credentials: 'include' // Include cookies
            })
          } catch (error) {
            console.error('Logout API error:', error)
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          })
        },
        
        register: async (userData) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            })
            
            const data = await response.json()
            
            if (response.ok) {
              set({
                user: data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              })
              return true
            } else {
              set({
                error: data.error || 'Registration failed',
                isLoading: false,
              })
              return false
            }
          } catch (error) {
            set({
              error: 'Network error occurred',
              isLoading: false,
            })
            return false
          }
        },
        
        forgotPassword: async (email: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/auth/forgot-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            })
            
            const data = await response.json()
            
            if (response.ok) {
              set({ isLoading: false, error: null })
              return true
            } else {
              set({
                error: data.error || 'Failed to send reset email',
                isLoading: false,
              })
              return false
            }
          } catch (error) {
            set({
              error: 'Network error occurred',
              isLoading: false,
            })
            return false
          }
        },
        
        resetPassword: async (token: string, newPassword: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/auth/reset-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token, newPassword }),
            })
            
            const data = await response.json()
            
            if (response.ok) {
              set({ isLoading: false, error: null })
              return true
            } else {
              set({
                error: data.error || 'Failed to reset password',
                isLoading: false,
              })
              return false
            }
          } catch (error) {
            set({
              error: 'Network error occurred',
              isLoading: false,
            })
            return false
          }
        },
        
        updateProfile: async (userData) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/auth/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            })
            
            const data = await response.json()
            
            if (response.ok) {
              set((state) => ({
                user: state.user ? { ...state.user, ...data.user } : null,
                isLoading: false,
                error: null,
              }))
              return true
            } else {
              set({
                error: data.error || 'Failed to update profile',
                isLoading: false,
              })
              return false
            }
          } catch (error) {
            set({
              error: 'Network error occurred',
              isLoading: false,
            })
            return false
          }
        },
        
        checkAuth: async () => {
          set({ isLoading: true })
          
          try {
            const response = await fetch('/api/auth/me', {
              method: 'GET',
              credentials: 'include', // Include cookies
              headers: {
                'Content-Type': 'application/json',
              },
            })
            
            if (response.ok) {
              const data = await response.json()
              set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
              })
            } else {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
              })
            }
          } catch (error) {
            console.error('Auth check error:', error)
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        },
        
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
)
