# Rumah Belajar Jannati - Implementation Documentation

## Overview
This is a comprehensive Next.js website for Rumah Belajar Jannati (Islamic Learning Center) with integrated admin panel and state management using Zustand.

## Technology Stack
- **Next.js 14.2.5** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Heroicons** for icons
- **React 19** with modern hooks

## Project Structure

### State Management (Zustand)
```
src/store/
├── useAdminStore.ts    # Main Zustand store for all content management
└── index.ts           # Store exports
```

**Features:**
- Persistent state with local storage
- DevTools integration
- Comprehensive CRUD operations
- Automatic API integration
- Loading states management

### API Routes
```
src/app/api/
├── programs/route.ts       # Programs CRUD API
├── instructors/route.ts    # Instructors CRUD API
├── benefits/route.ts      # Benefits CRUD API
├── faqs/route.ts          # FAQs CRUD API
├── testimonials/route.ts  # Testimonials CRUD API
├── heroes/route.ts        # Heroes CRUD API (for future use)
└── portal-data/route.ts   # Portal monitoring API
```

### Admin Components
```
src/components/admin/
├── ProgramsManager.tsx     # CRUD interface for programs
├── InstructorsManager.tsx  # CRUD interface for instructors
├── BenefitsManager.tsx     # CRUD interface for benefits
├── FAQsManager.tsx         # CRUD interface for FAQs
└── TestimonialsManager.tsx # CRUD interface for testimonials
```

### Frontend Components (Updated to use Zustand)
```
src/components/
├── BenefitsSection.tsx     # Dynamic benefits from API
├── ProgramsSection.tsx     # Dynamic programs from API
├── TestimonialsSection.tsx # Dynamic testimonials from API
└── ... (other components)
```

## Key Features Implemented

### 1. Zustand State Management
- **Global store** for all content types
- **Automatic persistence** in localStorage
- **DevTools support** for debugging
- **Optimistic updates** for better UX
- **Error handling** and loading states

### 2. Comprehensive CRUD Operations
**Available for:**
- ✅ Programs (courses, TPA, preschool)
- ✅ Instructors (teachers and staff)
- ✅ Benefits (why choose us points)
- ✅ FAQs (frequently asked questions)
- ✅ Testimonials (parent reviews)

**Each CRUD includes:**
- Create new items
- Edit existing items
- Delete items with confirmation
- Toggle active/inactive status
- Sort by order/priority
- Category management (for FAQs)
- Rating system (for testimonials)

### 3. Admin Dashboard Features
- **Overview tab** with statistics
- **Quick actions** for easy navigation
- **Real-time data** from Zustand store
- **Portal monitoring** with auto-refresh
- **Responsive design** for mobile admin access

### 4. Dynamic Frontend
- **Homepage sections** auto-update from admin changes
- **Real-time content** without page refresh
- **Active content filtering** (only shows published items)
- **Proper ordering** and categorization

## API Endpoints

### Programs API
- `GET /api/programs` - List all programs
- `POST /api/programs` - Create new program
- `PUT /api/programs` - Update program
- `DELETE /api/programs?id={id}` - Delete program

### Instructors API
- `GET /api/instructors` - List all instructors
- `POST /api/instructors` - Create new instructor
- `PUT /api/instructors` - Update instructor
- `DELETE /api/instructors?id={id}` - Delete instructor

### Benefits API
- `GET /api/benefits` - List all benefits
- `POST /api/benefits` - Create new benefit
- `PUT /api/benefits` - Update benefit
- `DELETE /api/benefits?id={id}` - Delete benefit

### FAQs API
- `GET /api/faqs` - List all FAQs (sorted by order)
- `POST /api/faqs` - Create new FAQ
- `PUT /api/faqs` - Update FAQ
- `DELETE /api/faqs?id={id}` - Delete FAQ

### Testimonials API
- `GET /api/testimonials` - List active testimonials
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials` - Update testimonial
- `DELETE /api/testimonials?id={id}` - Delete testimonial

## Usage Guide

### Accessing Admin Panel
1. Navigate to `http://localhost:3000/admin`
2. Use the tab navigation to manage different content types
3. Each tab provides full CRUD functionality

### Managing Content

#### Programs
- Add new educational programs (Preschool, TPA, Courses)
- Set pricing structure (registration, books, monthly fees)
- Define age groups and schedules
- Manage curriculum details

#### Instructors
- Add teacher profiles with qualifications
- Include specializations and experience
- Upload photos and write biographies
- Manage active/inactive status

#### Benefits
- Create compelling reasons to choose the institution
- Set display order for homepage
- Choose appropriate icons
- Toggle visibility

#### FAQs
- Organize by categories (general, registration, programs, payment)
- Set display order
- Manage active/inactive status
- Provide comprehensive answers

#### Testimonials
- Add parent reviews and ratings
- Include photos and roles
- Star rating system (1-5 stars)
- Control visibility on homepage

### Zustand Store Usage

```typescript
import { useAdminStore } from '@/store/useAdminStore'

const Component = () => {
  const { 
    programs, 
    addProgram, 
    updateProgram, 
    deleteProgram,
    fetchPrograms 
  } = useAdminStore()
  
  // Use the store...
}
```

## Data Models

### Program
```typescript
interface Program {
  id: string
  name: string
  description: string
  type: 'preschool' | 'tpa' | 'course'
  ageGroup: string
  duration: string
  schedule: string[]
  price: {
    registration: number
    book: number
    monthly: number
    spp: {
      subsidy: number[]
      private: number
    }
  }
  curriculum: string[]
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Instructor
```typescript
interface Instructor {
  id: string
  name: string
  specialization: string
  qualifications: string[]
  experience: string
  image?: string
  bio: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Benefit
```typescript
interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}
```

### FAQ
```typescript
interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'registration' | 'programs' | 'payment'
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

## Development Workflow

### Adding New Content Type
1. Define TypeScript interface in `src/types/index.ts`
2. Create API route in `src/app/api/{content-type}/route.ts`
3. Add actions to Zustand store in `src/store/useAdminStore.ts`
4. Create admin manager component in `src/components/admin/`
5. Add tab to admin dashboard
6. Update frontend components to use the store

### Building and Deployment
```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Future Enhancements

### Planned Features
- [ ] User authentication for admin access
- [ ] Image upload functionality
- [ ] Email notifications for new inquiries
- [ ] Advanced analytics dashboard
- [ ] Content versioning and audit logs
- [ ] Multi-language support
- [ ] SEO optimization tools
- [ ] Social media integration

### Potential Improvements
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] File storage service (AWS S3/Cloudinary)
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Content scheduling
- [ ] Backup and restore functionality

## Security Considerations

### Current Implementation
- Input validation on API routes
- XSS prevention with proper escaping
- CORS configuration for portal monitoring

### Recommended Additions
- Authentication middleware
- Authorization checks
- Rate limiting
- Input sanitization
- HTTPS enforcement
- Environment variable protection

## Performance Optimizations

### Implemented
- Client-side state management with Zustand
- Component lazy loading
- Optimized build with Next.js
- Image optimization recommendations

### Potential Improvements
- Server-side caching
- CDN integration
- Database query optimization
- Progressive web app features
- Service worker implementation

## Maintenance

### Regular Tasks
- Monitor API performance
- Update dependencies
- Backup content data
- Review and update documentation
- Test admin functionalities

### Troubleshooting
- Check browser console for errors
- Verify API endpoints are responding
- Clear localStorage if needed
- Restart development server for changes
