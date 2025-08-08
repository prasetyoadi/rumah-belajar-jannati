import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckIcon, BookOpenIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Tentang <span className="gradient-text">Rumah Belajar Jannati</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Pusat pembelajaran Islam terpadu yang menghadirkan pendidikan berkualitas 
                dengan landasan Al-Quran dan Sunnah untuk membentuk generasi Qurani.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <StarIcon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Visi Kami</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi Qurani 
                  yang berakhlak mulia, cerdas, dan mandiri sesuai dengan ajaran Al-Quran dan Sunnah.
                </p>
                <div className="bg-primary-50 p-6 rounded-xl">
                  <blockquote className="arabic-text text-xl text-primary-600 mb-3">
                    وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
                  </blockquote>
                                <p className="text-sm text-gray-600 italic">
                &ldquo;Dan Aku tidak menciptakan jin dan manusia melainkan agar mereka beribadah kepada-Ku.&rdquo; (QS. Adz-Dzariyat: 56)
              </p>
                </div>
              </div>

              {/* Mission */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <BookOpenIcon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Menyelenggarakan pendidikan Islam yang berkualitas dan terjangkau untuk semua kalangan
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Mengembangkan kurikulum yang mengintegrasikan Al-Quran, Sunnah, dan ilmu pengetahuan modern
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Membentuk karakter anak yang berakhlak mulia dan bertakwa kepada Allah SWT
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Menciptakan lingkungan belajar yang kondusif dan menyenangkan
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Mengoptimalkan potensi setiap anak sesuai dengan bakat dan minatnya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nilai-Nilai <span className="gradient-text">Kami</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Nilai-nilai fundamental yang menjadi landasan dalam setiap aspek pendidikan di Rumah Belajar Jannati.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Value 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
                  <BookOpenIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Berdasarkan Al-Quran & Sunnah</h3>
                <p className="text-gray-600">
                  Semua kurikulum dan metode pembelajaran kami berlandaskan pada ajaran Al-Quran dan Sunnah Rasulullah SAW.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-6">
                  <HeartIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kasih Sayang & Kesabaran</h3>
                <p className="text-gray-600">
                  Mendidik dengan penuh kasih sayang dan kesabaran, menciptakan lingkungan yang nyaman untuk belajar.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-6">
                  <StarIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kualitas & Keunggulan</h3>
                <p className="text-gray-600">
                  Berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan standar keunggulan yang konsisten.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-6">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kekeluargaan</h3>
                <p className="text-gray-600">
                  Membangun hubungan yang erat antara guru, siswa, dan orang tua dalam suasana kekeluargaan yang harmonis.
                </p>
              </div>

              {/* Value 5 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-6">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Integritas & Amanah</h3>
                <p className="text-gray-600">
                  Menjaga kepercayaan yang diberikan dengan penuh tanggung jawab dan integritas dalam setiap aspek.
                </p>
              </div>

              {/* Value 6 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Inovasi & Kreativitas</h3>
                <p className="text-gray-600">
                  Mengembangkan metode pembelajaran yang inovatif dan kreatif untuk mencapai hasil yang optimal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History & Journey */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Perjalanan <span className="gradient-text">Kami</span>
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2019 - Awal Perjalanan</h3>
                    <p className="text-gray-600">
                      Rumah Belajar Jannati didirikan dengan visi mulia untuk memberikan pendidikan Islam 
                      yang berkualitas dan terjangkau bagi masyarakat.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2020 - Pengembangan Program</h3>
                    <p className="text-gray-600">
                      Mengembangkan berbagai program pembelajaran mulai dari Quranic Pre School, TPA, 
                      hingga berbagai kursus untuk segala usia.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2021 - Adaptasi Digital</h3>
                    <p className="text-gray-600">
                      Menghadapi tantangan pandemi dengan mengintegrasikan teknologi digital 
                      dalam proses pembelajaran tanpa mengurangi kualitas.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2024 - Pertumbuhan Berkelanjutan</h3>
                    <p className="text-gray-600">
                      Terus berkembang dengan lebih dari 100 siswa aktif dan komitmen untuk 
                      memberikan pendidikan Islam terbaik.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-primary-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Pencapaian Kami</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">150+</div>
                      <div className="text-sm text-gray-600">Total Siswa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">8</div>
                      <div className="text-sm text-gray-600">Program Aktif</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">10+</div>
                      <div className="text-sm text-gray-600">Guru Berkualitas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">5+</div>
                      <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lokasi Strategis</h3>
                  <p className="text-gray-600 mb-4">
                    Berlokasi di Jagakarsa, Jakarta Selatan, dengan akses yang mudah dan 
                    lingkungan yang kondusif untuk pembelajaran.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 Jl. Amaliyah No. 62 A RT 3 RW 01</p>
                    <p>📍 Srengseng Sawah, Jagakarsa</p>
                    <p>📍 Jakarta Selatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bergabunglah dengan Keluarga Besar Kami
              </h2>
              <p className="mt-6 text-lg leading-8 text-primary-100">
                Mari bersama-sama membangun generasi Qurani yang berakhlak mulia dan cerdas.
                Hubungi kami untuk informasi lebih lanjut.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 transition-colors"
                >
                  Hubungi Kami
                </a>
                <a
                  href="/programs"
                  className="text-base font-semibold leading-6 text-white hover:text-primary-200 transition-colors"
                >
                  Lihat Program <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
