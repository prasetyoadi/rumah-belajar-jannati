import { NextRequest, NextResponse } from 'next/server'
import { Instructor } from '@/types'

// Mock data for instructors
let instructors: Instructor[] = [
  {
    id: '1',
    name: 'Ustazah Fatimah',
    specialization: 'Tahfidz Al-Quran',
    qualifications: ['S1 Pendidikan Agama Islam', 'Tahfidz 30 Juz', 'Sertifikat Metode Ummi'],
    experience: '8 tahun',
    bio: 'Berpengalaman dalam mengajar tahfidz dengan metode yang menyenangkan dan mudah dipahami anak-anak.',
    image: '/instructors/ustazah-fatimah.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ustaz Ahmad',
    specialization: 'Fiqh dan Akidah',
    qualifications: ['S2 Syariah', 'Sertifikat Da\'i', 'Kursus Pendidikan Anak Islam'],
    experience: '12 tahun',
    bio: 'Ahli dalam bidang fiqh dan akidah dengan pendekatan yang mudah dipahami untuk semua kalangan.',
    image: '/instructors/ustaz-ahmad.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ustazah Khadijah',
    specialization: 'Pendidikan Karakter Islam',
    qualifications: ['S1 Psikologi', 'S2 Pendidikan Islam', 'Sertifikat Konseling Anak'],
    experience: '10 tahun',
    bio: 'Fokus pada pembentukan karakter islami anak dengan pendekatan psikologi yang tepat.',
    image: '/instructors/ustazah-khadijah.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(instructors)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch instructors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newInstructor: Instructor = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    instructors.push(newInstructor)
    
    return NextResponse.json(newInstructor, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create instructor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    const instructorIndex = instructors.findIndex(instructor => instructor.id === id)
    if (instructorIndex === -1) {
      return NextResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      )
    }
    
    instructors[instructorIndex] = {
      ...instructors[instructorIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(instructors[instructorIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update instructor' },
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
        { error: 'Instructor ID is required' },
        { status: 400 }
      )
    }
    
    const instructorIndex = instructors.findIndex(instructor => instructor.id === id)
    if (instructorIndex === -1) {
      return NextResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      )
    }
    
    instructors.splice(instructorIndex, 1)
    
    return NextResponse.json({ message: 'Instructor deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete instructor' },
      { status: 500 }
    )
  }
}
