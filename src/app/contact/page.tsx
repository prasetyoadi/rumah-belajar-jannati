import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Hubungi <span className="gradient-text">Kami</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Kami siap membantu Anda dengan informasi lengkap tentang program pembelajaran 
                dan proses pendaftaran di Rumah Belajar Jannati.
              </p>
            </div>
          </div>
        </section>

        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
