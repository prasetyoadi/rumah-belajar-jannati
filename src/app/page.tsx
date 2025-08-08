import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ProgramsSection from '@/components/ProgramsSection'
import BenefitsSection from '@/components/BenefitsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <HeroSection />
        <BenefitsSection />
        <ProgramsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
