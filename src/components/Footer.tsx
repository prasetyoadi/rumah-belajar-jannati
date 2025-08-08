import React from 'react'
import Link from 'next/link'
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { contactInfo } from '@/lib/data'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Program', href: '/programs' },
  { name: 'Tentang Kami', href: '/about' },
  { name: 'Instruktur', href: '/instructors' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Kontak', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Rumah Belajar Jannati</h3>
            <p className="text-gray-300 text-sm">
              Pusat pembelajaran Islam terpadu yang menghadirkan pendidikan berkualitas 
              dengan landasan Al-Quran dan Sunnah untuk membentuk generasi Qurani.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="arabic-text text-lg">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navigasi</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href as any}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Telepon/WhatsApp</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2.078c-5.454 0-9.86 4.406-9.86 9.86 0 1.746.457 3.385 1.257 4.803.068.12.154.23.259.325l7.759 8.759c.377.425.982.425 1.359 0l7.759-8.759c.105-.095.191-.205.259-.325.8-1.418 1.257-3.057 1.257-4.803 0-5.454-4.406-9.86-9.86-9.86zM12.017 15.52c-2.079 0-3.764-1.685-3.764-3.764s1.685-3.764 3.764-3.764 3.764 1.685 3.764 3.764-1.685 3.764-3.764 3.764z"/>
                </svg>
                <div>
                  <p className="text-sm text-gray-300">Instagram</p>
                  <a
                    href={`https://instagram.com/${contactInfo.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    @{contactInfo.instagram}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Alamat</p>
                  <p className="text-sm text-white">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.district}, {contactInfo.address.city}<br />
                    {contactInfo.address.province}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Rumah Belajar Jannati. Semua hak dilindungi.
            </p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Dibuat dengan ❤️ untuk pendidikan Islam yang berkualitas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
