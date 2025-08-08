import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const benefits = await prisma.benefit.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(benefits)
  } catch (error) {
    console.error('Error fetching benefits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch benefits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const benefit = await prisma.benefit.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        isActive: data.isActive ?? true,
        order: data.order || 0,
      },
    })
    
    return NextResponse.json(benefit, { status: 201 })
  } catch (error) {
    console.error('Error creating benefit:', error)
    return NextResponse.json(
      { error: 'Failed to create benefit' },
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
        { error: 'Benefit ID is required' },
        { status: 400 }
      )
    }

    const benefit = await prisma.benefit.update({
      where: { id },
      data: {
        title: updateData.title,
        description: updateData.description,
        icon: updateData.icon,
        isActive: updateData.isActive,
        order: updateData.order,
      },
    })

    return NextResponse.json(benefit)
  } catch (error) {
    console.error('Error updating benefit:', error)
    return NextResponse.json(
      { error: 'Failed to update benefit' },
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
        { error: 'Benefit ID is required' },
        { status: 400 }
      )
    }

    await prisma.benefit.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Benefit deleted successfully' })
  } catch (error) {
    console.error('Error deleting benefit:', error)
    return NextResponse.json(
      { error: 'Failed to delete benefit' },
      { status: 500 }
    )
  }
}
