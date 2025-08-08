import { NextRequest, NextResponse } from 'next/server'
import { Hero } from '@/types'

// Mock data for heroes
let heroes: Hero[] = [
  {
    id: '1',
    title: 'Rumah Belajar Jannati',
    subtitle: 'Pendidikan Islam Terpadu',
    description: 'Membangun generasi Qur\'ani yang berakhlak mulia dengan pendidikan Islam yang komprehensif dan berkualitas.',
    image: '/hero/hero-1.jpg',
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Program Tahfidz Unggulan',
    subtitle: 'Menghafal Al-Quran dengan Mudah',
    description: 'Program tahfidz dengan metode yang terbukti efektif dan menyenangkan untuk segala usia.',
    image: '/hero/hero-2.jpg',
    isActive: false,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(heroes.sort((a, b) => a.order - b.order))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch heroes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newHero: Hero = {
      id: Date.now().toString(),
      ...data,
      order: heroes.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    heroes.push(newHero)
    
    return NextResponse.json(newHero, { status: 201 })
  } catch (error) {
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
    
    const heroIndex = heroes.findIndex(hero => hero.id === id)
    if (heroIndex === -1) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      )
    }
    
    heroes[heroIndex] = {
      ...heroes[heroIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(heroes[heroIndex])
  } catch (error) {
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
    
    const heroIndex = heroes.findIndex(hero => hero.id === id)
    if (heroIndex === -1) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      )
    }
    
    heroes.splice(heroIndex, 1)
    
    return NextResponse.json({ message: 'Hero deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete hero' },
      { status: 500 }
    )
  }
}
