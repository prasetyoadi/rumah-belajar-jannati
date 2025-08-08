'use client'

import React, { useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useAdminStore } from '@/store/useAdminStore'

export default function TestimonialsSection() {
  const { testimonials, fetchTestimonials } = useAdminStore()

  useEffect(() => {
    if (testimonials.length === 0) {
      fetchTestimonials()
    }
  }, [testimonials.length, fetchTestimonials])

  const activeTestimonials = testimonials.filter(testimonial => testimonial.isActive)

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Apa Kata <span className="gradient-text">Orang Tua</span> Tentang Kami?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Kepercayaan dan kepuasan orang tua adalah motivasi terbesar kami untuk terus memberikan yang terbaik.
          </p>
        </div>

        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activeTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-900">
                  <p className="text-sm leading-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>

                {/* Decorative Quote */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 rounded-2xl bg-primary-50 p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">98%</div>
              <div className="mt-2 text-sm text-gray-600">Tingkat Kepuasan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">150+</div>
              <div className="mt-2 text-sm text-gray-600">Orang Tua Percaya</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">5</div>
              <div className="mt-2 text-sm text-gray-600">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">100+</div>
              <div className="mt-2 text-sm text-gray-600">Lulusan Hafidz</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-4">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span>Bergabunglah dengan keluarga besar Rumah Belajar Jannati</span>
          </div>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
            >
              Konsultasi Gratis
            </a>
            <a
              href="/programs"
              className="inline-flex items-center justify-center rounded-md border border-primary-600 px-6 py-3 text-base font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Lihat Program
            </a>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <blockquote className="arabic-text text-2xl text-primary-600 mb-4">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </blockquote>
            <p className="text-sm text-gray-600 italic">
              &ldquo;Dan katakanlah: Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan.&rdquo; (QS. Taha: 114)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
