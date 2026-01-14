# DED-Kost - Kost Finder Web Application

DED-Kost is a web application for finding and managing kost (boarding house) accommodations in Indonesia.  
Built with React + Vite and styled using Tailwind CSS and Shadcn UI.

---

FEATURES

Public User:
- Browse kost listings
- View kost details and facilities
- Search by location or name
- View promotions
- Book via WhatsApp
- Responsive design

Admin:
- Login from the same login page
- Access protected admin dashboard
- Add new kost data
- Delete kost data
- Manage listings using localStorage

---

TECH STACK

- React
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- LocalStorage
- GitHub Pages / Vercel

---

PROJECT STRUCTURE

src/
assets/
components/
  layout/
  admin/
  ui/
data/
pages/
  Home.jsx
  Explore.jsx
  Promotions.jsx
  DetailKost.jsx
  Login.jsx
  Signup.jsx
  AdminDashboard.jsx
App.jsx
main.jsx

---

GETTING STARTED

Requirements:
- Node.js v16+
- npm

Installation:

git clone https://github.com/your-username/DED-kost_Project_TEKWEB.git  
cd DED-kost_Project_TEKWEB  
npm install  
npm run dev  

Open in browser:
http://localhost:5173

---

ADMIN LOGIN (DEMO)

Email: admin@dedkost.com  
Password: admin123  

---

ROUTES

/                -> Home  
/explore         -> Explore kost  
/promotions      -> Promotions  
/kost/:id        -> Kost detail  
/about           -> About  
/login           -> Login (User & Admin)  
/signup          -> Signup  
/admin/dashboard -> Admin dashboard  

---

BUILD FOR PRODUCTION

npm run build

---

CURRENT STATUS (CHECKPOINT 3)

- SPA routing with React Router  
- Modern responsive UI  
- Shadcn UI integration  
- Admin authentication  
- Protected admin routes  
- WhatsApp booking  
- Search and filter  
- Promotions system  
- Data stored in localStorage  

---

DEPLOYMENT NOTE

For Vercel:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

---

DESIGN CONCEPT

Primary color: Electric Violet  
Style: Modern and professional  
UX: Simple and user-friendly  
Mobile-first design  

---

LICENSE

This project is for educational purposes only.
