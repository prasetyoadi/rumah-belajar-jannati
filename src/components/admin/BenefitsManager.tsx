'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAdminStore } from '@/store/useAdminStore'
import { Benefit } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface BenefitsManagerProps {
  isActive: boolean
}

const iconOptions = [
  'book-open',
  'heart',
  'academic-cap',
  'home',
  'star',
  'users',
  'shield-check',
  'light-bulb',
  'trophy',
  'globe-alt'
]

// Validation schema
const benefitValidationSchema = Yup.object({
  title: Yup.string()
    .required('Judul manfaat harus diisi')
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  description: Yup.string()
    .required('Deskripsi harus diisi')
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  icon: Yup.string()
    .required('Icon harus dipilih')
    .oneOf(iconOptions, 'Icon tidak valid'),
  order: Yup.number()
    .required('Urutan harus diisi')
    .min(1, 'Urutan minimal 1')
    .integer('Urutan harus berupa angka bulat'),
  isActive: Yup.boolean()
})

export default function BenefitsManager({ isActive }: BenefitsManagerProps) {
  const {
    benefits,
    isLoadingBenefits,
    fetchBenefits,
    addBenefit,
    updateBenefit,
    deleteBenefit,
  } = useAdminStore()

  const [showForm, setShowForm] = useState(false)
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initial form values
  const getInitialValues = (): Partial<Benefit> => {
    if (editingBenefit) {
      return {
        title: editingBenefit.title || '',
        description: editingBenefit.description || '',
        icon: editingBenefit.icon || 'book-open',
        isActive: editingBenefit.isActive !== undefined ? editingBenefit.isActive : true,
        order: editingBenefit.order || 1,
      }
    }
    return {
      title: '',
      description: '',
      icon: 'book-open',
      isActive: true,
      order: benefits.length + 1,
    }
  }

  useEffect(() => {
    if (isActive && benefits.length === 0) {
      fetchBenefits()
    }
  }, [isActive, benefits.length, fetchBenefits])

  const handleSubmit = async (values: Partial<Benefit>) => {
    setIsSubmitting(true)
    
    try {
      if (editingBenefit) {
        // Update existing benefit
        const response = await fetch('/api/benefits', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: editingBenefit.id, ...values }),
        })
        
        if (response.ok) {
          const updatedBenefit = await response.json()
          updateBenefit(editingBenefit.id, updatedBenefit)
        } else {
          throw new Error('Failed to update benefit')
        }
      } else {
        // Create new benefit
        const response = await fetch('/api/benefits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(values),
        })
        
        if (response.ok) {
          const newBenefit = await response.json()
          addBenefit(newBenefit)
        } else {
          throw new Error('Failed to create benefit')
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving benefit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus manfaat ini?')) {
      try {
        const response = await fetch(`/api/benefits?id=${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        
        if (response.ok) {
          deleteBenefit(id)
        } else {
          throw new Error('Failed to delete benefit')
        }
      } catch (error) {
        console.error('Error deleting benefit:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingBenefit(null)
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Manfaat</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Manfaat
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingBenefit ? 'Edit Manfaat' : 'Tambah Manfaat Baru'}
          </h3>
          
          <Formik
            key={editingBenefit?.id || 'new'}
            initialValues={getInitialValues()}
            validationSchema={benefitValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting: formikSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Judul Manfaat
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
                      Icon
                    </label>
                    <Field
                      as="select"
                      name="icon"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="icon" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urutan
                    </label>
                    <Field
                      type="number"
                      name="order"
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="order" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
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

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Manfaat Aktif
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
                      : editingBenefit ? 'Update' : 'Simpan'
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
                  Manfaat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urutan
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
              {isLoadingBenefits ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : benefits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Belum ada manfaat
                  </td>
                </tr>
              ) : (
                benefits.sort((a, b) => a.order - b.order).map((benefit) => (
                  <tr key={benefit.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {benefit.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {benefit.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {benefit.icon}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        benefit.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {benefit.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(benefit)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(benefit.id)}
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
