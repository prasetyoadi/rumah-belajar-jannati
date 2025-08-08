import { Program, Instructor, FAQ, Testimonial, ContactInfo, Hero, Benefit } from '@/types'

// Mock data for demonstration - In production, this would come from a database
export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Quranic Pre School',
    description: 'Comprehensive early childhood Islamic education program',
    type: 'preschool',
    ageGroup: '3-6 years',
    duration: '1 year',
    schedule: ['Monday-Friday', '08:00-11:00'],
    price: {
      registration: 50000,
      book: 100000,
      monthly: 300000,
      spp: {
        subsidy: [50000, 75000, 100000],
        private: 0
      }
    },
    curriculum: ['Praktik Ibadah', 'Fiqih', 'Hadist', 'Tahsin', 'Tahfidz', 'Doa Harian', 'Aqidah', 'Siroh', 'Bahasa Arab', 'Adab dan Akhlak'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'TPA Kids',
    description: 'Taman Pendidikan Al-Quran for children',
    type: 'tpa',
    ageGroup: '6-12 years',
    duration: 'Ongoing',
    schedule: ['Monday-Friday', '15:00-17:00'],
    price: {
      registration: 50000,
      book: 100000,
      monthly: 300000,
      spp: {
        subsidy: [50000, 75000, 100000],
        private: 0
      }
    },
    curriculum: ['Tahsin', 'Tahfidz', 'Fiqih', 'Hadist', 'Aqidah', 'Siroh'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Tahsin Ummahat',
    description: 'Quran recitation improvement for mothers',
    type: 'course',
    ageGroup: 'Adults',
    duration: '6 months',
    schedule: ['Tuesday & Thursday', '09:00-11:00'],
    price: {
      registration: 50000,
      book: 35000,
      monthly: 0,
      spp: {
        subsidy: [50000, 75000, 100000],
        private: 0
      }
    },
    curriculum: ['Makharijul Huruf', 'Tajweed', 'Tahsin', 'Tafsir'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Arabic Course',
    description: 'Learn Arabic language from basics to advanced',
    type: 'course',
    ageGroup: 'All ages',
    duration: '1 year',
    schedule: ['Saturday', '09:00-11:00'],
    price: {
      registration: 50000,
      book: 100000,
      monthly: 250000,
      spp: {
        subsidy: [],
        private: 350000
      }
    },
    curriculum: ['Basic Arabic Grammar', 'Vocabulary', 'Conversation', 'Reading & Writing'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'English Course',
    description: 'English language course for all levels',
    type: 'course',
    ageGroup: 'All ages',
    duration: '1 year',
    schedule: ['Sunday', '09:00-11:00'],
    price: {
      registration: 50000,
      book: 100000,
      monthly: 250000,
      spp: {
        subsidy: [],
        private: 350000
      }
    },
    curriculum: ['Grammar', 'Vocabulary', 'Speaking', 'Listening', 'Reading', 'Writing'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '6',
    name: 'Mathematics Course',
    description: 'Mathematics course from basic to advanced level',
    type: 'course',
    ageGroup: 'Students',
    duration: '1 year',
    schedule: ['Saturday & Sunday', '13:00-15:00'],
    price: {
      registration: 50000,
      book: 100000,
      monthly: 250000,
      spp: {
        subsidy: [],
        private: 350000
      }
    },
    curriculum: ['Basic Math', 'Algebra', 'Geometry', 'Statistics', 'Problem Solving'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '7',
    name: 'Tahfidz Course',
    description: 'Memorization of the Holy Quran',
    type: 'course',
    ageGroup: 'All ages',
    duration: 'Ongoing',
    schedule: ['Daily', 'Flexible timing'],
    price: {
      registration: 50000,
      book: 50000,
      monthly: 200000,
      spp: {
        subsidy: [],
        private: 300000
      }
    },
    curriculum: ['Quran Memorization', 'Tajweed', 'Revision', 'Muraja\'ah'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '8',
    name: 'Calistung Course',
    description: 'Reading, writing, and counting for early learners',
    type: 'course',
    ageGroup: '4-7 years',
    duration: '6 months',
    schedule: ['Monday-Friday', '16:00-17:00'],
    price: {
      registration: 50000,
      book: 75000,
      monthly: 200000,
      spp: {
        subsidy: [],
        private: 250000
      }
    },
    curriculum: ['Reading (Membaca)', 'Writing (Menulis)', 'Counting (Berhitung)', 'Basic Math'],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Ustadzah Siti Aminah',
    specialization: 'Quranic Studies & Early Childhood Education',
    qualifications: ['S1 Pendidikan Islam', 'Certified Tahfidz Teacher', '10+ years experience'],
    experience: '15 years',
    bio: 'Experienced Islamic educator specializing in early childhood Quranic education and character building.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Ustadz Ahmad Fauzi',
    specialization: 'Arabic Language & Islamic Studies',
    qualifications: ['S1 Bahasa Arab', 'Al-Azhar Graduate', 'Arabic Language Expert'],
    experience: '12 years',
    bio: 'Arabic language expert with extensive experience in teaching Arabic and Islamic studies.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Ustadzah Fatimah',
    specialization: 'Tahsin & Tahfidz',
    qualifications: ['Hafidz 30 Juz', 'Certified Qiraat Teacher', 'Tajweed Expert'],
    experience: '8 years',
    bio: 'Dedicated Quran teacher with expertise in Tahsin, Tahfidz, and Qiraat.',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Berapa biaya pendaftaran di Rumah Belajar Jannati?',
    answer: 'Biaya pendaftaran untuk semua program adalah Rp. 50.000. Biaya ini hanya dibayar sekali pada saat pendaftaran awal.',
    category: 'registration',
    isActive: true,
    order: 1,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    question: 'Apakah tersedia program subsidi untuk SPP?',
    answer: 'Ya, kami menyediakan program SPP subsidi dengan berbagai pilihan: Rp. 50.000, Rp. 75.000, dan Rp. 100.000 per bulan sesuai kemampuan orang tua.',
    category: 'payment',
    isActive: true,
    order: 2,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    question: 'Berapa usia minimal untuk mengikuti Quranic Pre School?',
    answer: 'Usia minimal untuk Quranic Pre School adalah 3 tahun dan maksimal 6 tahun.',
    category: 'programs',
    isActive: true,
    order: 3,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    question: 'Apakah ada kelas percobaan?',
    answer: 'Ya, kami menyediakan kelas percobaan gratis selama 3 hari untuk memastikan anak nyaman dengan lingkungan belajar kami.',
    category: 'general',
    isActive: true,
    order: 4,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ibu Sarah',
    role: 'Orang tua murid Pre School',
    content: 'Alhamdulillah, anak saya sangat senang belajar di Rumah Belajar Jannati. Guru-gurunya sabar dan metode pembelajarannya mudah dipahami anak.',
    rating: 5,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Bapak Ahmad',
    role: 'Orang tua murid TPA',
    content: 'Program TPA di sini sangat bagus. Anak saya jadi lebih lancar mengaji dan akhlaknya juga semakin baik.',
    rating: 5,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Ibu Khadijah',
    role: 'Peserta Tahsin Ummahat',
    content: 'Subhanallah, setelah mengikuti program Tahsin Ummahat, bacaan Quran saya jadi lebih baik dan benar sesuai kaidah tajwid.',
    rating: 5,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const contactInfo: ContactInfo = {
  phone: '+62 812 8171 1875',
  instagram: 'rumahbelajarjannati',
  address: {
    street: 'Jl. Amaliyah No. 62 A RT 3 RW 01',
    district: 'Srengseng Sawah',
    city: 'Jagakarsa',
    province: 'Jakarta Selatan'
  }
}

export const mockHeros: Hero[] = [
  {
    id: '1',
    title: 'Rumah Belajar Jannati',
    subtitle: 'Based on Al Quran and Sunnah',
    description: 'Pusat pembelajaran Islam terpadu yang menghadirkan pendidikan berkualitas dengan landasan Al-Quran dan Sunnah untuk membentuk generasi Qurani.',
    isActive: true,
    order: 1,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export const mockBenefits: Benefit[] = [
  {
    id: '1',
    title: 'Belajar sesuai dengan Al Quran dan Sunnah',
    description: 'Semua pembelajaran didasarkan pada ajaran Al-Quran dan Sunnah Rasulullah SAW',
    icon: 'book-open',
    isActive: true,
    order: 1,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Tempat Belajar yang nyaman',
    description: 'Lingkungan belajar yang kondusif dan nyaman untuk perkembangan optimal',
    icon: 'home',
    isActive: true,
    order: 2,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Biaya yang terjangkau',
    description: 'Program SPP subsidi dan biaya terjangkau untuk semua kalangan',
    icon: 'currency-dollar',
    isActive: true,
    order: 3,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]
