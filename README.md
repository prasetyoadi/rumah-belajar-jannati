# Rumah Belajar Jannati Website

A comprehensive Next.js website for Rumah Belajar Jannati, an Islamic learning center offering Quranic education and various courses based on Al-Quran and Sunnah.

## 🌟 Features

### Public Website
- **Homepage**: Hero section, benefits, programs overview, testimonials, and contact information
- **Programs Page**: Detailed view of all available programs with pricing and curriculum
- **About Page**: Vision, mission, values, and history of the institution
- **FAQ Page**: Interactive accordion with frequently asked questions
- **Contact Information**: Multiple contact methods and location details

### Admin Panel
- **Dashboard Overview**: Statistics and key metrics
- **Programs Management**: Full CRUD operations for educational programs
- **Portal Monitoring**: Real-time status monitoring of multiple portals with auto-refresh
- **Content Management**: Manage all website content dynamically

### Portal Monitoring Features
- Fetches commit hashes from portal endpoints
- Supports both API endpoints (JSON) and React apps (**NEXT_DATA**)
- Displays real-time status of multiple portals
- Auto-refresh functionality every 5 minutes
- CORS support for development environments

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Heroicons React
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📋 Available Programs

1. **Quranic Pre School** (Ages 3-6)
   - Comprehensive early childhood Islamic education
   - Curriculum: Praktik Ibadah, Fiqih, Hadist, Tahsin, Tahfidz, etc.

2. **TPA Kids** (Ages 6-12)
   - Taman Pendidikan Al-Quran for children
   - Focus on Quran reading and Islamic studies

3. **Tahsin Ummahat** (Adults)
   - Quran recitation improvement for mothers
   - Makharijul Huruf and Tajweed focus

4. **Various Courses**
   - Arabic Language Course
   - English Language Course
   - Mathematics Course
   - Tahfidz Course
   - Calistung Course (Reading, Writing, Counting)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rumah-belajar-jannati
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin panel
│   ├── programs/       # Programs listing page
│   ├── about/          # About page
│   ├── faq/            # FAQ page
│   └── api/            # API routes
├── components/         # Reusable React components
├── lib/               # Utility functions and data
├── types/             # TypeScript type definitions
└── globals.css        # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Yellow/Gold theme (`primary-*`)
- **Secondary**: Gray scale (`gray-*`)
- **Success**: Green for positive actions
- **Error**: Red for warnings and errors

### Typography
- **Main Font**: Inter (sans-serif)
- **Arabic Font**: Amiri (serif)
- **Responsive**: Mobile-first approach

## 🔧 API Routes

### Programs API (`/api/programs`)
- `GET`: Fetch all programs
- `POST`: Create new program
- `PUT`: Update existing program
- `DELETE`: Delete program

### Portal Data API (`/api/portal-data`)
- `GET`: Fetch portal monitoring data
- Auto-refresh every 5 minutes
- CORS enabled for development

## 👤 Admin Panel

Access the admin panel at `/admin` to manage:
- Programs (CRUD operations)
- Portal monitoring dashboard
- Content statistics and overview

## 📱 Features Highlights

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### SEO Optimized
- Proper meta tags and descriptions
- Open Graph support
- Semantic HTML structure

### Performance
- Next.js optimizations
- Lazy loading
- Optimized images and assets

### Accessibility
- Screen reader compatible
- Keyboard navigation
- High contrast ratios

## 🎯 Programs Offered

### Quranic Pre School & TPA
- **Age Groups**: 3-6 years (Pre School), 6-12 years (TPA)
- **Schedule**: Monday-Friday, flexible timing
- **SPP Subsidy Available**: Rp. 50,000 - Rp. 100,000/month

### Adult Courses
- **Tahsin Ummahat**: Quran recitation improvement
- **Arabic Course**: Language learning from basic to advanced
- **English Course**: Comprehensive English program

### Additional Programs
- **Mathematics Course**: Academic support
- **Tahfidz Course**: Quran memorization
- **Calistung**: Reading, writing, counting for ages 4-7

## 📞 Contact Information

- **Phone/WhatsApp**: +62 812 8171 1875
- **Instagram**: @rumahbelajarjannati
- **Address**: Jl. Amaliyah No. 62 A RT 3 RW 01, Srengseng Sawah, Jagakarsa, Jakarta Selatan

## 🕒 Operating Hours

- **Monday - Friday**: 08:00 - 17:00
- **Saturday**: 08:00 - 15:00
- **Sunday**: 09:00 - 12:00
- **National Holidays**: Closed

## 🤝 Contributing

This project is built for Rumah Belajar Jannati. For any modifications or improvements, please contact the development team.

## 📄 License

This project is proprietary and created specifically for Rumah Belajar Jannati.

---

Built with ❤️ for quality Islamic education using Next.js 15, TypeScript, and Tailwind CSS.
