import { NextRequest, NextResponse } from 'next/server'
import { Testimonial } from '@/types'

// Mock data for testimonials
let testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ibu Sari',
    role: 'Orang Tua Murid',
    content: 'Alhamdulillah, anak saya sangat senang belajar di Rumah Belajar Jannati. Guru-gurunya sabar dan metode pengajarannya sangat baik.',
    rating: 5,
    image: '/testimonials/ibu-sari.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bapak Ahmad',
    role: 'Wali Murid',
    content: 'Program tahfidz di sini sangat bagus. Anak saya sudah hafal beberapa surah dalam waktu singkat. Terima kasih ustaz dan ustazah!',
    rating: 5,
    image: '/testimonials/bapak-ahmad.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ibu Fatimah',
    role: 'Orang Tua',
    content: 'Lingkungan belajar yang islami dan kondusif. Anak-anak diajarkan tidak hanya ilmu agama tapi juga akhlak yang baik.',
    rating: 5,
    image: '/testimonials/ibu-fatimah.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(testimonials.filter(t => t.isActive))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    testimonials.push(newTestimonial)
    
    return NextResponse.json(newTestimonial, { status: 201 })
  } catch (error) {
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
    
    const testimonialIndex = testimonials.findIndex(testimonial => testimonial.id === id)
    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }
    
    testimonials[testimonialIndex] = {
      ...testimonials[testimonialIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(testimonials[testimonialIndex])
  } catch (error) {
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
    
    const testimonialIndex = testimonials.findIndex(testimonial => testimonial.id === id)
    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }
    
    testimonials.splice(testimonialIndex, 1)
    
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
