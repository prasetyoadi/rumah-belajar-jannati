import { NextRequest, NextResponse } from 'next/server'
import { FAQ } from '@/types'

// Mock data for FAQs
let faqs: FAQ[] = [
  {
    id: '1',
    question: 'Berapa biaya pendaftaran di Rumah Belajar Jannati?',
    answer: 'Biaya pendaftaran bervariasi sesuai program yang dipilih. Untuk program preschool Rp 100.000, TPA Rp 75.000, dan kursus reguler Rp 50.000.',
    category: 'registration',
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    question: 'Apa saja program yang tersedia?',
    answer: 'Kami menyediakan program Preschool Islam, TPA (Taman Pendidikan Al-Quran), dan berbagai kursus seperti Tahfidz, Bahasa Arab, dan Pendidikan Karakter Islam.',
    category: 'programs',
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    question: 'Berapa usia minimum untuk mendaftar?',
    answer: 'Usia minimum adalah 3 tahun untuk program Preschool, 4 tahun untuk TPA, dan 5 tahun untuk kursus reguler.',
    category: 'general',
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    question: 'Apakah ada sistem subsidi untuk keluarga kurang mampu?',
    answer: 'Ya, kami menyediakan program subsidi dengan syarat dan ketentuan tertentu. Silakan hubungi admin untuk informasi lebih lanjut.',
    category: 'payment',
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(faqs.sort((a, b) => a.order - b.order))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newFaq: FAQ = {
      id: Date.now().toString(),
      ...data,
      order: faqs.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    faqs.push(newFaq)
    
    return NextResponse.json(newFaq, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    const faqIndex = faqs.findIndex(faq => faq.id === id)
    if (faqIndex === -1) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      )
    }
    
    faqs[faqIndex] = {
      ...faqs[faqIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(faqs[faqIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
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
        { error: 'FAQ ID is required' },
        { status: 400 }
      )
    }
    
    const faqIndex = faqs.findIndex(faq => faq.id === id)
    if (faqIndex === -1) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      )
    }
    
    faqs.splice(faqIndex, 1)
    
    return NextResponse.json({ message: 'FAQ deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
}
