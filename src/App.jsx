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


function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kost/:id" element={<DetailKost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>

  );
}

export default App;