import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentName,
      birthDate,
      address,
      phone,
      parentName,
      parentPhone,
      parentEmail,
      programId,
      paymentMethod,
      subsidyAmount,
      email,
      password,
      agreeToTerms,
    } = body;

    if (!studentName || !parentName || !parentPhone || !parentEmail || !programId || !email || !password || !agreeToTerms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        name: parentName,
        password: hashedPassword,
        role: 'STUDENT',
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        name: studentName,
        birthDate: birthDate ? new Date(birthDate) : null,
        address,
        phone,
        parentName,
        parentPhone,
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        programId,
        status: 'PENDING',
      },
    });

    const baseMonthlyFee = Number(program.monthlyFee);
    const sppAmount = subsidyAmount ? baseMonthlyFee - subsidyAmount : baseMonthlyFee;

    const payments = [];

    if (Number(program.registrationFee) > 0) {
      const registrationPayment = await prisma.payment.create({
        data: {
          studentId: student.id,
          enrollmentId: enrollment.id,
          amount: program.registrationFee,
          method: paymentMethod,
          status: 'PENDING',
          notes: 'Biaya pendaftaran',
        },
      });
      payments.push(registrationPayment);
    }

    if (Number(program.bookFee) > 0) {
      const bookPayment = await prisma.payment.create({
        data: {
          studentId: student.id,
          enrollmentId: enrollment.id,
          amount: program.bookFee,
          method: paymentMethod,
          status: 'PENDING',
          notes: 'Biaya buku',
        },
      });
      payments.push(bookPayment);
    }

    if (sppAmount > 0) {
      const sppPayment = await prisma.payment.create({
        data: {
          studentId: student.id,
          enrollmentId: enrollment.id,
          amount: sppAmount,
          method: paymentMethod,
          status: 'PENDING',
          notes: subsidyAmount 
            ? `SPP bulanan (subsidi Rp ${subsidyAmount.toLocaleString('id-ID')})`
            : 'SPP bulanan',
        },
      });
      payments.push(sppPayment);
    }

    return NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, email: user.email, name: user.name },
        student: { id: student.id, name: student.name },
        enrollment: { id: enrollment.id, status: enrollment.status },
        payments: payments.map(payment => ({
          id: payment.id,
          amount: payment.amount,
          method: payment.method,
          status: payment.status,
        })),
        program: { id: program.id, title: program.title },
      },
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const enrollmentId = searchParams.get('enrollmentId');

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Missing enrollmentId parameter' },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: {
          include: {
            user: {
              select: { email: true, name: true },
            },
          },
        },
        program: {
          select: { title: true, description: true },
        },
        payments: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        enrollment: {
          id: enrollment.id,
          status: enrollment.status,
          enrolledAt: enrollment.enrolledAt,
        },
        student: {
          id: enrollment.student.id,
          name: enrollment.student.name,
          parentName: enrollment.student.parentName,
        },
        program: {
          title: enrollment.program.title,
          description: enrollment.program.description,
        },
        payments: enrollment.payments.map(payment => ({
          id: payment.id,
          amount: payment.amount,
          method: payment.method,
          status: payment.status,
          notes: payment.notes,
          createdAt: payment.createdAt,
        })),
      },
    });

  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
