import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Define types based on Prisma schema
export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT' | 'VISITOR'
  createdAt: string
  updatedAt: string
}

export interface Student {
  id: string
  userId: string
  user?: User
  name: string
  birthDate?: string
  address?: string
  phone?: string
  parentName?: string
  parentPhone?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  enrollments?: Enrollment[]
  _count?: {
    enrollments: number
  }
}

export interface Instructor {
  id: string
  userId?: string
  user?: User
  name: string
  email?: string
  phone?: string
  specialization?: string
  bio?: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  programs?: Program[]
  _count?: {
    programs: number
  }
}

export interface Program {
  id: string
  title: string
  description: string
  imageUrl?: string
  price: number
  duration: string
  capacity: number
  minAge?: number
  maxAge?: number
  schedule?: string
  isActive: boolean
  category: 'PRESCHOOL' | 'TPA' | 'TAHSIN' | 'ARABIC_COURSE' | 'QURAN_MEMORIZATION'
  instructorId?: string
  instructor?: Instructor
  createdAt: string
  updatedAt: string
  enrollments?: Enrollment[]
  _count?: {
    enrollments: number
  }
}

export interface Enrollment {
  id: string
  studentId: string
  student?: Student
  programId: string
  program?: Program
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  enrolledAt: string
  startDate?: string
  endDate?: string
  notes?: string
  payments?: Payment[]
}

export interface Payment {
  id: string
  studentId: string
  student?: Student
  enrollmentId?: string
  enrollment?: Enrollment
  amount: number
  method: 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'E_WALLET'
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  reference?: string
  notes?: string
  paidAt?: string
  confirmedAt?: string
  confirmedBy?: string
  createdAt: string
  updatedAt: string
}

