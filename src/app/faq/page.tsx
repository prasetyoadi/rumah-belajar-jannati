'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { mockFAQs } from '@/lib/data'

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'registration' | 'programs' | 'payment'>('all')

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const filteredFAQs = selectedCategory === 'all' 
    ? mockFAQs 
    : mockFAQs.filter(faq => faq.category === selectedCategory)

  const categories = [
    { key: 'all' as const, label: 'Semua' },
    { key: 'general' as const, label: 'Umum' },
    { key: 'registration' as const, label: 'Pendaftaran' },
    { key: 'programs' as const, label: 'Program' },
    { key: 'payment' as const, label: 'Pembayaran' }
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Pertanyaan yang <span className="gradient-text">Sering Diajukan</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Temukan jawaban untuk pertanyaan-pertanyaan umum tentang program, pendaftaran, 
                dan layanan di Rumah Belajar Jannati.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openFAQ === faq.id ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            faq.category === 'general' ? 'bg-blue-100 text-blue-800' :
                            faq.category === 'registration' ? 'bg-green-100 text-green-800' :
                            faq.category === 'programs' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {faq.category === 'general' ? 'Umum' :
                             faq.category === 'registration' ? 'Pendaftaran' :
                             faq.category === 'programs' ? 'Program' : 'Pembayaran'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Tidak ada FAQ yang ditemukan untuk kategori ini.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Additional FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Quick Facts */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Informasi <span className="gradient-text">Penting</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Program Trial</h3>
                    <p className="text-gray-600">
                      Kami menyediakan program trial gratis selama 3 hari untuk semua program, 
                      sehingga orang tua dan anak dapat merasakan langsung metode pembelajaran kami.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 Sistem Pembayaran</h3>
                    <p className="text-gray-600">
                      Tersedia sistem SPP subsidi untuk meringankan beban orang tua, 
                      dengan pilihan mulai dari Rp. 50.000 hingga Rp. 100.000 per bulan.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">⏰ Jam Operasional</h3>
                    <p className="text-gray-600">
                      Senin-Jumat: 08:00-17:00<br />
                      Sabtu: 08:00-15:00<br />
                      Minggu: 09:00-12:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact for More Questions */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Masih Ada <span className="gradient-text">Pertanyaan</span>?
                </h2>
                
                <p className="text-lg text-gray-600">
                  Jika pertanyaan Anda belum terjawab, jangan ragu untuk menghubungi kami. 
                  Tim kami siap membantu Anda dengan informasi yang lebih detail.
                </p>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/6281281711875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 bg-green-50 p-4 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.786"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                      <p className="text-sm text-gray-600">+62 812 8171 1875</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/rumahbelajarjannati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 bg-pink-50 p-4 rounded-xl hover:bg-pink-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Instagram</h3>
                      <p className="text-sm text-gray-600">@rumahbelajarjannati</p>
                    </div>
                  </a>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Alamat</h3>
                        <p className="text-sm text-gray-600">
                          Jl. Amaliyah No. 62 A RT 3 RW 01<br />
                          Srengseng Sawah, Jagakarsa<br />
                          Jakarta Selatan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips Memilih Program</h3>
                  <p className="text-gray-600 mb-4">
                    Tidak yakin program mana yang cocok untuk anak Anda? Konsultasikan dengan tim kami 
                    untuk mendapatkan rekomendasi program yang sesuai dengan usia dan kebutuhan anak.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Konsultasi Gratis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
