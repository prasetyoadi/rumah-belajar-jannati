import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PhoneIcon, CheckIcon } from '@heroicons/react/24/outline'
import { contactInfo } from '@/lib/data'

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Daftar <span className="gradient-text">Sekarang</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Bergabunglah dengan keluarga besar Rumah Belajar Jannati dan mulai 
                perjalanan pembelajaran Islam yang berkualitas untuk buah hati Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Registration Steps */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Langkah <span className="gradient-text">Pendaftaran</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Proses pendaftaran yang mudah dan cepat dalam 4 langkah sederhana.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hubungi Kami</h3>
                <p className="text-gray-600 text-sm">
                  Hubungi kami melalui WhatsApp atau datang langsung ke lokasi
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Konsultasi</h3>
                <p className="text-gray-600 text-sm">
                  Konsultasi gratis untuk memilih program yang sesuai dengan anak
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trial 3 Hari</h3>
                <p className="text-gray-600 text-sm">
                  Ikuti program trial gratis selama 3 hari untuk merasakan metode kami
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Daftar Resmi</h3>
                <p className="text-gray-600 text-sm">
                  Setelah puas dengan trial, lakukan pendaftaran resmi dan mulai belajar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Documents Required */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Dokumen yang <span className="gradient-text">Diperlukan</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Fotocopy Akta Kelahiran</h3>
                      <p className="text-gray-600 text-sm">Untuk verifikasi identitas dan usia anak</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Fotocopy KTP Orang Tua</h3>
                      <p className="text-gray-600 text-sm">Identitas wali yang akan mendaftarkan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Pas Foto 3x4</h3>
                      <p className="text-gray-600 text-sm">2 lembar pas foto terbaru anak</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Fotocopy Kartu Keluarga</h3>
                      <p className="text-gray-600 text-sm">Untuk verifikasi hubungan keluarga</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Surat Keterangan Sehat</h3>
                      <p className="text-gray-600 text-sm">Dari dokter atau puskesmas (opsional)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Informasi <span className="gradient-text">Pembayaran</span>
                </h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Biaya Pendaftaran</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Pendaftaran:</span>
                      <span className="font-semibold">Rp. 50.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Buku & Materi:</span>
                      <span className="font-semibold">Rp. 35.000 - 100.000</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>SPP Bulanan (Subsidi):</span>
                        <span className="text-green-600">Rp. 50.000 - 100.000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        *Sesuai kemampuan orang tua
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Metode Pembayaran</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Transfer Bank (BCA, BRI, Mandiri)</li>
                    <li>• Cash/Tunai di lokasi</li>
                    <li>• E-wallet (OVO, GoPay, DANA)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    *Detail rekening akan diberikan setelah konfirmasi pendaftaran
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Siap Memulai Perjalanan Belajar?
              </h2>
              <p className="mt-6 text-lg leading-8 text-primary-100">
                Jangan tunda lagi! Daftar sekarang dan berikan pendidikan terbaik untuk buah hati Anda. 
                Tim kami siap membantu proses pendaftaran dari awal hingga selesai.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=Assalamu'alaikum, saya ingin mendaftarkan anak saya di Rumah Belajar Jannati. Mohon informasi lebih lanjut mengenai proses pendaftaran.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 transition-colors"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Daftar via WhatsApp
                </a>
                <a
                  href="/contact"
                  className="text-base font-semibold leading-6 text-white hover:text-primary-200 transition-colors"
                >
                  Kunjungi Lokasi <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-primary-100 text-sm">Hari Trial Gratis</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-primary-100 text-sm">Berdasarkan Quran & Sunnah</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">150+</div>
                  <div className="text-primary-100 text-sm">Keluarga Percaya</div>
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
