import { Link } from "react-router-dom";
import { useState } from "react";
import logoNavbar from "@/assets/logo/logo_navbar.png";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Home", "Explore", "Promotions", "About"];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: Hamburger (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {/* Icon ☰ */}
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* CENTER: Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logoNavbar}
                alt="DED-kost Logo"
                className="h-12"
              />
            </Link>
          </div>

          {/* RIGHT: Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">

              {/* Main Menu */}
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary hover:bg-violet-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  {item}
                </Link>
              ))}

              {/* Spacer */}
              <div className="w-6" />

              {/* Auth */}
              <Link
                to="/signup"
                className="text-primary border border-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-200"
              >
                Sign Up
              </Link>

              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="text-gray-700 hover:text-primary hover:bg-violet-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Login
                </button>

                {isLoginOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-violet-100 rounded-xl shadow-lg z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 rounded-t-xl"
                    >
                      User Login
                    </Link>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-200 rounded-b-xl"
                    >
                      Admin Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">

            {menuItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-primary hover:bg-violet-100 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {item}
              </Link>
            ))}

            <hr />

            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-primary border border-primary px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-primary hover:text-white"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-violet-100 px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              User Login
            </Link>

            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-violet-100 px-4 py-2 rounded-lg text-sm font-medium text-center"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
