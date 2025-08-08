'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useLogin } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/useAuthStore'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function AdminLogin() {
  const router = useRouter()
  const loginMutation = useLogin()
  const { login, isAuthenticated, user, isLoading, checkAuth } = useAuthStore()

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [isAuthenticated, user, isLoading, router])

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const result = await loginMutation.mutateAsync(values)
      
      // Store JWT token in auth store
      if (result.token) {
        login(result.token, result.user)
      }
      
      // Redirect to admin dashboard
      router.push('/admin')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rumah Belajar Jannati
          </p>
        </div>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3"
                    placeholder="Email address"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>

              {loginMutation.error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">
                    {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed'}
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loginMutation.isPending}
                  className="group relative flex w-full justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="text-center">
                <a
                  href="/admin/forgot-password"
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