export interface Gallery {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  isActive: boolean
  order: number
  tags: string[]
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

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Hero {
  id: string
  title: string
  subtitle?: string
  description: string
  imageUrl?: string
  buttonText?: string
  buttonUrl?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  content: string
  rating?: number
  imageUrl?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface DataState {
  // Data
  programs: Program[]
  instructors: Instructor[]
  students: Student[]
  enrollments: Enrollment[]
  payments: Payment[]
  gallery: Gallery[]
  benefits: Benefit[]
  faqs: FAQ[]
  heroes: Hero[]
  testimonials: Testimonial[]
  
  // Loading states
  isLoading: {
    programs: boolean
    instructors: boolean
    students: boolean
    enrollments: boolean
    payments: boolean
    gallery: boolean
    benefits: boolean
    faqs: boolean
    heroes: boolean
    testimonials: boolean
  }
  
  // Actions to update data from React Query
  setPrograms: (programs: Program[]) => void
  setInstructors: (instructors: Instructor[]) => void
  setStudents: (students: Student[]) => void
  setEnrollments: (enrollments: Enrollment[]) => void
  setPayments: (payments: Payment[]) => void
  setGallery: (gallery: Gallery[]) => void
  setBenefits: (benefits: Benefit[]) => void
  setFaqs: (faqs: FAQ[]) => void
  setHeroes: (heroes: Hero[]) => void
  setTestimonials: (testimonials: Testimonial[]) => void
  
  // Loading state actions
  setLoading: (key: keyof DataState['isLoading'], loading: boolean) => void
  
  // Individual item updates
  addProgram: (program: Program) => void
  updateProgram: (id: string, program: Partial<Program>) => void
  removeProgram: (id: string) => void
  
  addInstructor: (instructor: Instructor) => void
  updateInstructor: (id: string, instructor: Partial<Instructor>) => void
  removeInstructor: (id: string) => void
  
  addStudent: (student: Student) => void
  updateStudent: (id: string, student: Partial<Student>) => void
  removeStudent: (id: string) => void
  
  addEnrollment: (enrollment: Enrollment) => void
  updateEnrollment: (id: string, enrollment: Partial<Enrollment>) => void
  removeEnrollment: (id: string) => void
  
  addPayment: (payment: Payment) => void
  updatePayment: (id: string, payment: Partial<Payment>) => void
  removePayment: (id: string) => void
  
  addGalleryItem: (gallery: Gallery) => void
  updateGalleryItem: (id: string, gallery: Partial<Gallery>) => void
  removeGalleryItem: (id: string) => void
  
  addBenefit: (benefit: Benefit) => void
  updateBenefit: (id: string, benefit: Partial<Benefit>) => void
  removeBenefit: (id: string) => void
  
  addFaq: (faq: FAQ) => void
  updateFaq: (id: string, faq: Partial<FAQ>) => void
  removeFaq: (id: string) => void
  
  addHero: (hero: Hero) => void
  updateHero: (id: string, hero: Partial<Hero>) => void
  removeHero: (id: string) => void
  
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  removeTestimonial: (id: string) => void
}

export const useDataStore = create<DataState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        programs: [],
        instructors: [],
        students: [],
        enrollments: [],
        payments: [],
        gallery: [],
        benefits: [],
        faqs: [],
        heroes: [],
        testimonials: [],
        
        isLoading: {
          programs: false,
          instructors: false,
          students: false,
          enrollments: false,
          payments: false,
          gallery: false,
          benefits: false,
          faqs: false,
          heroes: false,
          testimonials: false,
        },
        
        // Set data actions
        setPrograms: (programs) => set({ programs }),
        setInstructors: (instructors) => set({ instructors }),
        setStudents: (students) => set({ students }),
        setEnrollments: (enrollments) => set({ enrollments }),
        setPayments: (payments) => set({ payments }),
        setGallery: (gallery) => set({ gallery }),
        setBenefits: (benefits) => set({ benefits }),
        setFaqs: (faqs) => set({ faqs }),
        setHeroes: (heroes) => set({ heroes }),
        setTestimonials: (testimonials) => set({ testimonials }),
        
        // Loading state actions
        setLoading: (key, loading) => 
          set((state) => ({
            isLoading: { ...state.isLoading, [key]: loading }
          })),
        
        // Programs
        addProgram: (program) => 
          set((state) => ({ programs: [...state.programs, program] })),
        updateProgram: (id, updatedProgram) => 
          set((state) => ({
            programs: state.programs.map((p) => 
              p.id === id ? { ...p, ...updatedProgram } : p
            )
          })),
        removeProgram: (id) => 
          set((state) => ({
            programs: state.programs.filter((p) => p.id !== id)
          })),
        
        // Instructors
        addInstructor: (instructor) => 
          set((state) => ({ instructors: [...state.instructors, instructor] })),
        updateInstructor: (id, updatedInstructor) => 
          set((state) => ({
            instructors: state.instructors.map((i) => 
              i.id === id ? { ...i, ...updatedInstructor } : i
            )
          })),
        removeInstructor: (id) => 
          set((state) => ({
            instructors: state.instructors.filter((i) => i.id !== id)
          })),
        
        // Students
        addStudent: (student) => 
          set((state) => ({ students: [...state.students, student] })),
        updateStudent: (id, updatedStudent) => 
          set((state) => ({
            students: state.students.map((s) => 
              s.id === id ? { ...s, ...updatedStudent } : s
            )
          })),
        removeStudent: (id) => 
          set((state) => ({
            students: state.students.filter((s) => s.id !== id)
          })),
        
        // Enrollments
        addEnrollment: (enrollment) => 
          set((state) => ({ enrollments: [...state.enrollments, enrollment] })),
        updateEnrollment: (id, updatedEnrollment) => 
          set((state) => ({
            enrollments: state.enrollments.map((e) => 
              e.id === id ? { ...e, ...updatedEnrollment } : e
            )
          })),
        removeEnrollment: (id) => 
          set((state) => ({
            enrollments: state.enrollments.filter((e) => e.id !== id)
          })),
        
        // Payments
        addPayment: (payment) => 
          set((state) => ({ payments: [...state.payments, payment] })),
        updatePayment: (id, updatedPayment) => 
          set((state) => ({
            payments: state.payments.map((p) => 
              p.id === id ? { ...p, ...updatedPayment } : p
            )
          })),
        removePayment: (id) => 
          set((state) => ({
            payments: state.payments.filter((p) => p.id !== id)
          })),
        
        // Gallery
        addGalleryItem: (gallery) => 
          set((state) => ({ gallery: [...state.gallery, gallery] })),
        updateGalleryItem: (id, updatedGallery) => 
          set((state) => ({
            gallery: state.gallery.map((g) => 
              g.id === id ? { ...g, ...updatedGallery } : g
            )
          })),
        removeGalleryItem: (id) => 
          set((state) => ({
            gallery: state.gallery.filter((g) => g.id !== id)
          })),
        
        // Benefits
        addBenefit: (benefit) => 
          set((state) => ({ benefits: [...state.benefits, benefit] })),
        updateBenefit: (id, updatedBenefit) => 
          set((state) => ({
            benefits: state.benefits.map((b) => 
              b.id === id ? { ...b, ...updatedBenefit } : b
            )
          })),
        removeBenefit: (id) => 
          set((state) => ({
            benefits: state.benefits.filter((b) => b.id !== id)
          })),
        
        // FAQs
        addFaq: (faq) => 
          set((state) => ({ faqs: [...state.faqs, faq] })),
        updateFaq: (id, updatedFaq) => 
          set((state) => ({
            faqs: state.faqs.map((f) => 
              f.id === id ? { ...f, ...updatedFaq } : f
            )
          })),
        removeFaq: (id) => 
          set((state) => ({
            faqs: state.faqs.filter((f) => f.id !== id)
          })),
        
        // Heroes
        addHero: (hero) => 
          set((state) => ({ heroes: [...state.heroes, hero] })),
        updateHero: (id, updatedHero) => 
          set((state) => ({
            heroes: state.heroes.map((h) => 
              h.id === id ? { ...h, ...updatedHero } : h
            )
          })),
        removeHero: (id) => 
          set((state) => ({
            heroes: state.heroes.filter((h) => h.id !== id)
          })),
        
        // Testimonials
        addTestimonial: (testimonial) => 
          set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
        updateTestimonial: (id, updatedTestimonial) => 
          set((state) => ({
            testimonials: state.testimonials.map((t) => 
              t.id === id ? { ...t, ...updatedTestimonial } : t
            )
          })),
        removeTestimonial: (id) => 
          set((state) => ({
            testimonials: state.testimonials.filter((t) => t.id !== id)
          })),
      }),
      {
        name: 'data-store',
        partialize: (state) => ({
          programs: state.programs,
          instructors: state.instructors,
          students: state.students,
          enrollments: state.enrollments,
          payments: state.payments,
          gallery: state.gallery,
          benefits: state.benefits,
          faqs: state.faqs,
          heroes: state.heroes,
          testimonials: state.testimonials,
        }),
      }
    )
  )
)
