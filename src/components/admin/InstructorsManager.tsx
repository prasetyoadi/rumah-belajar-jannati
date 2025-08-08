'use client'

import { useState, useEffect } from 'react'
import { useAdminStore } from '@/store/useAdminStore'
import { Instructor } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface InstructorsManagerProps {
  isActive: boolean
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
  const [formData, setFormData] = useState<Partial<Instructor>>({
    name: '',
    specialization: '',
    qualifications: [],
    experience: '',
    bio: '',
    image: '',
    isActive: true,
  })

  useEffect(() => {
    if (isActive && instructors.length === 0) {
      fetchInstructors()
    }
  }, [isActive, instructors.length, fetchInstructors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingInstructor) {
        // Update existing instructor
        const response = await fetch('/api/instructors', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingInstructor.id, ...formData }),
        })
        
        if (response.ok) {
          const updatedInstructor = await response.json()
          updateInstructor(editingInstructor.id, updatedInstructor)
        }
      } else {
        // Create new instructor
        const response = await fetch('/api/instructors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (response.ok) {
          const newInstructor = await response.json()
          addInstructor(newInstructor)
        }
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving instructor:', error)
    }
  }

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setFormData(instructor)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus instructor ini?')) {
      try {
        const response = await fetch(`/api/instructors?id=${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          deleteInstructor(id)
        }
      } catch (error) {
        console.error('Error deleting instructor:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingInstructor(null)
    setFormData({
      name: '',
      specialization: '',
      qualifications: [],
      experience: '',
      bio: '',
      image: '',
      isActive: true,
    })
  }

  const handleQualificationsChange = (value: string) => {
    const qualifications = value.split('\n').filter(q => q.trim() !== '')
    setFormData({ ...formData, qualifications })
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spesialisasi
                </label>
                <input
                  type="text"
                  value={formData.specialization || ''}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pengalaman
                </label>
                <input
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="contoh: 5 tahun"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto (opsional)
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kualifikasi (satu per baris)
              </label>
              <textarea
                value={formData.qualifications?.join('\n') || ''}
                onChange={(e) => handleQualificationsChange(e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="S1 Pendidikan Agama Islam&#10;Tahfidz 30 Juz&#10;Sertifikat Metode Ummi"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografi
              </label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive || false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Instructor Aktif
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                {editingInstructor ? 'Update' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </form>
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
