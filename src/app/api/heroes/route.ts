import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(heroes)
  } catch (error) {
    console.error('Error fetching heroes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch heroes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const hero = await prisma.hero.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageUrl: data.imageUrl,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        isActive: data.isActive ?? true,
        order: data.order || 0,
      },
    })
    
    return NextResponse.json(hero, { status: 201 })
  } catch (error) {
    console.error('Error creating hero:', error)
    return NextResponse.json(
      { error: 'Failed to create hero' },
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
        { error: 'Hero ID is required' },
        { status: 400 }
      )
    }

    const hero = await prisma.hero.update({
      where: { id },
      data: {
        title: updateData.title,
        subtitle: updateData.subtitle,
        description: updateData.description,
        imageUrl: updateData.imageUrl,
        buttonText: updateData.buttonText,
        buttonUrl: updateData.buttonUrl,
        isActive: updateData.isActive,
        order: updateData.order,
      },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error updating hero:', error)
    return NextResponse.json(
      { error: 'Failed to update hero' },
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
        { error: 'Hero ID is required' },
        { status: 400 }
      )
    }

    await prisma.hero.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Hero deleted successfully' })
  } catch (error) {
    console.error('Error deleting hero:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero' },
      { status: 500 }
    )
  }
}
