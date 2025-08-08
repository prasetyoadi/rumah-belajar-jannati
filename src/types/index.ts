export interface Program {
  id: string
  name: string
  description: string
  type: 'preschool' | 'tpa' | 'course'
  ageGroup: string
  duration: string
  schedule: string[]
  price: {
    registration: number
    book: number
    monthly: number
    spp: {
      subsidy: number[]
      private: number
    }
  }
  curriculum: string[]
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Instructor {
  id: string
  name: string
  specialization: string
  qualifications: string[]
  experience: string
  image?: string
  bio: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'registration' | 'programs' | 'payment'
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactInfo {
  phone: string
  instagram: string
  address: {
    street: string
    district: string
    city: string
    province: string
  }
}

export interface Hero {
  id: string
  title: string
  subtitle: string
  description: string
  image?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface PortalData {
  portalName: string
  commitHash: string
  timestamp: string
  status: 'active' | 'inactive' | 'error'
}
