import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { mockHeros } from '@/lib/data'

export default function HeroSection() {
  const hero = mockHeros[0]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <span className="gradient-text">{hero.title}</span>
              </h1>
              <p className="text-xl text-primary-600 font-semibold">
                {hero.subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-8">
                {hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition-all duration-200 hover:shadow-lg"
              >
                Lihat Program
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-600 px-6 py-3 text-base font-semibold text-primary-600 hover:bg-primary-50 transition-all duration-200"
              >
                <PhoneIcon className="h-5 w-5" />
                Hubungi Kami
              </Link>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary-600">8+</p>
                <p className="text-sm text-gray-600">Program Tersedia</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary-600">100+</p>
                <p className="text-sm text-gray-600">Siswa Aktif</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary-600">5+</p>
                <p className="text-sm text-gray-600">Tahun Pengalaman</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 p-8 shadow-2xl">
              <div className="h-full w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Pendidikan Berkualitas</h3>
                  <p className="text-white/80">Berdasarkan Al-Quran & Sunnah</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern)" />
        </svg>
      </div>
    </section>
  )
}
