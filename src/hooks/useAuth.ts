import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/useAuthStore'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT' | 'VISITOR'
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
}

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Login failed')
      }
      
      return response.json()
    },
  })
}

// Register mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed')
      }
      
      return response.json()
    },
  })
}

// Logout mutation
export const useLogout = () => {
  const { logout } = useAuthStore()
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      })
      
      if (!response.ok) {
        throw new Error('Logout failed')
      }
      
      logout()
      return response.json()
    },
  })
}

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send reset email')
      }
      
      return response.json()
    },
  })
}

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to reset password')
      }
      
      return response.json()
    },
  })
}

// Get current user query
export const useCurrentUser = () => {
  const { user } = useAuthStore()
  
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me')
      
      if (!response.ok) {
        throw new Error('Failed to get current user')
      }
      
      return response.json()
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
