import { NextRequest, NextResponse } from 'next/server'
import { Benefit } from '@/types'

// Mock data for benefits
let benefits: Benefit[] = [
  {
    id: '1',
    title: 'Pendidikan Qur\'ani',
    description: 'Pembelajaran Al-Quran dengan metode yang mudah dan menyenangkan',
    icon: 'book-open',
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Akhlak Mulia',
    description: 'Pembentukan karakter islami yang kuat dan berakhlak mulia',
    icon: 'heart',
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Guru Berpengalaman',
    description: 'Tenaga pengajar yang kompeten dan berpengalaman di bidangnya',
    icon: 'academic-cap',
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Lingkungan Islami',
    description: 'Suasana belajar yang kondusif dengan nuansa islami yang kental',
    icon: 'home',
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(benefits.sort((a, b) => a.order - b.order))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch benefits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newBenefit: Benefit = {
      id: Date.now().toString(),
      ...data,
      order: benefits.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    benefits.push(newBenefit)
    
    return NextResponse.json(newBenefit, { status: 201 })
  } catch (error) {
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
    
    const benefitIndex = benefits.findIndex(benefit => benefit.id === id)
    if (benefitIndex === -1) {
      return NextResponse.json(
        { error: 'Benefit not found' },
        { status: 404 }
      )
    }
    
    benefits[benefitIndex] = {
      ...benefits[benefitIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(benefits[benefitIndex])
  } catch (error) {
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
    
    const benefitIndex = benefits.findIndex(benefit => benefit.id === id)
    if (benefitIndex === -1) {
      return NextResponse.json(
        { error: 'Benefit not found' },
        { status: 404 }
      )
    }
    
    benefits.splice(benefitIndex, 1)
    
    return NextResponse.json({ message: 'Benefit deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete benefit' },
      { status: 500 }
    )
  }
}
