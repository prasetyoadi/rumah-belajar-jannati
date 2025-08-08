# Gallery Images Setup

## Why Are Placeholder Images Being Used?

The gallery feature is currently using placeholder images because the images you shared in the conversation were not automatically saved to the project directory. To use your actual facility images, you need to manually add them to the project.

## How to Add Your Real Images

### Step 1: Save Your Images
1. Save all 9 facility images you shared earlier to your computer
2. Rename them with descriptive names (recommended names below)

### Step 2: Add Images to Project
1. Copy the images to the `public/gallery/` directory in your project
2. Use these recommended filenames:

```
public/gallery/
├── islamic-art-wall.jpg          # Islamic calligraphy and motivational posters
├── playground-equipment.jpg      # Wooden playground with climbing frames
├── learning-environment.jpg      # Classroom with Arabic alphabet charts
├── main-classroom.jpg           # Spacious classroom with colorful furniture
├── interactive-classroom.jpg    # Secondary classroom with child-sized tables
├── jannati-playground.jpg       # Premium wooden playground set
├── multi-level-classroom.jpg    # Two-story learning environment
├── upper-level-classroom.jpg    # Upper level classroom space
└── complete-facility.jpg        # Overview of complete facility
```

### Step 3: Update API to Use Local Images
After adding the images, update the `src/app/api/gallery/route.ts` file to use local image paths instead of placeholder URLs:

Change from:
```javascript
imageUrl: 'https://via.placeholder.com/400x300/16a34a/ffffff?text=Islamic+Art'
```

To:
```javascript
imageUrl: '/gallery/islamic-art-wall.jpg'
```

### Step 4: Alternative - Use Admin Panel
You can also:
1. Go to the admin panel at `http://localhost:3000/admin`
2. Click on the "Gallery" tab
3. Edit each gallery item to update the image URL to your uploaded images
4. Or add new gallery items with your own images

## Current Gallery Structure

The gallery currently has 9 items with these categories:
- **Classroom** (5 items): Various classroom and learning spaces
- **Playground** (2 items): Outdoor play equipment and areas
- **Facility** (2 items): General facility views and Islamic decorations

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 800x600 pixels or higher
- **Aspect Ratio**: 4:3 or 16:9 work best
- **File Size**: Keep under 2MB for optimal loading

## Testing

After adding your images:
1. Restart the development server: `npm run dev`
2. Visit `http://localhost:3000/gallery` to see your images
3. Test the admin panel gallery management at `http://localhost:3000/admin`

## Need Help?

If you need assistance with:
- Uploading images
- Resizing images
- Updating the API routes
- Adding new gallery categories

Just let me know!
