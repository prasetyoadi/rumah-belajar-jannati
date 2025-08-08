import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        program: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: data.studentId,
        programId: data.programId,
        status: data.status || 'PENDING',
        enrolledAt: data.enrollmentDate ? new Date(data.enrollmentDate) : new Date(),
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        program: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    
    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    if (!id) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status: updateData.status,
        enrolledAt: updateData.enrollmentDate ? new Date(updateData.enrollmentDate) : undefined,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        program: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error('Error updating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    await prisma.enrollment.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}
