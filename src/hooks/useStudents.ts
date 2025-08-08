import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Student interfaces
export interface Student {
  id: string
  userId?: string
  name: string
  birthDate?: string
  address?: string
  phone?: string
  parentName?: string
  parentPhone?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Fetch all students
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async (): Promise<Student[]> => {
      const response = await fetch('/api/students')
      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }
      return response.json()
    },
  })
}

// Fetch single student
export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async (): Promise<Student> => {
      const response = await fetch(`/api/students/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch student')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create student mutation
export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create student')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Update student mutation
export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Student> }): Promise<Student> => {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update student')
      }
      return response.json()
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['students', id] })
    },
  })
}

// Delete student mutation
export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete student')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
