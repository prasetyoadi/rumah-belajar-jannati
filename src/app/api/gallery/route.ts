import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const gallery = await prisma.gallery.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        isActive: data.isActive ?? true,
        order: data.order || 0,
        tags: data.tags || [],
      },
    })
    
    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
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
        { error: 'Gallery ID is required' },
        { status: 400 }
      )
    }

    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        title: updateData.title,
        description: updateData.description,
        imageUrl: updateData.imageUrl,
        category: updateData.category,
        isActive: updateData.isActive,
        order: updateData.order,
        tags: updateData.tags,
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
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
        { error: 'Gallery ID is required' },
        { status: 400 }
      )
    }

    await prisma.gallery.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
