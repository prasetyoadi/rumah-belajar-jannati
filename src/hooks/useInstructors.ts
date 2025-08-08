import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Instructor } from '@/types'

// Fetch all instructors
export const useInstructors = () => {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: async (): Promise<Instructor[]> => {
      const response = await fetch('/api/instructors')
      if (!response.ok) {
        throw new Error('Failed to fetch instructors')
      }
      return response.json()
    },
  })
}

// Fetch single instructor
export const useInstructor = (id: string) => {
  return useQuery({
    queryKey: ['instructors', id],
    queryFn: async (): Promise<Instructor> => {
      const response = await fetch(`/api/instructors/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch instructor')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create instructor mutation
export const useCreateInstructor = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Omit<Instructor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Instructor> => {
      const response = await fetch('/api/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create instructor')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
    },
  })
}

// Update instructor mutation
export const useUpdateInstructor = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Instructor> }): Promise<Instructor> => {
      const response = await fetch(`/api/instructors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update instructor')
      }
      return response.json()
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
      queryClient.invalidateQueries({ queryKey: ['instructors', id] })
    },
  })
}

// Delete instructor mutation
export const useDeleteInstructor = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/instructors/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete instructor')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
    },
  })
}
