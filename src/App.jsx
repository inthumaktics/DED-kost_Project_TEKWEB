import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from "./pages/Explore";
import Promotion from './pages/Promotions';
import AboutUs from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DetailKost from './pages/DetailKost';
import { kostDiscountData } from '@/data/kostDiscountData';

function App() {
  // State untuk menyimpan semua data kost
  const [kosts, setKosts] = useState(() => {
    // Coba ambil dari localStorage terlebih dahulu
    const savedKosts = localStorage.getItem('kostData');
    if (savedKosts) {
      return JSON.parse(savedKosts);
    }
    // Jika belum ada, gunakan data dari kostDiscountData
    return kostDiscountData;
  });

  // State untuk autentikasi admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Simpan kosts ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('kostData', JSON.stringify(kosts));
  }, [kosts]);

  // Fungsi untuk menambah kost baru
  const handleAddKost = (newKost) => {
    const kostWithId = {
      ...newKost,
      id: Date.now(), // Generate ID unik
      createdAt: new Date().toISOString()
    };
    setKosts([...kosts, kostWithId]);
    alert('Kost berhasil ditambahkan!');
  };

  // Fungsi untuk menghapus kost
  const handleDeleteKost = (id) => {
    setKosts(kosts.filter(kost => kost.id !== id));
    alert('Kost berhasil dihapus!');
  };

  // Fungsi login admin
  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  // Fungsi logout admin
  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Routes>
        {/* Halaman User */}
        <Route path="/" element={<Home kosts={kosts} />} />
        <Route path="/kost/:id" element={<DetailKost kosts={kosts} />} />
        <Route path="/explore" element={<Explore kosts={kosts} />} />
        <Route path="/promotions" element={<Promotion kosts={kosts.filter(k => k.discount > 0)} />} />
        <Route path="/about" element={<AboutUs />} />
        
        {/* Halaman Admin */}
        <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
        <Route 
          path="/admin/dashboard" 
          element={
            isAdmin ? 
              <AdminDashboard 
                kosts={kosts}
                onAddKost={handleAddKost}
                onDeleteKost={handleDeleteKost}
                onLogout={handleAdminLogout}
              /> 
              : <AdminLogin onLogin={handleAdminLogin} />
          } 
        />
        <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;