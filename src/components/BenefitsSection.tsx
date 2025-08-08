'use client'

import React, { useEffect } from 'react'
import { CheckIcon, HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useAdminStore } from '@/store/useAdminStore'

const iconMap = {
  'book-open': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253" />
    </svg>
  ),
  'home': <HomeIcon className="w-8 h-8" />,
  'currency-dollar': <CurrencyDollarIcon className="w-8 h-8" />,
  'heart': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  'academic-cap': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  'star': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
}

export default function BenefitsSection() {
  const { benefits, fetchBenefits } = useAdminStore()

  useEffect(() => {
    if (benefits.length === 0) {
      fetchBenefits()
    }
  }, [benefits.length, fetchBenefits])

  const activeBenefits = benefits.filter(benefit => benefit.isActive).sort((a, b) => a.order - b.order)

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mengapa Memilih <span className="gradient-text">Rumah Belajar Jannati</span>?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Kami berkomitmen memberikan pendidikan Islam terbaik dengan berbagai keunggulan yang mendukung perkembangan optimal anak-anak.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activeBenefits.map((benefit) => (
              <div key={benefit.id} className="relative group">
                <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    {iconMap[benefit.icon as keyof typeof iconMap]}
                  </div>
                  
                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Check mark */}
                  <div className="mt-6 flex items-center text-primary-600">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Terbukti Berkualitas</span>
                  </div>
                </div>

                {/* Decorative gradient background */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 rounded-2xl bg-primary-50 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Keunggulan Tambahan
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Guru berpengalaman dan tersertifikasi</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Kurikulum terstruktur dan terintegrasi</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Fasilitas belajar yang lengkap dan nyaman</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Program trial gratis 3 hari</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Laporan perkembangan berkala</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-block p-8 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Berdasarkan</div>
                <div className="text-lg font-semibold text-gray-900">Al-Quran & Sunnah</div>
                <div className="mt-4 text-sm text-gray-500">
                  Semua materi pembelajaran mengacu pada ajaran Islam yang shahih
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
