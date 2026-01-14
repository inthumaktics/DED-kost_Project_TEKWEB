import { Link } from "react-router-dom";
import logoFooter from "@/assets/logo/logo_footer.png";

const Footer = () => {
  const menuItems = ["Home", "Explore", "Promotions", "About"];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand / Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={logoFooter}
                alt="DED-kost Logo"
                className="h-10 mr-3"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              DED-kost adalah platform pencarian kost yang membantu mahasiswa dan
              pekerja menemukan tempat tinggal yang nyaman, aman, dan sesuai
              kebutuhan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}

              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 dedkost@gmail.com</li>
              <li>📱 +62 831-1316-5020</li>
              <li>📍 Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DED-kost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
