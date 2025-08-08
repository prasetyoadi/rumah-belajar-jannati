import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@jannati.com' },
    update: {},
    create: {
      email: 'admin@jannati.com',
      name: 'Admin Jannati',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', adminUser)

  // Create a test instructor
  const instructorPassword = await bcrypt.hash('instructor123', 12)
  
  const instructorUser = await prisma.user.upsert({
    where: { email: 'instructor@jannati.com' },
    update: {},
    create: {
      email: 'instructor@jannati.com',
      name: 'Test Instructor',
      password: instructorPassword,
      role: 'INSTRUCTOR',
    },
  })

  console.log('Instructor user created:', instructorUser)

  // Create a test student
  const studentPassword = await bcrypt.hash('student123', 12)
  
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@jannati.com' },
    update: {},
    create: {
      email: 'student@jannati.com',
      name: 'Test Student',
      password: studentPassword,
      role: 'STUDENT',
    },
  })

  console.log('Student user created:', studentUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
