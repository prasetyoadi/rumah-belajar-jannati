import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Program, Instructor, FAQ, Testimonial, Hero, Benefit, Gallery } from '@/types'

interface AdminState {
  // Programs state
  programs: Program[]
  isLoadingPrograms: boolean
  
  // Instructors state
  instructors: Instructor[]
  isLoadingInstructors: boolean
  
  // FAQ state
  faqs: FAQ[]
  isLoadingFaqs: boolean
  
  // Testimonials state
  testimonials: Testimonial[]
  isLoadingTestimonials: boolean
  
  // Heroes state
  heroes: Hero[]
  isLoadingHeroes: boolean
  
  // Benefits state
  benefits: Benefit[]
  isLoadingBenefits: boolean
  
  // Gallery state
  gallery: Gallery[]
  isLoadingGallery: boolean
  
  // General loading state
  isLoading: boolean
  error: string | null
  
  // Actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Program actions
  setPrograms: (programs: Program[]) => void
  addProgram: (program: Program) => void
  updateProgram: (id: string, program: Partial<Program>) => void
  deleteProgram: (id: string) => void
  fetchPrograms: () => Promise<void>
  
  // Instructor actions
  setInstructors: (instructors: Instructor[]) => void
  addInstructor: (instructor: Instructor) => void
  updateInstructor: (id: string, instructor: Partial<Instructor>) => void
  deleteInstructor: (id: string) => void
  fetchInstructors: () => Promise<void>
  
  // FAQ actions
  setFaqs: (faqs: FAQ[]) => void
  addFaq: (faq: FAQ) => void
  updateFaq: (id: string, faq: Partial<FAQ>) => void
  deleteFaq: (id: string) => void
  fetchFaqs: () => Promise<void>
  
  // Testimonial actions
  setTestimonials: (testimonials: Testimonial[]) => void
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void
  fetchTestimonials: () => Promise<void>
  
  // Hero actions
  setHeroes: (heroes: Hero[]) => void
  addHero: (hero: Hero) => void
  updateHero: (id: string, hero: Partial<Hero>) => void
  deleteHero: (id: string) => void
  fetchHeroes: () => Promise<void>
  
  // Benefit actions
  setBenefits: (benefits: Benefit[]) => void
  addBenefit: (benefit: Benefit) => void
  updateBenefit: (id: string, benefit: Partial<Benefit>) => void
  deleteBenefit: (id: string) => void
  fetchBenefits: () => Promise<void>
  
  // Gallery actions
  setGallery: (gallery: Gallery[]) => void
  addGalleryItem: (galleryItem: Gallery) => void
  updateGalleryItem: (id: string, galleryItem: Partial<Gallery>) => void
  deleteGalleryItem: (id: string) => void
  fetchGallery: () => Promise<void>
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        programs: [],
        isLoadingPrograms: false,
        instructors: [],
        isLoadingInstructors: false,
        faqs: [],
        isLoadingFaqs: false,
        testimonials: [],
        isLoadingTestimonials: false,
        heroes: [],
        isLoadingHeroes: false,
        benefits: [],
        isLoadingBenefits: false,
        gallery: [],
        isLoadingGallery: false,
        isLoading: false,
        error: null,
        
        // General actions
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        
        // Program actions
        setPrograms: (programs) => set({ programs }),
        addProgram: (program) => set((state) => ({ 
          programs: [...state.programs, program] 
        })),
        updateProgram: (id, updatedProgram) => set((state) => ({
          programs: state.programs.map((program) =>
            program.id === id ? { ...program, ...updatedProgram } : program
          )
        })),
        deleteProgram: (id) => set((state) => ({
          programs: state.programs.filter((program) => program.id !== id)
        })),
        fetchPrograms: async () => {
          set({ isLoadingPrograms: true, error: null })
          try {
            const response = await fetch('/api/programs')
            if (!response.ok) throw new Error('Failed to fetch programs')
            const programs = await response.json()
            set({ programs, isLoadingPrograms: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingPrograms: false })
          }
        },
        
        // Instructor actions
        setInstructors: (instructors) => set({ instructors }),
        addInstructor: (instructor) => set((state) => ({ 
          instructors: [...state.instructors, instructor] 
        })),
        updateInstructor: (id, updatedInstructor) => set((state) => ({
          instructors: state.instructors.map((instructor) =>
            instructor.id === id ? { ...instructor, ...updatedInstructor } : instructor
          )
        })),
        deleteInstructor: (id) => set((state) => ({
          instructors: state.instructors.filter((instructor) => instructor.id !== id)
        })),
        fetchInstructors: async () => {
          set({ isLoadingInstructors: true, error: null })
          try {
            const response = await fetch('/api/instructors')
            if (!response.ok) throw new Error('Failed to fetch instructors')
            const instructors = await response.json()
            set({ instructors, isLoadingInstructors: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingInstructors: false })
          }
        },
        
