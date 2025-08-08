import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FAQ } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all FAQs
export const useFAQs = () => {
  const { faqs, setFaqs, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['faqs'],
    queryFn: async (): Promise<FAQ[]> => {
      const response = await fetch('/api/faqs')
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setFaqs(query.data)
    }
    setLoading('faqs', query.isLoading)
  }, [query.data, query.isLoading, setFaqs, setLoading])

  return {
    ...query,
    data: faqs, // Always return data from Zustand store
  }
}

// Create FAQ mutation
export const useCreateFAQ = () => {
  const queryClient = useQueryClient()
  const { addFaq } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> => {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create FAQ')
      }
      return response.json()
    },
    onSuccess: (newFAQ) => {
      addFaq(newFAQ)
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}

// Update FAQ mutation
export const useUpdateFAQ = () => {
  const queryClient = useQueryClient()
  const { updateFaq } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FAQ> }): Promise<FAQ> => {
      const response = await fetch('/api/faqs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update FAQ')
      }
      return response.json()
    },
    onSuccess: (updatedFAQ) => {
      updateFaq(updatedFAQ.id, updatedFAQ)
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}

// Delete FAQ mutation
export const useDeleteFAQ = () => {
  const queryClient = useQueryClient()
  const { removeFaq } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/faqs?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete FAQ')
      }
    },
    onSuccess: (_, id) => {
      removeFaq(id)
      queryClient.invalidateQueries({ queryKey: ['faqs'] })
    },
  })
}
