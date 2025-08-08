import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Program } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all programs
export const usePrograms = () => {
  const { programs, setPrograms, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['programs'],
    queryFn: async (): Promise<Program[]> => {
      const response = await fetch('/api/programs')
      if (!response.ok) {
        throw new Error('Failed to fetch programs')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setPrograms(query.data)
    }
    setLoading('programs', query.isLoading)
  }, [query.data, query.isLoading, setPrograms, setLoading])

  return {
    ...query,
    data: programs, // Always return data from Zustand store
  }
}

// Create program mutation
export const useCreateProgram = () => {
  const queryClient = useQueryClient()
  const { addProgram } = useDataStore()
  
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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create program')
      }
      return response.json()
    },
    onSuccess: (newProgram) => {
      addProgram(newProgram)
      queryClient.invalidateQueries({ queryKey: ['programs'] })
    },
  })
}

// Update program mutation
export const useUpdateProgram = () => {
  const queryClient = useQueryClient()
  const { updateProgram } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Program> }): Promise<Program> => {
      const response = await fetch('/api/programs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update program')
      }
      return response.json()
    },
    onSuccess: (updatedProgram) => {
      updateProgram(updatedProgram.id, updatedProgram)
      queryClient.invalidateQueries({ queryKey: ['programs'] })
    },
  })
}

// Delete program mutation
export const useDeleteProgram = () => {
  const queryClient = useQueryClient()
  const { removeProgram } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/programs?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete program')
      }
    },
    onSuccess: (_, id) => {
      removeProgram(id)
      queryClient.invalidateQueries({ queryKey: ['programs'] })
    },
  })
}
