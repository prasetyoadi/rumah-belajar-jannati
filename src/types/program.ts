export interface ProgramPrice {
  registration: number
  book: number
  monthly: number
  spp: {
    subsidy: number[]
    private: number
  }
}

export interface Program {
  id: string
  name: string
  title: string
  description: string
  imageUrl?: string
  price: ProgramPrice
  duration: string
  capacity: number
  minAge?: number
  maxAge?: number
  schedule?: string | string[]
  curriculum?: string[]
  ageGroup?: string
  type: string // programType
  programType: string
  isActive: boolean
  category: 'PRESCHOOL' | 'TPA' | 'TAHSIN' | 'ARABIC_COURSE' | 'QURAN_MEMORIZATION'
  instructorId?: string
  instructor?: any
  createdAt: string
  updatedAt: string
  enrollments?: any[]
  _count?: {
    enrollments: number
  }
}
