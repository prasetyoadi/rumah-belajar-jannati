import React from 'react'
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { contactInfo } from '@/lib/data'

export default function ContactSection() {
  return (
    <section className="py-24 bg-primary-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hubungi <span className="gradient-text">Kami</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Siap membantu Anda mendapatkan informasi lengkap tentang program pembelajaran kami.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Phone */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-6">
              <PhoneIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telepon / WhatsApp</h3>
            <p className="text-gray-600 mb-4">Hubungi kami langsung untuk konsultasi</p>
            <a
              href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.786"/>
              </svg>
              Chat WhatsApp
            </a>
            <p className="text-sm text-gray-500 mt-2">{contactInfo.phone}</p>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600 mb-6">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 2.078c-5.454 0-9.86 4.406-9.86 9.86 0 1.746.457 3.385 1.257 4.803.068.12.154.23.259.325l7.759 8.759c.377.425.982.425 1.359 0l7.759-8.759c.105-.095.191-.205.259-.325.8-1.418 1.257-3.057 1.257-4.803 0-5.454-4.406-9.86-9.86-9.86zM12.017 15.52c-2.079 0-3.764-1.685-3.764-3.764s1.685-3.764 3.764-3.764 3.764 1.685 3.764 3.764-1.685 3.764-3.764 3.764z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram</h3>
            <p className="text-gray-600 mb-4">Ikuti kegiatan terbaru kami</p>
            <a
              href={`https://instagram.com/${contactInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow Instagram
            </a>
            <p className="text-sm text-gray-500 mt-2">@{contactInfo.instagram}</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
              <MapPinIcon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Alamat</h3>
            <p className="text-gray-600 mb-4">Kunjungi langsung lokasi kami</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${contactInfo.address.street}, ${contactInfo.address.district}, ${contactInfo.address.city}, ${contactInfo.address.province}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              <MapPinIcon className="h-4 w-4" />
              Lihat di Maps
            </a>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {contactInfo.address.street}<br />
              {contactInfo.address.district}, {contactInfo.address.city}<br />
              {contactInfo.address.province}
            </p>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-16 max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <ClockIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Jam Operasional</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Senin - Jumat</span>
              <span className="font-semibold text-gray-900">08:00 - 17:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Sabtu</span>
              <span className="font-semibold text-gray-900">08:00 - 15:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Minggu</span>
              <span className="font-semibold text-gray-900">09:00 - 12:00</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Hari Libur Nasional</span>
              <span className="font-semibold text-red-600">Tutup</span>
            </div>
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siap Bergabung dengan Kami?
            </h3>
            <p className="text-gray-600 mb-8">
              Daftarkan anak Anda sekarang dan dapatkan konsultasi gratis mengenai program yang paling sesuai.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a
                href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=Assalamu'alaikum, saya ingin mendaftarkan anak saya di Rumah Belajar Jannati. Mohon informasi lebih lanjut.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
              >
                <PhoneIcon className="h-5 w-5" />
                Daftar Sekarang
              </a>
              <a
                href="/programs"
                className="inline-flex items-center justify-center rounded-md border border-primary-600 px-6 py-3 text-base font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Lihat Program
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
