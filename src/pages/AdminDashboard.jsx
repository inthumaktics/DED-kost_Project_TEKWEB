import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardComponent from '@/components/admin/AdminDashboard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }
    
    // Load initial data from localStorage or use default
    const savedKosts = localStorage.getItem('adminKosts');
    if (savedKosts) {
      setKosts(JSON.parse(savedKosts));
    } else {
      // Default data jika belum ada
      const defaultKosts = [
        {
          id: 1,
          name: "Kost Putri Melati Indah",
          location: "Jakarta Selatan",
          price: 1500000,
          description: "Kost eksklusif untuk putri dengan fasilitas lengkap",
          facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Laundry"],
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 2,
          name: "Kost Putra Mawar Residence",
          location: "Jakarta Timur",
          price: 1200000,
          description: "Kost nyaman untuk mahasiswa",
          facilities: ["WiFi", "Fan", "Shared Bathroom", "Kitchen"],
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
      ];
      setKosts(defaultKosts);
      localStorage.setItem('adminKosts', JSON.stringify(defaultKosts));
    }
    setLoading(false);
  }, [navigate]);

  const handleAddKost = (newKost) => {
    const updatedKosts = [...kosts, newKost];
    setKosts(updatedKosts);
    localStorage.setItem('adminKosts', JSON.stringify(updatedKosts));
  };

  const handleDeleteKost = (id) => {
    const updatedKosts = kosts.filter(kost => kost.id !== id);
    setKosts(updatedKosts);
    localStorage.setItem('adminKosts', JSON.stringify(updatedKosts));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboardComponent 
      kosts={kosts}
      onAddKost={handleAddKost}
      onDeleteKost={handleDeleteKost}
      onLogout={handleLogout}
    />
  );
};

export default AdminDashboard;