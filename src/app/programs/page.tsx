import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ClockIcon, UsersIcon, CurrencyDollarIcon, CheckIcon } from '@heroicons/react/24/outline'
import { mockPrograms } from '@/lib/data'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Program <span className="gradient-text">Pembelajaran</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Temukan program pembelajaran Islam yang sesuai dengan kebutuhan dan usia Anda atau buah hati.
                Semua program dirancang berdasarkan Al-Quran dan Sunnah.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {mockPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Program Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        program.type === 'preschool' 
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10'
                          : program.type === 'tpa'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-700/10'
                          : 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10'
                      }`}>
                        {program.type === 'preschool' ? 'Pre School' : program.type === 'tpa' ? 'TPA' : 'Kursus'}
                      </span>
                      {program.price.spp.subsidy.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          SPP Subsidi
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {program.description}
                    </p>
                  </div>

                  {/* Program Details */}
                  <div className="p-6 space-y-4 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="h-5 w-5 mr-3 text-primary-500" />
                        <span>Usia: {program.ageGroup}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-5 w-5 mr-3 text-primary-500" />
                        <span>Durasi: {program.duration}</span>
                      </div>
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="h-5 w-5 mr-3 mt-0.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span>Jadwal:</span>
                          <div className="mt-1">
                            {program.schedule.map((schedule, index) => (
                              <div key={index} className="text-gray-500 text-xs">
                                {schedule}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Pendaftaran:</span>
                          <span className="font-semibold">{formatPrice(program.price.registration)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Buku:</span>
                          <span className="font-semibold">{formatPrice(program.price.book)}</span>
                        </div>
                        {program.price.monthly > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">SPP/bulan:</span>
                            <span className="font-semibold">{formatPrice(program.price.monthly)}</span>
                          </div>
                        )}
                        {program.price.spp.subsidy.length > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">SPP Subsidi:</span>
                            <span className="font-semibold text-green-600">
                              {formatPrice(program.price.spp.subsidy[0])} - {formatPrice(program.price.spp.subsidy[program.price.spp.subsidy.length - 1])}
                            </span>
                          </div>
                        )}
                        {program.price.spp.private > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">SPP Private:</span>
                            <span className="font-semibold">{formatPrice(program.price.spp.private)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Curriculum */}
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Kurikulum:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {program.curriculum.map((item, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <CheckIcon className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/programs/${program.id}` as any}
                      className="block w-full text-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
                    >
                      Lihat Detail & Daftar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-primary-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Butuh Konsultasi?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Tim kami siap membantu Anda memilih program yang paling sesuai dengan kebutuhan dan usia anak.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/contact"
                  className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="/faq"
                  className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Lihat FAQ <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
