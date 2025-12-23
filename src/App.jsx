// App.jsx - Konfigurasi routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home'; // Anggota A akan buat
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditPage from './pages/admin/AdminEditPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailProduct />} /> {/* Anggota A */}
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminEditPage />} />
        
        {/* Redirect default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;