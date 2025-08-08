import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        enrollment: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            program: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const payment = await prisma.payment.create({
      data: {
        enrollmentId: data.enrollmentId,
        studentId: data.studentId, // Add required studentId
        amount: parseFloat(data.amount),
        method: data.method,
        status: data.status || 'PENDING',
        paidAt: data.paymentDate ? new Date(data.paymentDate) : new Date(),
        reference: data.reference,
        notes: data.notes,
      },
      include: {
        enrollment: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            program: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
          },
        },
      },
    })

    // Update enrollment status if payment is approved
    if (data.status === 'APPROVED' && data.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: data.enrollmentId },
        data: { status: 'ACTIVE' },
      })
    }
    
    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
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
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
        method: updateData.method,
        status: updateData.status,
        paidAt: updateData.paymentDate ? new Date(updateData.paymentDate) : undefined,
        reference: updateData.reference,
        notes: updateData.notes,
      },
      include: {
        enrollment: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            program: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
          },
        },
      },
    })

    // Update enrollment status based on payment status
    if (updateData.status === 'APPROVED' && payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: { status: 'ACTIVE' },
      })
    } else if (updateData.status === 'REJECTED' && payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: { status: 'CANCELLED' },
      })
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json(
      { error: 'Failed to update payment' },
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
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    await prisma.payment.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Payment deleted successfully' })
  } catch (error) {
    console.error('Error deleting payment:', error)
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    )
  }
}
