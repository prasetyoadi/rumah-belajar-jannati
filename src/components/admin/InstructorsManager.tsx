'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useAdminStore } from '@/store/useAdminStore'
import { Instructor } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface InstructorsManagerProps {
  isActive: boolean
}

const instructorSchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
  specialization: Yup.string().required('Spesialisasi wajib diisi'),
  experience: Yup.string().required('Pengalaman wajib diisi'),
  bio: Yup.string().required('Bio wajib diisi'),
  qualifications: Yup.array().of(Yup.string()).min(1, 'Minimal 1 kualifikasi harus diisi'),
})

const initialValues = {
  name: '',
  specialization: '',
  qualifications: [''],
  experience: '',
  bio: '',
  image: '',
  isActive: true,
}

export default function InstructorsManager({ isActive }: InstructorsManagerProps) {
  const {
    instructors,
    isLoadingInstructors,
    fetchInstructors,
    addInstructor,
    updateInstructor,
    deleteInstructor,
  } = useAdminStore()

  const [showForm, setShowForm] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initial form values
  const getInitialValues = () => {
    if (editingInstructor) {
      return {
        name: editingInstructor.name || '',
        specialization: editingInstructor.specialization || '',
        qualifications: editingInstructor.qualifications || [''],
        experience: editingInstructor.experience || '',
        bio: editingInstructor.bio || '',
        image: editingInstructor.image || '',
        isActive: editingInstructor.isActive !== undefined ? editingInstructor.isActive : true,
      }
    }
    return initialValues
  }

  useEffect(() => {
    if (isActive && instructors.length === 0) {
      fetchInstructors()
    }
  }, [isActive, instructors.length, fetchInstructors])

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    
    try {
      if (editingInstructor) {
        // Update existing instructor
        const response = await fetch('/api/instructors', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: editingInstructor.id, ...values }),
        })
        
        if (response.ok) {
          const updatedInstructor = await response.json()
          updateInstructor(editingInstructor.id, updatedInstructor)
        } else {
          throw new Error('Failed to update instructor')
        }
      } else {
        // Create new instructor
        const response = await fetch('/api/instructors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(values),
        })
        
        if (response.ok) {
          const newInstructor = await response.json()
          addInstructor(newInstructor)
        } else {
          throw new Error('Failed to create instructor')
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving instructor:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus instructor ini?')) {
      try {
        const response = await fetch(`/api/instructors?id=${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        
        if (response.ok) {
          deleteInstructor(id)
        } else {
          throw new Error('Failed to delete instructor')
        }
      } catch (error) {
        console.error('Error deleting instructor:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingInstructor(null)
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Instructor</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Instructor
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingInstructor ? 'Edit Instructor' : 'Tambah Instructor Baru'}
          </h3>
          
          <Formik
            key={editingInstructor?.id || 'new'}
            initialValues={getInitialValues()}
            validationSchema={instructorSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting: formikSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spesialisasi
                    </label>
                    <Field
                      type="text"
                      name="specialization"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pengalaman
                    </label>
                    <Field
                      type="text"
                      name="experience"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="contoh: 5 tahun"
                    />
                    <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL Foto (opsional)
                    </label>
                    <Field
                      type="url"
                      name="image"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kualifikasi
                  </label>
                  <FieldArray name="qualifications">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        {values.qualifications.map((qualification, index) => (
                          <div key={index} className="flex gap-2">
                            <Field
                              type="text"
                              name={`qualifications.${index}`}
                              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              placeholder="Masukkan kualifikasi"
                            />
                            {values.qualifications.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                              >
                                Hapus
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push('')}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Tambah Kualifikasi
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage name="qualifications" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Biografi
                  </label>
                  <Field
                    as="textarea"
                    name="bio"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Instructor Aktif
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
                      : editingInstructor ? 'Update' : 'Simpan'
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
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spesialisasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengalaman
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
              {isLoadingInstructors ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : instructors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Belum ada instructor
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr key={instructor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {instructor.image && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={instructor.image}
                              alt={instructor.name}
                            />
                          </div>
                        )}
                        <div className={instructor.image ? "ml-4" : ""}>
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {instructor.bio}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instructor.specialization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {instructor.experience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        instructor.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {instructor.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(instructor)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(instructor.id)}
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
