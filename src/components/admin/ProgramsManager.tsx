'use client'

import { useState, useEffect } from 'react'
import { useAdminStore } from '@/store/useAdminStore'
import { Program } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ProgramsManagerProps {
  isActive: boolean
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
  const [formData, setFormData] = useState<Partial<Program>>({
    name: '',
    description: '',
    type: 'preschool',
    ageGroup: '',
    duration: '',
    schedule: [],
    price: {
      registration: 0,
      book: 0,
      monthly: 0,
      spp: {
        subsidy: [0, 0, 0],
        private: 0,
      },
    },
    curriculum: [],
    isActive: true,
  })

  useEffect(() => {
    if (isActive && programs.length === 0) {
      fetchPrograms()
    }
  }, [isActive, programs.length, fetchPrograms])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingProgram) {
        // Update existing program
        const response = await fetch('/api/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProgram.id, ...formData }),
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
          body: JSON.stringify(formData),
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
    setFormData(program)
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
    setFormData({
      name: '',
      description: '',
      type: 'preschool',
      ageGroup: '',
      duration: '',
      schedule: [],
      price: {
        registration: 0,
        book: 0,
        monthly: 0,
        spp: {
          subsidy: [0, 0, 0],
          private: 0,
        },
      },
      curriculum: [],
      isActive: true,
    })
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Program
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
                  Tipe Program
                </label>
                <select
                  value={formData.type || 'preschool'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'preschool' | 'tpa' | 'course' })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                >
                  <option value="preschool">Preschool</option>
                  <option value="tpa">TPA</option>
                  <option value="course">Kursus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kelompok Usia
                </label>
                <input
                  type="text"
                  value={formData.ageGroup || ''}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durasi
                </label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biaya Pendaftaran
                </label>
                <input
                  type="number"
                  value={formData.price?.registration || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price!, registration: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biaya Buku
                </label>
                <input
                  type="number"
                  value={formData.price?.book || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price!, book: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SPP Bulanan
                </label>
                <input
                  type="number"
                  value={formData.price?.monthly || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: { ...formData.price!, monthly: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SPP Private
                </label>
                <input
                  type="number"
                  value={formData.price?.spp.private || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    price: {
                      ...formData.price!,
                      spp: { ...formData.price!.spp, private: parseInt(e.target.value) }
                    }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive || false}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Program Aktif
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                {editingProgram ? 'Update' : 'Simpan'}
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
