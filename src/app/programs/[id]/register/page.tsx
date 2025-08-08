'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { mockPrograms } from '@/lib/data'

interface ProgramRegisterPageProps {
  params: {
    id: string
  }
}

// Validation schema
const registrationSchema = Yup.object({
  // Student Information
  studentName: Yup.string()
    .required('Nama siswa harus diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  studentBirthDate: Yup.date()
    .required('Tanggal lahir harus diisi')
    .max(new Date(), 'Tanggal lahir tidak boleh di masa depan'),
  studentGender: Yup.string()
    .required('Jenis kelamin harus dipilih')
    .oneOf(['male', 'female'], 'Jenis kelamin tidak valid'),
  
  // Parent Information
  parentName: Yup.string()
    .required('Nama orang tua harus diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  parentEmail: Yup.string()
    .email('Format email tidak valid')
    .required('Email harus diisi'),
  parentPhone: Yup.string()
    .required('Nomor telepon harus diisi')
    .matches(/^[0-9]{10,13}$/, 'Nomor telepon harus 10-13 digit'),
  
  // Address
  address: Yup.string()
    .required('Alamat harus diisi')
    .min(10, 'Alamat minimal 10 karakter')
    .max(500, 'Alamat maksimal 500 karakter'),
  
  // Program Preferences
  subsidyOption: Yup.string()
    .required('Pilih opsi pembayaran'),
  
  // Additional Information
  medicalCondition: Yup.string()
    .max(500, 'Informasi medis maksimal 500 karakter'),
  previousEducation: Yup.string()
    .max(200, 'Riwayat pendidikan maksimal 200 karakter'),
  specialNeeds: Yup.string()
    .max(500, 'Kebutuhan khusus maksimal 500 karakter'),
  
  // Agreement
  agreement: Yup.boolean()
    .oneOf([true], 'Anda harus menyetujui syarat dan ketentuan'),
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProgramRegisterPage({ params }: ProgramRegisterPageProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const program = mockPrograms.find(p => p.id === params.id)

  if (!program) {
    notFound()
  }

  const initialValues = {
    // Student Information
    studentName: '',
    studentBirthDate: '',
    studentGender: '',
    
    // Parent Information
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    
    // Address
    address: '',
    
    // Program Preferences
    subsidyOption: program.price.spp.subsidy.length > 0 ? `subsidy_${program.price.spp.subsidy[0]}` : 'regular',
    
    // Additional Information
    medicalCondition: '',
    previousEducation: '',
    specialNeeds: '',
    
    // Agreement
    agreement: false,
  }

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real implementation, you would send data to your API
      console.log('Registration data:', {
        ...values,
        programId: program.id,
        programName: program.name,
      })
      
      setSubmitSuccess(true)
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push(`/programs/${program.id}/register/success`)
      }, 2000)
      
    } catch (error) {
      console.error('Registration error:', error)
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSubsidyOptions = () => {
    const options = []
    
    // Regular option
    options.push({
      value: 'regular',
      label: `Reguler - ${formatPrice(program.price.monthly)}`,
      price: program.price.monthly
    })
    
    // Subsidy options
    program.price.spp.subsidy.forEach((subsidyPrice, index) => {
      options.push({
        value: `subsidy_${subsidyPrice}`,
        label: `Subsidi ${index + 1} - ${formatPrice(subsidyPrice)}`,
        price: subsidyPrice
      })
    })
    
    return options
  }

  if (submitSuccess) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
              <div>
                <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Pendaftaran Berhasil!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Terima kasih telah mendaftar di program {program.name}. 
                  Tim kami akan segera menghubungi Anda untuk konfirmasi.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-6">
              <Link 
                href={`/programs/${program.id}`}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Kembali ke Detail Program
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Daftar Program <span className="gradient-text">{program.name}</span>
              </h1>
              <p className="mt-4 text-lg leading-6 text-gray-600">
                Lengkapi formulir di bawah ini untuk mendaftarkan buah hati Anda
              </p>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Formik
              initialValues={initialValues}
              validationSchema={registrationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting: formikSubmitting }) => (
                <Form className="space-y-8">
                  {/* Program Summary */}
                  <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Ringkasan Program</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Program</p>
                        <p className="font-semibold text-gray-900">{program.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Usia</p>
                        <p className="font-semibold text-gray-900">{program.ageGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Durasi</p>
                        <p className="font-semibold text-gray-900">{program.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-primary-600" />
                      Informasi Siswa
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Lengkap Siswa <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="studentName"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="Masukkan nama lengkap siswa"
                        />
                        <ErrorMessage name="studentName" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="date"
                          name="studentBirthDate"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        />
                        <ErrorMessage name="studentBirthDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="studentGender"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        >
                          <option value="">Pilih jenis kelamin</option>
                          <option value="male">Laki-laki</option>
                          <option value="female">Perempuan</option>
                        </Field>
                        <ErrorMessage name="studentGender" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-primary-600" />
                      Informasi Orang Tua / Wali
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Lengkap Orang Tua / Wali <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="parentName"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="Masukkan nama lengkap orang tua/wali"
                        />
                        <ErrorMessage name="parentName" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="email"
                          name="parentEmail"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="contoh@email.com"
                        />
                        <ErrorMessage name="parentEmail" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nomor Telepon <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="tel"
                          name="parentPhone"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="081234567890"
                        />
                        <ErrorMessage name="parentPhone" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Alamat Lengkap <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="address"
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="Masukkan alamat lengkap"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Option */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
                      Pilihan Pembayaran SPP
                    </h3>
                    
                    <div className="space-y-3">
                      {getSubsidyOptions().map((option) => (
                        <label key={option.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <Field
                            type="radio"
                            name="subsidyOption"
                            value={option.value}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{option.label}</p>
                            <p className="text-xs text-gray-500">
                              {option.value.startsWith('subsidy') ? 'Dengan program subsidi' : 'Pembayaran normal'}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage name="subsidyOption" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Additional Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      📝 Informasi Tambahan (Opsional)
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Riwayat Pendidikan Sebelumnya
                        </label>
                        <Field
                          type="text"
                          name="previousEducation"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="TK, Playgroup, dll."
                        />
                        <ErrorMessage name="previousEducation" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kondisi Medis / Alergi
                        </label>
                        <Field
                          as="textarea"
                          name="medicalCondition"
                          rows={2}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="Alergi makanan, kondisi khusus, dll."
                        />
                        <ErrorMessage name="medicalCondition" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kebutuhan Khusus
                        </label>
                        <Field
                          as="textarea"
                          name="specialNeeds"
                          rows={2}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                          placeholder="Kebutuhan belajar khusus, bantuan tambahan, dll."
                        />
                        <ErrorMessage name="specialNeeds" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="agreement"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Saya menyetujui syarat dan ketentuan</span> yang berlaku, 
                        termasuk kebijakan pembelajaran, pembayaran, dan aturan-aturan lainnya di 
                        Rumah Belajar Jannati. <span className="text-red-500">*</span>
                      </div>
                    </label>
                    <ErrorMessage name="agreement" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || formikSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isSubmitting || formikSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <CheckCircleIcon className="h-5 w-5" />
                          Daftar Sekarang
                        </>
                      )}
                    </button>
                    
                    <Link
                      href={`/programs/${program.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-8 py-3 text-lg font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-all duration-200"
                    >
                      Batal
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