        // FAQ actions
        setFaqs: (faqs) => set({ faqs }),
        addFaq: (faq) => set((state) => ({ 
          faqs: [...state.faqs, faq] 
        })),
        updateFaq: (id, updatedFaq) => set((state) => ({
          faqs: state.faqs.map((faq) =>
            faq.id === id ? { ...faq, ...updatedFaq } : faq
          )
        })),
        deleteFaq: (id) => set((state) => ({
          faqs: state.faqs.filter((faq) => faq.id !== id)
        })),
        fetchFaqs: async () => {
          set({ isLoadingFaqs: true, error: null })
          try {
            const response = await fetch('/api/faqs')
            if (!response.ok) throw new Error('Failed to fetch FAQs')
            const faqs = await response.json()
            set({ faqs, isLoadingFaqs: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingFaqs: false })
          }
        },
        
        // Testimonial actions
        setTestimonials: (testimonials) => set({ testimonials }),
        addTestimonial: (testimonial) => set((state) => ({ 
          testimonials: [...state.testimonials, testimonial] 
        })),
        updateTestimonial: (id, updatedTestimonial) => set((state) => ({
          testimonials: state.testimonials.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
          )
        })),
        deleteTestimonial: (id) => set((state) => ({
          testimonials: state.testimonials.filter((testimonial) => testimonial.id !== id)
        })),
        fetchTestimonials: async () => {
          set({ isLoadingTestimonials: true, error: null })
          try {
            const response = await fetch('/api/testimonials')
            if (!response.ok) throw new Error('Failed to fetch testimonials')
            const testimonials = await response.json()
            set({ testimonials, isLoadingTestimonials: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingTestimonials: false })
          }
        },
        
        // Hero actions
        setHeroes: (heroes) => set({ heroes }),
        addHero: (hero) => set((state) => ({ 
          heroes: [...state.heroes, hero] 
        })),
        updateHero: (id, updatedHero) => set((state) => ({
          heroes: state.heroes.map((hero) =>
            hero.id === id ? { ...hero, ...updatedHero } : hero
          )
        })),
        deleteHero: (id) => set((state) => ({
          heroes: state.heroes.filter((hero) => hero.id !== id)
        })),
        fetchHeroes: async () => {
          set({ isLoadingHeroes: true, error: null })
          try {
            const response = await fetch('/api/heroes')
            if (!response.ok) throw new Error('Failed to fetch heroes')
            const heroes = await response.json()
            set({ heroes, isLoadingHeroes: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingHeroes: false })
          }
        },
        
        // Benefit actions
        setBenefits: (benefits) => set({ benefits }),
        addBenefit: (benefit) => set((state) => ({ 
          benefits: [...state.benefits, benefit] 
        })),
        updateBenefit: (id, updatedBenefit) => set((state) => ({
          benefits: state.benefits.map((benefit) =>
            benefit.id === id ? { ...benefit, ...updatedBenefit } : benefit
          )
        })),
        deleteBenefit: (id) => set((state) => ({
          benefits: state.benefits.filter((benefit) => benefit.id !== id)
        })),
        fetchBenefits: async () => {
          set({ isLoadingBenefits: true, error: null })
          try {
            const response = await fetch('/api/benefits')
            if (!response.ok) throw new Error('Failed to fetch benefits')
            const benefits = await response.json()
            set({ benefits, isLoadingBenefits: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingBenefits: false })
          }
        },
        
        // Gallery actions
        setGallery: (gallery: Gallery[]) => set({ gallery }),
        addGalleryItem: (galleryItem: Gallery) => set((state) => ({
          gallery: [...state.gallery, galleryItem]
        })),
        updateGalleryItem: (id: string, updatedGalleryItem: Partial<Gallery>) => set((state) => ({
          gallery: state.gallery.map((item) =>
            item.id === id ? { ...item, ...updatedGalleryItem } : item
          )
        })),
        deleteGalleryItem: (id: string) => set((state) => ({
          gallery: state.gallery.filter((item) => item.id !== id)
        })),
        fetchGallery: async () => {
          set({ isLoadingGallery: true, error: null })
          try {
            const response = await fetch('/api/gallery')
            if (!response.ok) throw new Error('Failed to fetch gallery')
            const gallery = await response.json()
            set({ gallery, isLoadingGallery: false })
          } catch (error) {
            set({ error: (error as Error).message, isLoadingGallery: false })
          }
        },
      }),
      {
        name: 'admin-storage',
        partialize: (state) => ({ 
          programs: state.programs,
          instructors: state.instructors,
          faqs: state.faqs,
          testimonials: state.testimonials,
          heroes: state.heroes,
          benefits: state.benefits,
          gallery: state.gallery,
        }),
      }
    ),
    {
      name: 'admin-store',
    }
  )
)
