import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Promotion from "./pages/Promotions";
import AboutUs from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DetailKost from "./pages/DetailKost";

import { kostDiscountData } from "@/data/kostDiscountData";

function App() {

  // STATE DATA KOST
  const [kosts, setKosts] = useState(() => {
    const savedKosts = localStorage.getItem("kostData");
    return savedKosts ? JSON.parse(savedKosts) : kostDiscountData;
  });

  // Simpan kost ke localStorage
  useEffect(() => {
    localStorage.setItem("kostData", JSON.stringify(kosts));
  }, [kosts]);

  // ADMIN ACTIONS
  const handleAddKost = (newKost) => {
    const kostWithId = {
      ...newKost,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setKosts([...kosts, kostWithId]);
    alert("Kost berhasil ditambahkan!");
  };

  const handleDeleteKost = (id) => {
    setKosts(kosts.filter((kost) => kost.id !== id));
    alert("Kost berhasil dihapus!");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/login"; // force refresh
  };

// ROUTES
  return (
    <div className="App min-h-screen bg-gray-50">
      <Routes>
        {/* ===== USER PAGES ===== */}
        <Route path="/" element={<Home kosts={kosts} />} />
        <Route path="/kost/:id" element={<DetailKost kosts={kosts} />} />
        <Route path="/explore" element={<Explore kosts={kosts} />} />
        <Route
          path="/promotions"
          element={
            <Promotion kosts={kosts.filter((k) => k.discount > 0)} />
          }
        />
        <Route path="/about" element={<AboutUs />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ===== ADMIN DASHBOARD (PROTECTED) ===== */}
        <Route
          path="/admin/dashboard"
          element={
            localStorage.getItem("isAdminLoggedIn") === "true" ? (
              <AdminDashboard
                kosts={kosts}
                onAddKost={handleAddKost}
                onDeleteKost={handleDeleteKost}
                onLogout={handleAdminLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
