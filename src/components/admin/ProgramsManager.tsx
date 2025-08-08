'use client'

import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useAdminStore } from '@/store/useAdminStore'
import { Program } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ProgramsManagerProps {
  isActive: boolean
}

const programSchema = Yup.object().shape({
  name: Yup.string().required('Nama program wajib diisi'),
  description: Yup.string().required('Deskripsi wajib diisi'),
  type: Yup.string().oneOf(['preschool', 'tpa', 'course']).required('Tipe program wajib dipilih'),
  ageGroup: Yup.string().required('Kelompok usia wajib diisi'),
  duration: Yup.string().required('Durasi wajib diisi'),
  price: Yup.object().shape({
    registration: Yup.number().min(0, 'Harga tidak boleh negatif').required('Biaya pendaftaran wajib diisi'),
    book: Yup.number().min(0, 'Harga tidak boleh negatif').required('Biaya buku wajib diisi'),
    monthly: Yup.number().min(0, 'Harga tidak boleh negatif').required('Biaya bulanan wajib diisi'),
    spp: Yup.object().shape({
      private: Yup.number().min(0, 'Harga tidak boleh negatif'),
    }),
  }),
  curriculum: Yup.array().of(Yup.string()).min(1, 'Minimal 1 kurikulum harus diisi'),
})

const initialValues = {
  name: '',
  description: '',
  type: 'preschool' as 'preschool' | 'tpa' | 'course',
  ageGroup: '',
  duration: '',
  schedule: [''],
  price: {
    registration: 0,
    book: 0,
    monthly: 0,
    spp: {
      subsidy: [0, 0, 0],
      private: 0,
    },
  },
  curriculum: [''],
  isActive: true,
}

export default function ProgramsManager({ isActive }: ProgramsManagerProps) {
  const {
    programs,
    isLoadingPrograms,
    fetchPrograms,
    addProgram,
    updateProgram,
    deleteProgram,
  } = useAdminStore()

  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)

  useEffect(() => {
    if (isActive && programs.length === 0) {
      fetchPrograms()
    }
  }, [isActive, programs.length, fetchPrograms])

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (editingProgram) {
        // Update existing program
        const response = await fetch('/api/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProgram.id, ...values }),
        })
        
        if (response.ok) {
          const updatedProgram = await response.json()
          updateProgram(editingProgram.id, updatedProgram)
        }
      } else {
        // Create new program
        const response = await fetch('/api/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        
        if (response.ok) {
          const newProgram = await response.json()
          addProgram(newProgram)
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving program:', error)
    }
  }

  const handleEdit = (program: Program) => {
    setEditingProgram(program)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      try {
        const response = await fetch(`/api/programs?id=${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          deleteProgram(id)
        }
      } catch (error) {
        console.error('Error deleting program:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProgram(null)
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola Program</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Program
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingProgram ? 'Edit Program' : 'Tambah Program Baru'}
          </h3>
          
          <Formik
            initialValues={editingProgram ? {
              name: editingProgram.name,
              description: editingProgram.description,
              type: editingProgram.type,
              ageGroup: editingProgram.ageGroup,
              duration: editingProgram.duration,
              schedule: editingProgram.schedule || [''],
              price: editingProgram.price,
              curriculum: editingProgram.curriculum || [''],
              isActive: editingProgram.isActive,
            } : initialValues}
            validationSchema={programSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Program
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipe Program
                    </label>
                    <Field
                      as="select"
                      name="type"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="preschool">Preschool</option>
                      <option value="tpa">TPA</option>
                      <option value="course">Kursus</option>
                    </Field>
                    <ErrorMessage name="type" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kelompok Usia
                    </label>
                    <Field
                      type="text"
                      name="ageGroup"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="ageGroup" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durasi
                    </label>
                    <Field
                      type="text"
                      name="duration"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="duration" component="div" className="text-red-600 text-sm mt-1" />
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
                  <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biaya Pendaftaran
                    </label>
                    <Field
                      type="number"
                      name="price.registration"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="price.registration" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biaya Buku
                    </label>
                    <Field
                      type="number"
                      name="price.book"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="price.book" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPP Bulanan
                    </label>
                    <Field
                      type="number"
                      name="price.monthly"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="price.monthly" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPP Private
                    </label>
                    <Field
                      type="number"
                      name="price.spp.private"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <ErrorMessage name="price.spp.private" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kurikulum
                  </label>
                  <FieldArray name="curriculum">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        {values.curriculum.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <Field
                              name={`curriculum.${index}`}
                              placeholder={`Kurikulum ${index + 1}`}
                              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                            {values.curriculum.length > 1 && (
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
                          Tambah Kurikulum
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage name="curriculum" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jadwal
                  </label>
                  <FieldArray name="schedule">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        {values.schedule.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <Field
                              name={`schedule.${index}`}
                              placeholder={`Jadwal ${index + 1}`}
                              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                            {values.schedule.length > 1 && (
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
                          Tambah Jadwal
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Program Aktif
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Menyimpan...' : (editingProgram ? 'Update' : 'Simpan')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
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
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usia
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
              {isLoadingPrograms ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Belum ada program
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr key={program.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {program.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {program.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {program.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.ageGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        program.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {program.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(program)}
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
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
