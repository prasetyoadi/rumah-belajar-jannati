'use client'

import { useState, useEffect } from 'react'
import { useAdminStore } from '@/store/useAdminStore'
import { Gallery } from '@/types'
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface GalleryForm {
  title: string
  description: string
  imageUrl: string
  category: 'classroom' | 'playground' | 'facility' | 'activity' | 'event' | ''
}

const initialForm: GalleryForm = {
  title: '',
  description: '',
  imageUrl: '',
  category: ''
}

export default function GalleryManager() {
  const {
    gallery,
    isLoadingGallery,
    error,
    fetchGallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  } = useAdminStore()

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<GalleryForm>(initialForm)

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!form.category) {
        alert('Please select a category')
        return
      }

      const galleryData: Gallery = {
        id: editingId || Date.now().toString(),
        ...form,
        category: form.category as 'classroom' | 'playground' | 'facility' | 'activity' | 'event',
        isActive: true,
        order: 0,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (editingId) {
        // Update existing gallery item
        const response = await fetch(`/api/gallery/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryData)
        })
        if (response.ok) {
          updateGalleryItem(editingId, galleryData)
        }
      } else {
        // Add new gallery item
        const response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryData)
        })
        if (response.ok) {
          addGalleryItem(galleryData)
        }
      }

      handleClose()
    } catch (error) {
      console.error('Error saving gallery item:', error)
    }
  }

  const handleEdit = (item: Gallery) => {
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category
    })
    setEditingId(item.id)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          deleteGalleryItem(id)
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error)
      }
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditingId(null)
    setForm(initialForm)
  }

  const categories = ['classroom', 'playground', 'facility', 'activity', 'event']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Manage facility photos and gallery content</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Photo
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  {form.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-image.jpg'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as 'classroom' | 'playground' | 'facility' | 'activity' | 'event' | '' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    {editingId ? 'Update' : 'Add'} Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
