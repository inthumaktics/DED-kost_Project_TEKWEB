import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Import AdminCard khusus untuk admin
import {
  AdminCard,
  AdminCardContent,
  AdminCardHeader,
  AdminCardTitle,
} from "@/components/admin/AdminCard";

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Credentials admin sederhana (untuk demo)
    if (
      formData.email === "admin@ded-kost.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
      
      // TAMBAHKAN PEMANGGILAN onLogin JIKA ADA
      if (onLogin) {
        onLogin();
      }
      
      navigate("/admin/dashboard");
    } else {
      setError("Email atau password salah!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Masuk untuk mengelola data kost
            </p>
          </div>

          {/* Ganti Card biasa dengan AdminCard */}
          <AdminCard className="shadow-lg-">
            <AdminCardHeader>
              <AdminCardTitle className="text-center text-purple-800">
                Login ke Dashboard Admin
              </AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="admin@ded-kost.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Untuk demo gunakan:</p>
                  <p>Email: admin@ded-kost.com</p>
                  <p>Password: admin123</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Login sebagai Admin
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Kembali ke Halaman Utama
                  </button>
                </div>
              </form>
            </AdminCardContent>
          </AdminCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;