import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // === ADMIN LOGIN ===
    if (email === "admin@dedkost.com" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      console.log("Login sebagai Admin");
      navigate("/admin/dashboard");
      return;
    }

    // === USER LOGIN (SIMULASI) ===
    if (email && password) {
      console.log("Login sebagai User");
      navigate("/");
      return;
    }

    // === ERROR ===
    setError("Email atau password tidak valid!");
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

          {/* INFO ADMIN */}
          <p className="text-xs text-center text-gray-400 mt-4">
            *Admin login demo: <br />
            <span className="font-medium">
              admin@dedkost.com / admin123
            </span>
          </p>

          {/* SIGN UP LINK */}
          <p className="text-sm text-center text-gray-600 mt-8">
            Don’t have an account?{" "}
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
