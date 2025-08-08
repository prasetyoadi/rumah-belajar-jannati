'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAdminStore } from '@/store/useAdminStore'
import { Gallery } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface GalleryManagerProps {
  isActive: boolean
}

const categoryOptions = [
  { value: 'classroom', label: 'Ruang Kelas' },
  { value: 'playground', label: 'Area Bermain' },
  { value: 'facility', label: 'Fasilitas' },
  { value: 'activity', label: 'Kegiatan' },
  { value: 'event', label: 'Acara' },
]

// Validation schema
const galleryValidationSchema = Yup.object({
  title: Yup.string()
    .required('Judul harus diisi')
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  description: Yup.string()
    .required('Deskripsi harus diisi')
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  imageUrl: Yup.string()
    .required('URL gambar harus diisi')
    .url('URL gambar harus valid'),
  category: Yup.string()
    .required('Kategori harus dipilih')
    .oneOf(categoryOptions.map(c => c.value), 'Kategori tidak valid'),
})

export default function GalleryManager({ isActive }: GalleryManagerProps) {
  const {
    gallery,
    isLoadingGallery,
    error,
    fetchGallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  } = useAdminStore()

  const [showForm, setShowForm] = useState(false)
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initial form values
  const getInitialValues = (): Partial<Gallery> => {
    if (editingGallery) {
      return {
        title: editingGallery.title || '',
        description: editingGallery.description || '',
        imageUrl: editingGallery.imageUrl || '',
        category: editingGallery.category as 'classroom' | 'playground' | 'facility' | 'activity' | 'event' | undefined,
      }
    }
    return {
      title: '',
      description: '',
      imageUrl: '',
      category: undefined,
    }
  }

  useEffect(() => {
    if (isActive && gallery.length === 0) {
      fetchGallery()
    }
  }, [isActive, gallery.length, fetchGallery])

  const handleSubmit = async (values: Partial<Gallery>) => {
    setIsSubmitting(true)
    
    try {
      const galleryData: Gallery = {
        id: editingGallery?.id || Date.now().toString(),
        title: values.title || '',
        description: values.description || '',
        imageUrl: values.imageUrl || '',
        category: values.category as 'classroom' | 'playground' | 'facility' | 'activity' | 'event',
        isActive: true,
        order: 0,
        tags: [],
        createdAt: editingGallery?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (editingGallery) {
        // Update existing gallery item
        const response = await fetch(`/api/gallery/${editingGallery.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(galleryData)
        })
        if (response.ok) {
          updateGalleryItem(editingGallery.id, galleryData)
        } else {
          throw new Error('Failed to update gallery item')
        }
      } else {
        // Add new gallery item
        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(galleryData)
        })
        if (response.ok) {
          addGalleryItem(galleryData)
        } else {
          throw new Error('Failed to create gallery item')
        }
      }

      handleClose()
    } catch (error) {
      console.error('Error saving gallery item:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (item: Gallery) => {
    setEditingGallery(item)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        if (response.ok) {
          deleteGalleryItem(id)
        } else {
          throw new Error('Failed to delete gallery item')
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error)
      }
    }
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingGallery(null)
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelola Galeri</h2>
          <p className="text-gray-600">Kelola foto fasilitas dan konten galeri</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Foto
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoadingGallery ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingGallery ? 'Edit Item Galeri' : 'Tambah Item Galeri Baru'}
          </h3>
          
          <Formik
            key={editingGallery?.id || 'new'}
            initialValues={getInitialValues()}
            validationSchema={galleryValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting: formikSubmitting, values }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Gambar
                  </label>
                  <Field
                    type="url"
                    name="imageUrl"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm mt-1" />
                  
                  {values.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={values.imageUrl}
                        alt="Preview"
                        className="h-32 w-auto rounded border border-gray-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || formikSubmitting 
                      ? 'Menyimpan...' 
                      : editingGallery ? 'Update' : 'Simpan'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting || formikSubmitting}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Batal
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  )
}
