import { NextRequest, NextResponse } from 'next/server'
import { PortalData } from '@/types'

// Mock portal data for demonstration
const mockPortalData: PortalData[] = [
  {
    portalName: 'Website Rumah Belajar Jannati',
    commitHash: 'a1b2c3d4',
    timestamp: new Date().toISOString(),
    status: 'active'
  },
  {
    portalName: 'Admin Panel',
    commitHash: 'e5f6g7h8',
    timestamp: new Date().toISOString(),
    status: 'active'
  },
  {
    portalName: 'Student Portal',
    commitHash: 'i9j0k1l2',
    timestamp: new Date().toISOString(),
    status: 'active'
  }
]

export async function GET() {
  try {
    // Simulate fetching commit hashes from different portals
    const updatedData = mockPortalData.map(portal => ({
      ...portal,
      timestamp: new Date().toISOString(),
      commitHash: Math.random().toString(36).substring(7)
    }))

    return NextResponse.json(updatedData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch portal data' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
