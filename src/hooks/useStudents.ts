import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Student } from '@/store/useDataStore'
import { useDataStore } from '@/store/useDataStore'
import { useEffect } from 'react'

// Fetch all students
export const useStudents = () => {
  const { students, setStudents, setLoading } = useDataStore()
  
  const query = useQuery({
    queryKey: ['students'],
    queryFn: async (): Promise<Student[]> => {
      const response = await fetch('/api/students')
      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setStudents(query.data)
    }
    setLoading('students', query.isLoading)
  }, [query.data, query.isLoading, setStudents, setLoading])

  return {
    ...query,
    data: students, // Always return data from Zustand store
  }
}

// Fetch single student
export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async (): Promise<Student> => {
      const response = await fetch(`/api/students/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch student')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Create student mutation
export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  const { addStudent } = useDataStore()
  
  return useMutation({
    mutationFn: async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create student')
      }
      return response.json()
    },
    onSuccess: (newStudent) => {
      // Update Zustand store immediately
      addStudent(newStudent)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Update student mutation
export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  const { updateStudent } = useDataStore()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Student> }): Promise<Student> => {
      const response = await fetch('/api/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update student')
      }
      return response.json()
    },
    onSuccess: (updatedStudent) => {
      // Update Zustand store immediately
      updateStudent(updatedStudent.id, updatedStudent)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Delete student mutation
export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  const { removeStudent } = useDataStore()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/students?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete student')
      }
    },
    onSuccess: (_, id) => {
      // Update Zustand store immediately
      removeStudent(id)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
