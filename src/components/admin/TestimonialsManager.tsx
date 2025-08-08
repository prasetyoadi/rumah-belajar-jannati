'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAdminStore } from '@/store/useAdminStore'
import { Testimonial } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface TestimonialsManagerProps {
  isActive: boolean
}

// Validation schema
const testimonialValidationSchema = Yup.object({
  name: Yup.string()
    .required('Nama harus diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  role: Yup.string()
    .required('Peran harus diisi')
    .min(2, 'Peran minimal 2 karakter')
    .max(100, 'Peran maksimal 100 karakter'),
  content: Yup.string()
    .required('Isi testimonial harus diisi')
    .min(20, 'Isi testimonial minimal 20 karakter')
    .max(1000, 'Isi testimonial maksimal 1000 karakter'),
  rating: Yup.number()
    .required('Rating harus diisi')
    .min(1, 'Rating minimal 1')
    .max(5, 'Rating maksimal 5')
    .integer('Rating harus berupa angka bulat'),
  image: Yup.string()
    .url('Image harus berupa URL yang valid')
    .nullable(),
  isActive: Yup.boolean()
})

export default function TestimonialsManager({ isActive }: TestimonialsManagerProps) {
  const {
    testimonials,
    isLoadingTestimonials,
    fetchTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useAdminStore()

  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initial form values
  const getInitialValues = (): Partial<Testimonial> => {
    if (editingTestimonial) {
      return {
        name: editingTestimonial.name || '',
        role: editingTestimonial.role || '',
        content: editingTestimonial.content || '',
        rating: editingTestimonial.rating || 5,
        image: editingTestimonial.image || '',
        isActive: editingTestimonial.isActive !== undefined ? editingTestimonial.isActive : true,
      }
    }
    return {
      name: '',
      role: '',
      content: '',
      rating: 5,
      image: '',
      isActive: true,
    }
  }

  useEffect(() => {
    if (isActive && testimonials.length === 0) {
      fetchTestimonials()
    }
  }, [isActive, testimonials.length, fetchTestimonials])

  const handleSubmit = async (values: Partial<Testimonial>) => {
    setIsSubmitting(true)
    
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const response = await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: editingTestimonial.id, ...values }),
        })
        
        if (response.ok) {
          const updatedTestimonial = await response.json()
          updateTestimonial(editingTestimonial.id, updatedTestimonial)
        } else {
          throw new Error('Failed to update testimonial')
        }
      } else {
        // Create new testimonial
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(values),
        })
        
        if (response.ok) {
          const newTestimonial = await response.json()
          addTestimonial(newTestimonial)
        } else {
          throw new Error('Failed to create testimonial')
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
      try {
        const response = await fetch(`/api/testimonials?id=${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        
        if (response.ok) {
          deleteTestimonial(id)
        } else {
          throw new Error('Failed to delete testimonial')
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingTestimonial(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Testimonial</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingTestimonial ? 'Edit Testimonial' : 'Tambah Testimonial Baru'}
          </h3>
          
          <Formik
            key={editingTestimonial?.id || 'new'}
            initialValues={getInitialValues()}
            validationSchema={testimonialValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting: formikSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peran/Jabatan
                    </label>
                    <Field
                      type="text"
                      name="role"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                      placeholder="contoh: Orang Tua Murid"
                    />
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (1-5)
                    </label>
                    <Field
                      as="select"
                      name="rating"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    >
                      <option value={5}>5 Bintang</option>
                      <option value={4}>4 Bintang</option>
                      <option value={3}>3 Bintang</option>
                      <option value={2}>2 Bintang</option>
                      <option value={1}>1 Bintang</option>
                    </Field>
                    <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL Foto (opsional)
                    </label>
                    <Field
                      type="url"
                      name="image"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial
                  </label>
                  <Field
                    as="textarea"
                    name="content"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    placeholder="Tulis testimonial di sini..."
                  />
                  <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Testimonial Aktif
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || formikSubmitting 
                      ? 'Menyimpan...' 
                      : editingTestimonial ? 'Update' : 'Simpan'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
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

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Testimonial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoadingTestimonials ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Belum ada testimonial
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {testimonial.image && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={testimonial.image}
                              alt={testimonial.name}
                            />
                          </div>
                        )}
                        <div className={testimonial.image ? "ml-4" : ""}>
                          <div className="text-sm font-medium text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {testimonial.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        testimonial.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {testimonial.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
