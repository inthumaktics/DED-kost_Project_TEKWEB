import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login attempt:", { email, password });

  // === ADMIN LOGIN ===
    if (email === "admin@dedkost.com" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      console.log("Login sebagai Admin");
      // Gunakan window.location.href untuk redirect ke dashboard admin dengan base URL
      window.location.href = "/DED-kost_Project_TEKWEB/admin/dashboard";
      return; //tdk perlu
    }

    try {
      // === USER LOGIN DARI MOCKAPI ===
      console.log("Checking mockAPI for user...");
      const response = await fetch("https://694a982526e870772065fe69.mockapi.io/Users");
      
      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }
      
      const users = await response.json();
      console.log("Users from mockAPI:", users);
      
      // Cari user dengan email dan password yang sesuai
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );
      
      if (foundUser) {
        // Simpan data user ke localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userId", foundUser.id || "");
        localStorage.setItem("userName", foundUser.name || foundUser.email.split('@')[0]);
        localStorage.setItem("userEmail", foundUser.email);
        
        console.log("Login berhasil sebagai User:", foundUser.email);
        navigate("/");
      } else {
        setError("Email atau password tidak valid!");
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Login to continue exploring DED-Kost
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Login
            </button>
          </form>

          {/* INFO LOGIN */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-center text-gray-400">
              *Admin login: <br />
              <span className="font-medium">
                admin@dedkost.com / admin123
              </span>
            </p>
            
            <p className="text-xs text-center text-gray-400">
              *User login: <br />
              <span className="font-medium">
                john.doe@gmail.com / pass123
              </span>
            </p>
          
          </div>

          {/* SIGN UP LINK */}
          <p className="text-sm text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;