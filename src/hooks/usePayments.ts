import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Payment } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all payments
export const usePayments = () => {
  const { payments, setPayments, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['payments'],
    queryFn: async (): Promise<Payment[]> => {
      const response = await fetch('/api/payments')
      if (!response.ok) {
        throw new Error('Failed to fetch payments')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setPayments(query.data)
    }
    setLoading('payments', query.isLoading)
  }, [query.data, query.isLoading, setPayments, setLoading])

  return {
    ...query,
    data: payments, // Always return data from Zustand store
  }
}

// Fetch payments by student
export const useStudentPayments = (studentId: string) => {
  return useQuery({
    queryKey: ['payments', 'student', studentId],
    queryFn: async (): Promise<Payment[]> => {
      const response = await fetch(`/api/payments?studentId=${studentId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch student payments')
      }
      return response.json()
    },
    enabled: !!studentId,
  })
}

// Fetch pending payments (for admin)
export const usePendingPayments = () => {
  return useQuery({
    queryKey: ['payments', 'pending'],
    queryFn: async (): Promise<Payment[]> => {
      const response = await fetch('/api/payments?status=PENDING')
      if (!response.ok) {
        throw new Error('Failed to fetch pending payments')
      }
      return response.json()
    },
  })
}

// Create payment mutation
export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  const { addPayment } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'student' | 'enrollment'>): Promise<Payment> => {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment')
      }
      return response.json()
    },
    onSuccess: (newPayment) => {
      // Update Zustand store immediately
      addPayment(newPayment)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

// Confirm payment mutation (admin only)
export const useConfirmPayment = () => {
  const queryClient = useQueryClient()
  const { updatePayment } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, confirmedBy }: { id: string; confirmedBy: string }): Promise<Payment> => {
      const response = await fetch('/api/payments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'CONFIRMED', confirmedBy, confirmedAt: new Date().toISOString() }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to confirm payment')
      }
      return response.json()
    },
    onSuccess: (updatedPayment) => {
      // Update Zustand store immediately
      updatePayment(updatedPayment.id, updatedPayment)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

// Reject payment mutation (admin only)
export const useRejectPayment = () => {
  const queryClient = useQueryClient()
  const { updatePayment } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }): Promise<Payment> => {
      const response = await fetch('/api/payments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'REJECTED', notes }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to reject payment')
      }
      return response.json()
    },
    onSuccess: (updatedPayment) => {
      // Update Zustand store immediately
      updatePayment(updatedPayment.id, updatedPayment)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}
