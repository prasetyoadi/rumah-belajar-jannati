import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  // Only protect admin routes (except login and API routes)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page and API routes
    if (request.nextUrl.pathname === '/admin/login' || 
        request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next()
    }

    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
        userId: string
        role: string
      }

      // Check if user is admin
      if (decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      // Clear the invalid token
      response.cookies.set('auth-token', '', { maxAge: 0 })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
