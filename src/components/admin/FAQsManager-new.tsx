'use client'

import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FAQ } from '@/store/useDataStore'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useFAQs, useCreateFAQ, useUpdateFAQ, useDeleteFAQ } from '@/hooks/useFAQs'

interface FAQsManagerProps {
  isActive: boolean
}

const categoryOptions = [
  { value: 'general', label: 'Umum' },
  { value: 'registration', label: 'Pendaftaran' },
  { value: 'programs', label: 'Program' },
  { value: 'payment', label: 'Pembayaran' },
]

// Validation schema
const faqValidationSchema = Yup.object({
  question: Yup.string()
    .required('Pertanyaan harus diisi')
    .min(10, 'Pertanyaan minimal 10 karakter')
    .max(500, 'Pertanyaan maksimal 500 karakter'),
  answer: Yup.string()
    .required('Jawaban harus diisi')
    .min(20, 'Jawaban minimal 20 karakter')
    .max(2000, 'Jawaban maksimal 2000 karakter'),
  category: Yup.string()
    .required('Kategori harus dipilih')
    .oneOf(categoryOptions.map(opt => opt.value), 'Kategori tidak valid'),
  order: Yup.number()
    .required('Urutan harus diisi')
    .min(1, 'Urutan minimal 1')
    .integer('Urutan harus berupa angka bulat'),
  isActive: Yup.boolean(),
})

export default function FAQsManager({ isActive }: FAQsManagerProps) {
  const { data: faqs, isLoading: isLoadingFaqs } = useFAQs()
  const createFAQ = useCreateFAQ()
  const updateFAQ = useUpdateFAQ()
  const deleteFAQ = useDeleteFAQ()

  const [showForm, setShowForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)

  // Initial form values
  const getInitialValues = (): Partial<FAQ> => {
    if (editingFaq) {
      return {
        question: editingFaq.question || '',
        answer: editingFaq.answer || '',
        category: editingFaq.category || 'general',
        order: editingFaq.order || 1,
        isActive: editingFaq.isActive !== undefined ? editingFaq.isActive : true,
      }
    }
    return {
      question: '',
      answer: '',
      category: 'general',
      order: (faqs?.length || 0) + 1,
      isActive: true,
    }
  }

  const handleSubmit = async (values: Partial<FAQ>) => {
    try {
      if (editingFaq) {
        await updateFAQ.mutateAsync({ 
          id: editingFaq.id, 
          data: values 
        })
      } else {
        await createFAQ.mutateAsync(values as Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>)
      }
      resetForm()
    } catch (error) {
      console.error('Error saving FAQ:', error)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
      try {
        await deleteFAQ.mutateAsync(id)
      } catch (error) {
        console.error('Error deleting FAQ:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingFaq(null)
  }

  if (!isActive) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kelola FAQ</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah FAQ
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingFaq ? 'Edit FAQ' : 'Tambah FAQ Baru'}
          </h3>

          <Formik
            key={editingFaq?.id || 'new'}
            initialValues={getInitialValues()}
            validationSchema={faqValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting: formikSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urutan
                    </label>
                    <Field
                      type="number"
                      name="order"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    />
                    <ErrorMessage name="order" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pertanyaan
                  </label>
                  <Field
                    type="text"
                    name="question"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                  />
                  <ErrorMessage name="question" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jawaban
                  </label>
                  <Field
                    as="textarea"
                    name="answer"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                  />
                  <ErrorMessage name="answer" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    FAQ Aktif
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={createFAQ.isPending || updateFAQ.isPending || formikSubmitting}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createFAQ.isPending || updateFAQ.isPending || formikSubmitting
                      ? 'Menyimpan...'
                      : editingFaq
                      ? 'Update'
                      : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={createFAQ.isPending || updateFAQ.isPending || formikSubmitting}
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
                  FAQ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
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
              {isLoadingFaqs ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : (faqs || []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Belum ada FAQ
                  </td>
                </tr>
              ) : (faqs || [])
                  .sort((a: FAQ, b: FAQ) => a.order - b.order)
                  .map((faq: FAQ) => (
                    <tr key={faq.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {faq.question}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {faq.answer}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {categoryOptions.find(cat => cat.value === faq.category)?.label || faq.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {faq.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          faq.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {faq.isActive ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={deleteFAQ.isPending}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
