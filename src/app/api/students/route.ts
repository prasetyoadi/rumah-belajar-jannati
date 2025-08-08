import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollments: {
          include: {
            program: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Create user first if userId is not provided
    let userId = data.userId
    if (!userId && data.email) {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: 'STUDENT',
        },
      })
      userId = user.id
    }

    const student = await prisma.student.create({
      data: {
        userId,
        name: data.name,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        address: data.address,
        phone: data.phone,
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        isActive: data.isActive ?? true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollments: {
          include: {
            program: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })
    
    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
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
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        name: updateData.name,
        birthDate: updateData.birthDate ? new Date(updateData.birthDate) : undefined,
        address: updateData.address,
        phone: updateData.phone,
        parentName: updateData.parentName,
        parentPhone: updateData.parentPhone,
        isActive: updateData.isActive,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollments: {
          include: {
            program: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
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
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    await prisma.student.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
