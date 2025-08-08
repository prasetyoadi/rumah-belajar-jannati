import { NextRequest, NextResponse } from 'next/server'
import { Gallery } from '@/types'

// Mock data for gallery based on the uploaded images
// Note: You need to save the actual images to the public/gallery directory
let gallery: Gallery[] = [
  {
    id: '1',
    title: 'Islamic Art & Decorations',
    description: 'Beautiful Islamic calligraphy and motivational posters displaying verses and Islamic phrases including "SubhanAllah", "Alhamdulillah", and "Allahu Akbar"',
    imageUrl: '/gallery/islamic-art-wall.jpg',
    category: 'facility',
    isActive: true,
    order: 1,
    tags: ['islamic art', 'calligraphy', 'wall decoration', 'motivation'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Playground & Physical Development Area',
    description: 'Safe and engaging wooden playground equipment with climbing frames, swings, and slides for children\'s physical development',
    imageUrl: '/gallery/playground-equipment.jpg',
    category: 'playground',
    isActive: true,
    order: 2,
    tags: ['playground', 'physical development', 'wooden equipment', 'climbing', 'safety'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Learning Environment Setup',
    description: 'Well-organized classroom with Arabic alphabet wall charts, educational materials, and proper storage systems',
    imageUrl: '/gallery/learning-environment.jpg',
    category: 'classroom',
    isActive: true,
    order: 3,
    tags: ['classroom', 'arabic alphabet', 'educational materials', 'organization'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Main Classroom',
    description: 'Spacious and well-lit classroom with colorful child-friendly furniture, educational wall displays, and organized learning stations',
    imageUrl: '/gallery/main-classroom.jpg',
    category: 'classroom',
    isActive: true,
    order: 4,
    tags: ['classroom', 'colorful furniture', 'educational displays', 'learning stations'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Interactive Learning Space',
    description: 'Secondary classroom with child-sized tables and chairs in vibrant colors, educational posters, and natural lighting',
    imageUrl: '/gallery/interactive-classroom.jpg',
    category: 'classroom',
    isActive: true,
    order: 5,
    tags: ['interactive learning', 'child-sized furniture', 'natural lighting', 'educational posters'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Jannati Playground Equipment',
    description: 'Premium wooden playground set with multiple activity stations including rope climbing, balance beams, and safe play areas',
    imageUrl: '/gallery/jannati-playground.jpg',
    category: 'playground',
    isActive: true,
    order: 6,
    tags: ['premium equipment', 'rope climbing', 'balance beams', 'safe play', 'wooden'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Multi-Level Classroom',
    description: 'Two-story learning environment with stairs access and additional educational spaces for diverse learning activities',
    imageUrl: '/gallery/multi-level-classroom.jpg',
    category: 'classroom',
    isActive: true,
    order: 7,
    tags: ['multi-level', 'stairs access', 'diverse learning', 'educational spaces'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Upper Level Learning Space',
    description: 'Additional classroom space on upper level with proper ventilation, educational materials, and comfortable learning environment',
    imageUrl: '/gallery/upper-level-classroom.jpg',
    category: 'classroom',
    isActive: true,
    order: 8,
    tags: ['upper level', 'ventilation', 'comfortable learning', 'educational materials'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Complete Learning Facility',
    description: 'Overview of the complete learning facility showcasing the integrated approach to Islamic education with modern amenities',
    imageUrl: '/gallery/complete-facility.jpg',
    category: 'facility',
    isActive: true,
    order: 9,
    tags: ['complete facility', 'integrated approach', 'islamic education', 'modern amenities'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(gallery.sort((a, b) => a.order - b.order))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newGalleryItem: Gallery = {
      id: Date.now().toString(),
      ...data,
      order: gallery.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    gallery.push(newGalleryItem)
    
    return NextResponse.json(newGalleryItem, { status: 201 })
  } catch (error) {
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
    
    const galleryIndex = gallery.findIndex(item => item.id === id)
    if (galleryIndex === -1) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }
    
    gallery[galleryIndex] = {
      ...gallery[galleryIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(gallery[galleryIndex])
  } catch (error) {
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
        { error: 'Gallery item ID is required' },
        { status: 400 }
      )
    }
    
    const galleryIndex = gallery.findIndex(item => item.id === id)
    if (galleryIndex === -1) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }
    
    gallery.splice(galleryIndex, 1)
    
    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
