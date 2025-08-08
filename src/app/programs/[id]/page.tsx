import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  ClockIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  CheckIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { mockPrograms } from '@/lib/data'

interface ProgramDetailPageProps {
  params: {
    id: string
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const program = mockPrograms.find(p => p.id === params.id)

  if (!program) {
    notFound()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preschool':
        return 'bg-blue-50 text-blue-700 ring-blue-700/10'
      case 'tpa':
        return 'bg-green-50 text-green-700 ring-green-700/10'
      case 'tahsin':
        return 'bg-purple-50 text-purple-700 ring-purple-700/10'
      case 'arabic':
        return 'bg-orange-50 text-orange-700 ring-orange-700/10'
      case 'tahfidz':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-700/10'
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-700/10'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'preschool':
        return 'Pre School'
      case 'tpa':
        return 'TPA'
      case 'tahsin':
        return 'Tahsin'
      case 'arabic':
        return 'Bahasa Arab'
      case 'tahfidz':
        return 'Tahfidz'
      default:
        return type
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                href="/programs"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Kembali ke Program
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Program Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${getTypeColor(program.type)}`}>
                    {getTypeLabel(program.type)}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{program.ageGroup}</span>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                  {program.name}
                </h1>
                
                <p className="text-lg leading-8 text-gray-600 mb-8">
                  {program.description}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <ClockIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durasi</p>
                      <p className="font-semibold text-gray-900">{program.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <UsersIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Usia</p>
                      <p className="font-semibold text-gray-900">{program.ageGroup}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/programs/${program.id}/register`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200"
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    Daftar Sekarang
                  </Link>
                  
                  <a
                    href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan program ${program.name}. Bisakah saya mendapatkan informasi lebih lanjut?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>

              {/* Program Image */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                  <BookOpenIcon className="h-24 w-24 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Schedule */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    📅 Jadwal Pembelajaran
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    {Array.isArray(program.schedule) ? (
                      program.schedule.map((schedule, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2 last:mb-0">
                          <CalendarDaysIcon className="h-5 w-5 text-primary-600" />
                          <span className="text-gray-700">{schedule}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3">
                        <CalendarDaysIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-gray-700">{program.schedule}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Curriculum */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    📚 Kurikulum Pembelajaran
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {program.curriculum.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    ✨ Keunggulan Program
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <AcademicCapIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Pengajar Kompeten</h3>
                        <p className="text-gray-600">Instruktur berpengalaman dan bersertifikat dalam bidang pendidikan Islam</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                      <BookOpenIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Metode Pembelajaran Modern</h3>
                        <p className="text-gray-600">Kombinasi metode tradisional dan teknologi untuk pembelajaran yang efektif</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                      <UsersIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Kelas Kecil</h3>
                        <p className="text-gray-600">Perhatian personal dengan rasio murid dan guru yang ideal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Pricing Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">💰 Biaya Program</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Pendaftaran</span>
                      <span className="font-semibold text-gray-900">{formatPrice(program.price.registration)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Buku & Materi</span>
                      <span className="font-semibold text-gray-900">{formatPrice(program.price.book)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">SPP Bulanan</span>
                      <span className="font-semibold text-gray-900">{formatPrice(program.price.monthly)}</span>
                    </div>
                  </div>

                  {program.price.spp.subsidy.length > 0 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">🎯 Program Subsidi</h4>
                      <p className="text-sm text-green-700 mb-2">SPP dengan subsidi tersedia:</p>
                      <div className="flex flex-wrap gap-2">
                        {program.price.spp.subsidy.map((subsidyPrice, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {formatPrice(subsidyPrice)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      href={`/programs/${program.id}/register`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200"
                    >
                      <UserPlusIcon className="h-5 w-5" />
                      Daftar Program Ini
                    </Link>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📞 Butuh Info Lebih?</h3>
                  <p className="text-gray-600 mb-4">
                    Hubungi kami untuk konsultasi gratis mengenai program yang sesuai untuk buah hati Anda.
                  </p>
                  
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        💬
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                        <p className="text-xs text-gray-500">0812-3456-7890</p>
                      </div>
                    </a>
                    
                    <a
                      href="tel:+6281234567890"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Telepon</p>
                        <p className="text-xs text-gray-500">0812-3456-7890</p>
                      </div>
                    </a>
                  </div>
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
