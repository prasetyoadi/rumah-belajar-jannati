'use client'

import React, { useState, useEffect } from 'react'
import { PortalData } from '@/types'
import { useAdminStore } from '@/store/useAdminStore'
import ProgramsManager from '@/components/admin/ProgramsManager'
import InstructorsManager from '@/components/admin/InstructorsManager'
import BenefitsManager from '@/components/admin/BenefitsManager'
import FAQsManager from '@/components/admin/FAQsManager'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import GalleryManager from '@/components/admin/GalleryManager'
import { 
  ChartBarIcon,
  UserGroupIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [portalData, setPortalData] = useState<PortalData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'instructors' | 'benefits' | 'faqs' | 'testimonials' | 'gallery' | 'monitoring'>('overview')
  
  const { 
    programs, 
    instructors, 
    benefits, 
    faqs, 
    testimonials,
    gallery,
    fetchPrograms,
    fetchInstructors,
    fetchBenefits,
    fetchFaqs,
    fetchTestimonials,
    fetchGallery
  } = useAdminStore()

  useEffect(() => {
    loadInitialData()
    fetchPortalData()
    // Auto-refresh portal data every 5 minutes
    const interval = setInterval(fetchPortalData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const loadInitialData = async () => {
    try {
      await Promise.all([
        fetchPrograms(),
        fetchInstructors(),
        fetchBenefits(),
        fetchFaqs(),
        fetchTestimonials(),
        fetchGallery()
      ])
    } catch (error) {
      console.error('Failed to load initial data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPortalData = async () => {
    try {
      const response = await fetch('/api/portal-data')
      const data = await response.json()
      setPortalData(data)
    } catch (error) {
      console.error('Failed to fetch portal data:', error)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'programs', name: 'Programs', icon: BookOpenIcon },
    { id: 'instructors', name: 'Instructors', icon: AcademicCapIcon },
    { id: 'benefits', name: 'Benefits', icon: HeartIcon },
    { id: 'faqs', name: 'FAQs', icon: QuestionMarkCircleIcon },
    { id: 'testimonials', name: 'Testimonials', icon: ChatBubbleLeftRightIcon },
    { id: 'gallery', name: 'Gallery', icon: PhotoIcon },
    { id: 'monitoring', name: 'Portal Monitoring', icon: UserGroupIcon },
  ]

  const getStats = () => {
    return [
      {
        name: 'Total Programs',
        value: programs.length,
        icon: BookOpenIcon,
        change: programs.filter(p => p.isActive).length,
        changeType: 'positive',
      },
      {
        name: 'Total Instructors',
        value: instructors.length,
        icon: AcademicCapIcon,
        change: instructors.filter(i => i.isActive).length,
        changeType: 'positive',
      },
      {
        name: 'Active Benefits',
        value: benefits.filter(b => b.isActive).length,
        icon: HeartIcon,
        change: benefits.length,
        changeType: 'neutral',
      },
      {
        name: 'Published FAQs',
        value: faqs.filter(f => f.isActive).length,
        icon: QuestionMarkCircleIcon,
        change: faqs.length,
        changeType: 'neutral',
      },
    ]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage content and monitor system status</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getStats().map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Icon className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {stat.name}
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {stat.value}
                              </div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <span className="sr-only">
                                  {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                                </span>
                                Active: {stat.change}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {tabs.slice(1, -1).map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
                      >
                        <Icon className="h-8 w-8 text-yellow-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700">{tab.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && <ProgramsManager isActive={true} />}
          {activeTab === 'instructors' && <InstructorsManager isActive={true} />}
          {activeTab === 'benefits' && <BenefitsManager isActive={true} />}
          {activeTab === 'faqs' && <FAQsManager isActive={true} />}
          {activeTab === 'testimonials' && <TestimonialsManager isActive={true} />}
          {activeTab === 'gallery' && <GalleryManager />}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Portal Status</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Auto-refresh every 5 minutes
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Portal Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commit Hash
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {portalData.map((portal, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {portal.portalName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              portal.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : portal.status === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {portal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                            {portal.commitHash}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(portal.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
