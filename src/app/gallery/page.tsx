'use client'

import { useState, useEffect } from 'react'
import { Gallery } from '@/types'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function GalleryPage() {
  const [gallery, setGallery] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (!response.ok) throw new Error('Failed to fetch gallery')
      const data = await response.json()
      setGallery(data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...Array.from(new Set(gallery.map(item => item.category)))]
  
  const filteredGallery = selectedCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory)

  const openModal = (item: Gallery) => {
    setSelectedImage(item)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <PhotoIcon className="h-16 w-16 mx-auto mb-6 text-primary-600" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <span className="gradient-text">Gallery Fasilitas</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lihat keindahan fasilitas dan aktivitas di Rumah Belajar Jannati
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    {category === 'All' ? 'Semua' : 
                     category === 'classroom' ? 'Ruang Kelas' :
                     category === 'playground' ? 'Area Bermain' :
                     category === 'facility' ? 'Fasilitas' :
                     category === 'activity' ? 'Aktivitas' :
                     category === 'event' ? 'Acara' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {filteredGallery.length === 0 ? (
              <div className="text-center py-16">
                <PhotoIcon className="h-24 w-24 mx-auto text-gray-400 mb-6" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada foto</h3>
                <p className="text-gray-600">Foto untuk kategori ini belum tersedia</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => openModal(item)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {item.category === 'classroom' ? 'Ruang Kelas' :
                           item.category === 'playground' ? 'Area Bermain' :
                           item.category === 'facility' ? 'Fasilitas' :
                           item.category === 'activity' ? 'Aktivitas' :
                           item.category === 'event' ? 'Acara' : item.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      
      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <div className="aspect-video relative">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedImage.title}
                  </h2>
                  <span className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
                    {selectedImage.category === 'classroom' ? 'Ruang Kelas' :
                     selectedImage.category === 'playground' ? 'Area Bermain' :
                     selectedImage.category === 'facility' ? 'Fasilitas' :
                     selectedImage.category === 'activity' ? 'Aktivitas' :
                     selectedImage.category === 'event' ? 'Acara' : selectedImage.category}
                  </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
