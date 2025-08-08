import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Instructor } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all instructors
export const useInstructors = () => {
  const { instructors, setInstructors, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['instructors'],
    queryFn: async (): Promise<Instructor[]> => {
      const response = await fetch('/api/instructors')
      if (!response.ok) {
        throw new Error('Failed to fetch instructors')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setInstructors(query.data)
    }
    setLoading('instructors', query.isLoading)
  }, [query.data, query.isLoading, setInstructors, setLoading])

  return {
    ...query,
    data: instructors, // Always return data from Zustand store
  }
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
  const { addInstructor } = useDataStore()
  
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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create instructor')
      }
      return response.json()
    },
    onSuccess: (newInstructor) => {
      // Update Zustand store immediately
      addInstructor(newInstructor)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
    },
  })
}

// Update instructor mutation
export const useUpdateInstructor = () => {
  const queryClient = useQueryClient()
  const { updateInstructor } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Instructor> }): Promise<Instructor> => {
      const response = await fetch('/api/instructors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update instructor')
      }
      return response.json()
    },
    onSuccess: (updatedInstructor) => {
      // Update Zustand store immediately
      updateInstructor(updatedInstructor.id, updatedInstructor)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
    },
  })
}

// Delete instructor mutation
export const useDeleteInstructor = () => {
  const queryClient = useQueryClient()
  const { removeInstructor } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/instructors?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete instructor')
      }
    },
    onSuccess: (_, id) => {
      // Update Zustand store immediately
      removeInstructor(id)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['instructors'] })
    },
  })
}
