import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Payment interfaces
export interface Payment {
  id: string
  studentId: string
  enrollmentId?: string
  amount: number
  method: 'CASH' | 'BANK_TRANSFER' | 'E_WALLET' | 'OTHER'
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED'
  reference?: string
  notes?: string
  paidAt?: string
  confirmedAt?: string
  confirmedBy?: string
  createdAt: string
  updatedAt: string
  student?: {
    name: string
  }
  enrollment?: {
    program: {
      title: string
    }
  }
}

// Fetch all payments
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async (): Promise<Payment[]> => {
      const response = await fetch('/api/payments')
      if (!response.ok) {
        throw new Error('Failed to fetch payments')
      }
      return response.json()
    },
  })
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
        throw new Error('Failed to create payment')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

// Confirm payment mutation (admin only)
export const useConfirmPayment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, confirmedBy }: { id: string; confirmedBy: string }): Promise<Payment> => {
      const response = await fetch(`/api/payments/${id}/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmedBy }),
      })
      if (!response.ok) {
        throw new Error('Failed to confirm payment')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

// Reject payment mutation (admin only)
export const useRejectPayment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }): Promise<Payment> => {
      const response = await fetch(`/api/payments/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      })
      if (!response.ok) {
        throw new Error('Failed to reject payment')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}
