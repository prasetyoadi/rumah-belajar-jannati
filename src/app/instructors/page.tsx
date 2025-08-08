import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AcademicCapIcon, StarIcon } from '@heroicons/react/24/outline'
import { mockInstructors } from '@/lib/data'

export default function InstructorsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Tim <span className="gradient-text">Instruktur</span> Kami
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Bertemu dengan para ustadz dan ustadzah berpengalaman yang akan membimbing 
                perjalanan pembelajaran Islam anak-anak Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {mockInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Profile Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {instructor.name.split(' ').map(n => n.charAt(0)).join('')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {instructor.name}
                      </h3>
                      <p className="text-primary-600 font-semibold">
                        {instructor.specialization}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {instructor.bio}
                    </p>

                    {/* Experience */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span>{instructor.experience} pengalaman</span>
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                        <AcademicCapIcon className="h-4 w-4 mr-2 text-primary-500" />
                        Kualifikasi:
                      </h4>
                      <div className="space-y-1">
                        {instructor.qualifications.map((qualification, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0"></div>
                            <span>{qualification}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Bergabung dengan <span className="gradient-text">Tim Kami</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Kami selalu mencari ustadz dan ustadzah berkualitas yang memiliki 
                passion dalam pendidikan Islam untuk bergabung dengan tim kami.
              </p>
              
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Kualifikasi Minimal
                  </h3>
                  <ul className="text-left space-y-2 text-sm text-gray-600">
                    <li>• Lulusan S1 bidang terkait</li>
                    <li>• Hafal minimal 5 juz Al-Quran</li>
                    <li>• Pengalaman mengajar</li>
                    <li>• Komunikasi yang baik</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Yang Kami Tawarkan
                  </h3>
                  <ul className="text-left space-y-2 text-sm text-gray-600">
                    <li>• Gaji kompetitif</li>
                    <li>• Lingkungan kerja Islami</li>
                    <li>• Pengembangan karir</li>
                    <li>• Training berkelanjutan</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Hubungi Kami
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Kirimkan CV dan surat lamaran Anda
                  </p>
                  <a
                    href="https://wa.me/6281281711875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Kirim CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-primary-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Nilai-Nilai Tim Kami
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🤲</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Ikhlas</h3>
                  <p className="text-primary-100 text-sm">Mengajar dengan keikhlasan hati</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Ilmu</h3>
                  <p className="text-primary-100 text-sm">Terus menuntut dan mengamalkan ilmu</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Kasih Sayang</h3>
                  <p className="text-primary-100 text-sm">Mendidik dengan penuh kasih sayang</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Keteladanan</h3>
                  <p className="text-primary-100 text-sm">Menjadi teladan dalam akhlak</p>
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
