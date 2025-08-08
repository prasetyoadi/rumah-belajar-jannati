import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        instructor: true,
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

    return NextResponse.json(programs)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.description || !data.price || !data.duration || !data.capacity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const program = await prisma.program.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: parseFloat(data.price),
        duration: data.duration,
        capacity: parseInt(data.capacity),
        minAge: data.minAge ? parseInt(data.minAge) : null,
        maxAge: data.maxAge ? parseInt(data.maxAge) : null,
        schedule: data.schedule,
        category: data.category || 'TPA',
        instructorId: data.instructorId || null,
        isActive: data.isActive ?? true,
      },
      include: {
        instructor: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program' },
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
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    const program = await prisma.program.update({
      where: { id },
      data: {
        ...updateData,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        capacity: updateData.capacity ? parseInt(updateData.capacity) : undefined,
        minAge: updateData.minAge ? parseInt(updateData.minAge) : undefined,
        maxAge: updateData.maxAge ? parseInt(updateData.maxAge) : undefined,
      },
      include: {
        instructor: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { error: 'Failed to update program' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    await prisma.program.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { error: 'Failed to delete program' },
      { status: 500 }
    )
  }
}
