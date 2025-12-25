# DED-kost - Kost Finder Web Application

A dynamic web application for finding and managing kost (boarding house) accommodations, built with React + Vite.

## Features

### Public User Features
- View a list of available kost rooms
- View detailed kost information and facilities
- Rent a kost room via WhatsApp checkout button

### Admin Features
- Manage kost data (CRUD operations)
- Access admin dashboard
- Add new kost listings
- View and manage existing listings

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom UI components (inspired by Shadcn UI)
- **Routing**: React Router
- **Package Manager**: npm

## Project Structure

```
src/
├── components/
│   ├── public/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── Footer.jsx
│   ├── admin/
│   │   ├── AdminHeader.jsx
│   │   ├── FormData.jsx
│   │   └── DataTable.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       └── table.jsx
├── pages/
│   ├── Home.jsx
│   ├── Detail.jsx
│   └── AdminDashboard.jsx
├── hooks/
├── assets/
├── lib/
│   └── utils.js
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd ded-kost
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Routes

- `/` - Home page (Public catalog)
- `/detail-produk/:id` - Kost detail page
- `/admin` - Admin dashboard
- `/admin/edit/:id` - Admin edit kost page

## Current Status

This is **Checkpoint 2 COMPLETE** - Navigation & UI Aesthetics with Professional Styling. The application now features:

### ✅ Visual & Styling Fixes Applied
- **Tailwind CSS** properly configured and working
- **Shadcn UI components** fully integrated and styled
- **Professional startup design** with Electric Violet (#8b5cf6) primary color
- **Modern card layouts** with shadows, rounded corners, and hover effects
- **Responsive grid system** working across all screen sizes
- **Professional navigation** with sticky header and smooth transitions
- **Beautiful hero section** with gradient backgrounds and animations
- **Admin dashboard** with stats cards and professional table design

### ✅ Implemented Features (Checkpoint 2)
- **Client-side routing** with React Router DOM
- **Dynamic routes** with URL parameters
- **Shadcn UI components** integration:
  - Card components for kost listings (with shadows and modern styling)
  - Badge components for facilities (properly styled)
  - Input components for forms (with focus states)
  - Dialog component for delete confirmation (modal overlay)
  - Table component for admin data display (professional dashboard look)
- **Responsive grid layout** using Tailwind CSS
- **Professional navigation** between pages
- **Admin edit functionality** with pre-filled forms

### ✅ Previous Features (Checkpoint 1)
- Clean folder structure
- Public catalog UI
- Admin dashboard UI
- Responsive design
- Console logging for button interactions

### 🎨 UI Components Styled
- **Public Side**: Modern cards with gradients, professional badges, WhatsApp integration
- **Admin Side**: Dashboard with stats cards, professional table, styled forms
- **Navigation**: Sticky navbar with logo, smooth hover effects
- **Footer**: Multi-column layout with contact information

### 🎯 Visual Verification Checklist ✅
- ✅ Tailwind styles visible in browser
- ✅ Cards look like modern cards (shadows, rounded corners)
- ✅ Grid layout responsive on all screen sizes
- ✅ Buttons styled with hover effects and proper colors
- ✅ Admin table looks like a professional dashboard
- ✅ Dialog modal appears correctly with overlay
- ✅ Website looks like a modern startup product

### Next Steps (Future Checkpoints)
- Integration with MockAPI for CRUD operations
- Real data management
- Enhanced UI/UX features
- User authentication
- Image upload functionality

## Design

The application features a **Trustworthy & Professional Startup Design** with:
- **Primary Color**: Electric Violet (#8b5cf6)
- **Secondary Color**: Light Grey (#f1f5f9)
- **Accent Color**: Lime Green (#84cc16)
- Clean and modern visual style
- Bold typography
- Fully responsive design (mobile-first)

## License

This project is for educational purposes.