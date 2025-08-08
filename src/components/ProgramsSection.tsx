'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { ClockIcon, UsersIcon, CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useAdminStore } from '@/store/useAdminStore'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProgramsSection() {
  const { programs, fetchPrograms } = useAdminStore()

  useEffect(() => {
    if (programs.length === 0) {
      fetchPrograms()
    }
  }, [programs.length, fetchPrograms])

  const featuredPrograms = programs.filter(program => program.isActive).slice(0, 6)

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Program <span className="gradient-text">Unggulan</span> Kami
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Berbagai program pembelajaran Islam yang dirancang sesuai dengan kebutuhan dan usia peserta didik.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {featuredPrograms.map((program) => (
            <article
              key={program.id}
              className="flex flex-col items-start justify-between bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="w-full">
                {/* Program Type Badge */}
                <div className="flex items-center gap-x-2 text-xs mb-4">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    program.type === 'preschool' 
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10'
                      : program.type === 'tpa'
                      ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-700/10'
                      : 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10'
                  }`}>
                    {program.type === 'preschool' ? 'Pre School' : program.type === 'tpa' ? 'TPA' : 'Kursus'}
                  </span>
                </div>

                {/* Program Title and Description */}
                <div className="group relative">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {program.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">
                    {program.description}
                  </p>
                </div>

                {/* Program Details */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <UsersIcon className="h-4 w-4 mr-2 text-primary-500" />
                    <span>Usia: {program.ageGroup}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-2 text-primary-500" />
                    <span>Durasi: {program.duration}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2 text-primary-500" />
                    <span>
                      {program.price.spp.subsidy.length > 0 
                        ? `SPP: ${formatPrice(program.price.spp.subsidy[0])} - ${formatPrice(program.price.spp.subsidy[program.price.spp.subsidy.length - 1])}`
                        : `SPP: ${formatPrice(program.price.spp.private)}`
                      }
                    </span>
                  </div>
                </div>

                {/* Curriculum Preview */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Kurikulum:</p>
                  <div className="flex flex-wrap gap-1">
                    {program.curriculum.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                      >
                        {item}
                      </span>
                    ))}
                    {program.curriculum.length > 3 && (
                      <span className="inline-flex items-center text-xs text-gray-500">
                        +{program.curriculum.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 w-full">
                <Link
                  href={`/programs/${program.id}` as any}
                  className="inline-flex items-center justify-center w-full gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
                >
                  Lihat Detail
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Programs */}
        <div className="mt-16 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-md border border-primary-600 px-6 py-3 text-base font-semibold text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            Lihat Semua Program
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        {/* Quick Info Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-500 text-white">
                  <span className="text-sm font-bold">8</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Program</p>
                <p className="text-lg font-semibold text-gray-900">Tersedia</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
                  <span className="text-sm font-bold">3</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Usia Dini</p>
                <p className="text-lg font-semibold text-gray-900">3-6 Tahun</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
                  <span className="text-sm font-bold">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">SPP Subsidi</p>
                <p className="text-lg font-semibold text-gray-900">Mulai 50K</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 text-white">
                  <span className="text-sm font-bold">📚</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Trial</p>
                <p className="text-lg font-semibold text-gray-900">3 Hari Gratis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
