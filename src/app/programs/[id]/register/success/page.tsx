import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  CheckCircleIcon,
  HomeIcon,
  PhoneIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { mockPrograms } from '@/lib/data'

interface ProgramRegisterSuccessPageProps {
  params: {
    id: string
  }
}

export default function ProgramRegisterSuccessPage({ params }: ProgramRegisterSuccessPageProps) {
  const program = mockPrograms.find(p => p.id === params.id)

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl w-full space-y-8">
            {/* Success Icon */}
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
              <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                Pendaftaran Berhasil! 🎉
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Terima kasih telah mendaftar di program <strong>{program.name}</strong>
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                📋 Langkah Selanjutnya
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Konfirmasi Tim Kami</h3>
                    <p className="text-gray-600 text-sm">
                      Tim kami akan menghubungi Anda dalam 1x24 jam melalui WhatsApp atau telepon 
                      untuk konfirmasi pendaftaran dan jadwal wawancara.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Wawancara & Assessment</h3>
                    <p className="text-gray-600 text-sm">
                      Kami akan mengatur jadwal untuk bertemu dengan Anda dan calon siswa 
                      untuk mengenal lebih dekat dan memastikan program sesuai dengan kebutuhan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Proses Administrasi</h3>
                    <p className="text-gray-600 text-sm">
                      Setelah diterima, Anda akan mendapatkan panduan lengkap mengenai 
                      pembayaran, dokumen yang diperlukan, dan persiapan pembelajaran.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Mulai Pembelajaran</h3>
                    <p className="text-gray-600 text-sm">
                      Selamat datang di keluarga besar Rumah Belajar Jannati! 
                      Perjalanan pembelajaran Islam yang berkualitas dimulai dari sini.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-primary-600" />
                Butuh Bantuan?
              </h3>
              <p className="text-gray-600 mb-4">
                Jika ada pertanyaan atau membutuhkan informasi lebih lanjut, 
                jangan ragu untuk menghubungi kami:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/6281234567890?text=Halo, saya baru saja mendaftar program dan ingin bertanya tentang proses selanjutnya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-500">0812-3456-7890</p>
                  </div>
                </a>
                
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telepon</p>
                    <p className="text-sm text-gray-500">0812-3456-7890</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <ClockIcon className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">📌 Catatan Penting</h3>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Pastikan nomor telepon yang Anda berikan aktif dan dapat dihubungi</li>
                    <li>• Siapkan dokumen yang mungkin diperlukan (akta kelahiran, KK, dll.)</li>
                    <li>• Konfirmasi kehadiran saat dijadwalkan wawancara</li>
                    <li>• Pendaftaran belum final hingga proses administrasi selesai</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200"
              >
                <HomeIcon className="h-5 w-5" />
                Kembali ke Beranda
              </Link>
              
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-all duration-200"
              >
                <DocumentTextIcon className="h-5 w-5" />
                Lihat Program Lain
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
