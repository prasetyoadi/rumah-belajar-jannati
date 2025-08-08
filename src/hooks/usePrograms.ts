import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Program } from '@/types'

// Fetch all programs
export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async (): Promise<Program[]> => {
      const response = await fetch('/api/programs')
      if (!response.ok) {
        throw new Error('Failed to fetch programs')
      }
      return response.json()
    },
  })
}

// Fetch single program
export const useProgram = (id: string) => {
  return useQuery({
    queryKey: ['programs', id],
    queryFn: async (): Promise<Program> => {
      const response = await fetch(`/api/programs/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch program')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create program mutation
export const useCreateProgram = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program> => {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create program')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
    },
  })
}

// Update program mutation
export const useUpdateProgram = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Program> }): Promise<Program> => {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update program')
      }
      return response.json()
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
      queryClient.invalidateQueries({ queryKey: ['programs', id] })
    },
  })
}

// Delete program mutation
export const useDeleteProgram = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete program')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
    },
  })
}
