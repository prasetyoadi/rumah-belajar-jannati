import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        content: data.content || data.message, // Support both content and message fields
        imageUrl: data.imageUrl || data.image, // Support both imageUrl and image fields
        rating: data.rating || 5,
        isActive: data.isActive ?? true,
        order: data.order || 0,
      },
    })
    
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
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
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: updateData.name,
        role: updateData.role,
        content: updateData.content || updateData.message,
        imageUrl: updateData.imageUrl || updateData.image,
        rating: updateData.rating,
        isActive: updateData.isActive,
        order: updateData.order,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
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
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    await prisma.testimonial.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
