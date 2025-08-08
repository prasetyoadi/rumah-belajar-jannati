import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@jannati.com' },
    update: {},
    create: {
      email: 'admin@jannati.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', adminUser)

  // Create instructor users and instructors
  const instructorPassword = await bcrypt.hash('instructor123', 12)
  const instructorUser1 = await prisma.user.upsert({
    where: { email: 'fatimah@jannati.com' },
    update: {},
    create: {
      email: 'fatimah@jannati.com',
      name: 'Ustazah Fatimah',
      role: 'INSTRUCTOR',
      password: instructorPassword,
    },
  })

  console.log('Instructor user created:', instructorUser1)

  const instructor1 = await prisma.instructor.upsert({
    where: { userId: instructorUser1.id },
    update: {},
    create: {
      userId: instructorUser1.id,
      name: 'Ustazah Fatimah',
      specialization: 'Tahfidz Al-Quran',
      bio: 'Berpengalaman dalam mengajar tahfidz dengan metode yang menyenangkan dan mudah dipahami anak-anak. Memiliki kualifikasi S1 Pendidikan Agama Islam, Tahfidz 30 Juz, dan Sertifikat Metode Ummi dengan pengalaman 8 tahun.',
      imageUrl: '/instructors/ustazah-fatimah.jpg',
      isActive: true,
    },
  })

  const instructorUser2 = await prisma.user.upsert({
    where: { email: 'ahmad@jannati.com' },
    update: {},
    create: {
      email: 'ahmad@jannati.com',
      name: 'Ustaz Ahmad',
      role: 'INSTRUCTOR',
      password: instructorPassword,
    },
  })

  const instructor2 = await prisma.instructor.upsert({
    where: { userId: instructorUser2.id },
    update: {},
    create: {
      userId: instructorUser2.id,
      name: 'Ustaz Ahmad',
      specialization: 'Fiqh dan Akidah',
      bio: 'Ahli dalam bidang fiqh dan akidah dengan pendekatan yang mudah dipahami untuk semua kalangan. Memiliki kualifikasi S2 Syariah, Sertifikat Da\'i, dan Kursus Pendidikan Anak Islam dengan pengalaman 12 tahun.',
      imageUrl: '/instructors/ustaz-ahmad.jpg',
      isActive: true,
    },
  })

  // Create programs
  const program1 = await prisma.program.create({
    data: {
      title: 'Tahfidz Al-Quran',
      description: 'Program menghafal Al-Quran dengan metode yang mudah dan menyenangkan untuk anak-anak. Persyaratan: Sudah bisa membaca Al-Quran, Membawa mushaf sendiri. Manfaat: Hafal minimal 5 Juz, Peningkatan kemampuan membaca Al-Quran, Pembentukan karakter islami.',
      category: 'QURAN_MEMORIZATION',
      instructorId: instructor1.id,
      programType: 'tpa',
      ageGroup: '6-12 years',
      registrationFee: 50000,
      bookFee: 100000,
      monthlyFee: 300000,
      sppSubsidies: [50000, 75000, 100000],
      sppPrivate: 0,
      duration: '6 bulan',
      schedule: 'Senin, Rabu, Jumat (16:00-17:30)',
      curriculum: ['Tahfidz', 'Tahsin', 'Fiqih', 'Hadist', 'Aqidah', 'Siroh'],
      capacity: 15,
      minAge: 6,
      maxAge: 12,
      imageUrl: '/programs/tahfidz.jpg',
      isActive: true,
    },
  })

  const program2 = await prisma.program.create({
    data: {
      title: 'Akidah dan Akhlak',
      description: 'Program pembelajaran dasar-dasar akidah Islam dan pembentukan akhlak mulia. Persyaratan: Motivasi belajar yang tinggi. Manfaat: Pemahaman akidah yang benar, Pembentukan akhlak mulia, Penguatan iman.',
      category: 'ARABIC_COURSE',
      instructorId: instructor2.id,
      programType: 'course',
      ageGroup: '7-15 years',
      registrationFee: 50000,
      bookFee: 75000,
      monthlyFee: 250000,
      sppSubsidies: [],
      sppPrivate: 350000,
      duration: '4 bulan',
      schedule: 'Selasa, Kamis (15:30-17:00)',
      curriculum: ['Basic Arabic Grammar', 'Vocabulary', 'Conversation', 'Reading & Writing'],
      capacity: 20,
      minAge: 7,
      maxAge: 15,
      imageUrl: '/programs/akidah.jpg',
      isActive: true,
    },
  })

  // Create additional programs
  const program3 = await prisma.program.create({
    data: {
      title: 'Quranic Pre School',
      description: 'Comprehensive early childhood Islamic education program dengan kurikulum yang disesuaikan untuk anak usia dini.',
      category: 'PRESCHOOL',
      instructorId: instructor1.id,
      programType: 'preschool',
      ageGroup: '3-6 years',
      registrationFee: 50000,
      bookFee: 100000,
      monthlyFee: 300000,
      sppSubsidies: [50000, 75000, 100000],
      sppPrivate: 0,
      duration: '1 year',
      schedule: 'Monday-Friday (08:00-11:00)',
      curriculum: ['Praktik Ibadah', 'Fiqih', 'Hadist', 'Tahsin', 'Tahfidz', 'Doa Harian', 'Aqidah', 'Siroh', 'Bahasa Arab', 'Adab dan Akhlak'],
      capacity: 12,
      minAge: 3,
      maxAge: 6,
      imageUrl: '/programs/preschool.jpg',
      isActive: true,
    },
  })

  const program4 = await prisma.program.create({
    data: {
      title: 'Tahsin Ummahat',
      description: 'Quran recitation improvement for mothers dengan pendekatan yang lembut dan sabar.',
      category: 'TAHSIN',
      instructorId: instructor1.id,
      programType: 'course',
      ageGroup: 'Adults',
      registrationFee: 50000,
      bookFee: 35000,
      monthlyFee: 0,
      sppSubsidies: [50000, 75000, 100000],
      sppPrivate: 0,
      duration: '6 months',
      schedule: 'Tuesday & Thursday (09:00-11:00)',
      curriculum: ['Makharijul Huruf', 'Tajweed', 'Tahsin', 'Tafsir'],
      capacity: 15,
      minAge: 18,
      maxAge: 70,
      imageUrl: '/programs/tahsin.jpg',
      isActive: true,
    },
  })

  // Create heroes
  await prisma.hero.create({
    data: {
      title: 'Rumah Belajar Jannati',
      subtitle: 'Membentuk Generasi Qur\'ani',
      description: 'Tempat belajar Al-Quran dan pendidikan karakter islami untuk anak-anak dengan metode yang menyenangkan dan efektif.',
      imageUrl: '/heroes/main-hero.jpg',
      buttonText: 'Daftar Sekarang',
      buttonUrl: '/programs',
      isActive: true,
      order: 1,
    },
  })

  // Create benefits
  const benefits = [
    {
      title: 'Pendidikan Qur\'ani',
      description: 'Pembelajaran Al-Quran dengan metode yang mudah dan menyenangkan',
      icon: 'book-open',
      order: 1,
    },
    {
      title: 'Akhlak Mulia',
      description: 'Pembentukan karakter islami yang kuat dan berakhlak mulia',
      icon: 'heart',
      order: 2,
    },
    {
      title: 'Guru Berpengalaman',
      description: 'Tenaga pengajar yang kompeten dan berpengalaman di bidangnya',
      icon: 'academic-cap',
      order: 3,
    },
    {
      title: 'Lingkungan Islami',
      description: 'Suasana belajar yang kondusif dengan nuansa islami',
      icon: 'home',
      order: 4,
    },
  ]

  for (const benefit of benefits) {
    await prisma.benefit.create({
      data: {
        ...benefit,
        isActive: true,
      },
    })
  }

  // Create FAQs
  const faqs = [
    {
      question: 'Berapa usia minimal untuk bergabung?',
      answer: 'Usia minimal adalah 5 tahun untuk program dasar, sedangkan untuk program tahfidz minimal 6 tahun.',
      category: 'general',
      order: 1,
    },
    {
      question: 'Apakah ada tes masuk?',
      answer: 'Tidak ada tes masuk yang ketat. Kami hanya melakukan asesmen kemampuan dasar untuk penempatan kelas yang tepat.',
      category: 'enrollment',
      order: 2,
    },
    {
      question: 'Bagaimana metode pembayaran?',
      answer: 'Pembayaran dapat dilakukan secara bulanan atau per semester melalui transfer bank atau tunai.',
      category: 'payment',
      order: 3,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: {
        ...faq,
        isActive: true,
      },
    })
  }

  // Create testimonials
  const testimonials = [
    {
      name: 'Ibu Sari',
      role: 'Orang Tua Siswa',
      content: 'Alhamdulillah, anak saya sangat senang belajar di Jannati. Hafalannya bertambah dan akhlaknya jadi lebih baik.',
      imageUrl: '/testimonials/ibu-sari.jpg',
      rating: 5,
      order: 1,
    },
    {
      name: 'Bapak Ahmad',
      role: 'Wali Murid',
      content: 'Metode pengajaran di Jannati sangat bagus. Anak-anak tidak merasa bosan dan semangat belajarnya tinggi.',
      imageUrl: '/testimonials/bapak-ahmad.jpg',
      rating: 5,
      order: 2,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: {
        ...testimonial,
        isActive: true,
      },
    })
  }

  // Create gallery items
  const galleryItems = [
    {
      title: 'Islamic Art & Decorations',
      description: 'Beautiful Islamic calligraphy and motivational posters displaying verses and Islamic phrases',
      imageUrl: '/gallery/islamic-art-wall.jpg',
      category: 'facility',
      tags: ['islamic art', 'calligraphy', 'wall decoration', 'motivation'],
      order: 1,
    },
    {
      title: 'Playground & Physical Development Area',
      description: 'Safe and engaging wooden playground equipment with climbing frames, swings, and slides',
      imageUrl: '/gallery/playground-equipment.jpg',
      category: 'playground',
      tags: ['playground', 'physical development', 'wooden equipment', 'climbing', 'safety'],
      order: 2,
    },
    {
      title: 'Main Classroom',
      description: 'Spacious and well-lit classroom with colorful child-friendly furniture and educational displays',
      imageUrl: '/gallery/main-classroom.jpg',
      category: 'classroom',
      tags: ['classroom', 'furniture', 'educational displays', 'learning environment'],
      order: 3,
    },
  ]

  for (const item of galleryItems) {
    await prisma.gallery.create({
      data: {
        ...item,
        isActive: true,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
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
