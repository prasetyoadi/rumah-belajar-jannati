'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    // Check authentication status on app initialization
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}
