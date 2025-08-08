import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Benefit } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all benefits
export const useBenefits = () => {
  const { benefits, setBenefits, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['benefits'],
    queryFn: async (): Promise<Benefit[]> => {
      const response = await fetch('/api/benefits')
      if (!response.ok) {
        throw new Error('Failed to fetch benefits')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setBenefits(query.data)
    }
    setLoading('benefits', query.isLoading)
  }, [query.data, query.isLoading, setBenefits, setLoading])

  return {
    ...query,
    data: benefits, // Always return data from Zustand store
  }
}

// Create benefit mutation
export const useCreateBenefit = () => {
  const queryClient = useQueryClient()
  const { addBenefit } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<Benefit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Benefit> => {
      const response = await fetch('/api/benefits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create benefit')
      }
      return response.json()
    },
    onSuccess: (newBenefit) => {
      addBenefit(newBenefit)
      queryClient.invalidateQueries({ queryKey: ['benefits'] })
    },
  })
}

// Update benefit mutation
export const useUpdateBenefit = () => {
  const queryClient = useQueryClient()
  const { updateBenefit } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Benefit> }): Promise<Benefit> => {
      const response = await fetch('/api/benefits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update benefit')
      }
      return response.json()
    },
    onSuccess: (updatedBenefit) => {
      updateBenefit(updatedBenefit.id, updatedBenefit)
      queryClient.invalidateQueries({ queryKey: ['benefits'] })
    },
  })
}

// Delete benefit mutation
export const useDeleteBenefit = () => {
  const queryClient = useQueryClient()
  const { removeBenefit } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/benefits?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete benefit')
      }
    },
    onSuccess: (_, id) => {
      removeBenefit(id)
      queryClient.invalidateQueries({ queryKey: ['benefits'] })
    },
  })
}
