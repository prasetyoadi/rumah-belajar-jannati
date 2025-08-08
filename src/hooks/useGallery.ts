import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Gallery } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all gallery items
export const useGallery = () => {
  const { gallery, setGallery, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['gallery'],
    queryFn: async (): Promise<Gallery[]> => {
      const response = await fetch('/api/gallery')
      if (!response.ok) {
        throw new Error('Failed to fetch gallery')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setGallery(query.data)
    }
    setLoading('gallery', query.isLoading)
  }, [query.data, query.isLoading, setGallery, setLoading])

  return {
    ...query,
    data: gallery, // Always return data from Zustand store
  }
}

// Fetch single gallery item
export const useGalleryItem = (id: string) => {
  return useQuery({
    queryKey: ['gallery', id],
    queryFn: async (): Promise<Gallery> => {
      const response = await fetch(`/api/gallery/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch gallery item')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create gallery item mutation
export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient()
  const { addGalleryItem } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Gallery> => {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create gallery item')
      }
      return response.json()
    },
    onSuccess: (newItem) => {
      // Update Zustand store immediately
      addGalleryItem(newItem)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })
}

// Update gallery item mutation
export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient()
  const { updateGalleryItem } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Gallery> }): Promise<Gallery> => {
      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update gallery item')
      }
      return response.json()
    },
    onSuccess: (updatedItem) => {
      // Update Zustand store immediately
      updateGalleryItem(updatedItem.id, updatedItem)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })
}

// Delete gallery item mutation
export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient()
  const { removeGalleryItem } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete gallery item')
      }
    },
    onSuccess: (_, id) => {
      // Update Zustand store immediately
      removeGalleryItem(id)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })
}
