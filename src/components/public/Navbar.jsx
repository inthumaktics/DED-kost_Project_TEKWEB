import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

{/* Logo Navbar DED-kost*/}
<div className="flex-shrink-0">
  <Link to="/">
    <img
      src="src/assets/logo_navbar.png"
      alt="DED-kost Logo"
      className="h-12"/>
  </Link>
</div>

{/* Menu Navigasi Bar*/}
<div className="hidden md:block">
  <div className="ml-10 flex items-center space-x-2">

    {/* Main Menu */}
    {["Home", "Explore", "Promotions", "About"].map((item) => (
      <Link
        key={item}
        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
        className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
        {item}
      </Link>
    ))}

    {/* Spacer */}
    <div className="w-6" />

    {/* Auth Section */}
    <Link
      to="/signup"
      className="text-primary border border-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-200">
      Sign Up
    </Link>

    {/* Login Dropdown */}
    <div className="relative">
      <button
        onClick={() => setIsLoginOpen(!isLoginOpen)}
        className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
          Login
        </button>

      {isLoginOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl">
            User Login
          </Link>

          <Link
            to="/admin"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-xl">
            Admin Login
          </Link>
        </div>
      )}
    </div>
  </div>
</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;