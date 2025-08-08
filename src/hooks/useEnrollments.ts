import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Enrollment } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all enrollments
export const useEnrollments = () => {
  const { enrollments, setEnrollments, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['enrollments'],
    queryFn: async (): Promise<Enrollment[]> => {
      const response = await fetch('/api/enrollments')
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setEnrollments(query.data)
    }
    setLoading('enrollments', query.isLoading)
  }, [query.data, query.isLoading, setEnrollments, setLoading])

  return {
    ...query,
    data: enrollments, // Always return data from Zustand store
  }
}

// Fetch single enrollment
export const useEnrollment = (id: string) => {
  return useQuery({
    queryKey: ['enrollments', id],
    queryFn: async (): Promise<Enrollment> => {
      const response = await fetch(`/api/enrollments/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch enrollment')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create enrollment mutation
export const useCreateEnrollment = () => {
  const queryClient = useQueryClient()
  const { addEnrollment } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<Enrollment, 'id' | 'enrolledAt'>): Promise<Enrollment> => {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create enrollment')
      }
      return response.json()
    },
    onSuccess: (newEnrollment) => {
      // Update Zustand store immediately
      addEnrollment(newEnrollment)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    },
  })
}

// Update enrollment mutation
export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient()
  const { updateEnrollment } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Enrollment> }): Promise<Enrollment> => {
      const response = await fetch('/api/enrollments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update enrollment')
      }
      return response.json()
    },
    onSuccess: (updatedEnrollment) => {
      // Update Zustand store immediately
      updateEnrollment(updatedEnrollment.id, updatedEnrollment)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    },
  })
}

// Delete enrollment mutation
export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient()
  const { removeEnrollment } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/enrollments?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete enrollment')
      }
    },
    onSuccess: (_, id) => {
      // Update Zustand store immediately
      removeEnrollment(id)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    },
  })
}
