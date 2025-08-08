import { NextRequest, NextResponse } from 'next/server'
import { mockPrograms } from '@/lib/data'
import { Program } from '@/types'

// In a real application, these would interact with a database
let programs: Program[] = [...mockPrograms]

export async function GET() {
  try {
    return NextResponse.json(programs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProgram: Program = {
      id: Date.now().toString(),
      ...body,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    programs.push(newProgram)
    
    return NextResponse.json(newProgram, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    const index = programs.findIndex(program => program.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }
    
    programs[index] = {
      ...programs[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json(programs[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update program' },
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
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }
    
    const index = programs.findIndex(program => program.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }
    
    programs.splice(index, 1)
    
    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete program' },
      { status: 500 }
    )
  }
}
