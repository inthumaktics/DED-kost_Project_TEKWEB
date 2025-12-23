// AdminEditPage.jsx - Halaman edit data
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminEditPage = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  // Simulasi fetch data berdasarkan ID
  useEffect(() => {
    // Data dummy (nanti akan diganti dengan API)
    const dummyData = [
      { id: 1, name: "Sony Headphones", category: "Elektronik", price: 5000000, description: "Noise cancelling" },
      { id: 2, name: "MacBook Air", category: "Laptop", price: 15000000, description: "M1 Chip" },
    ];
    
    const item = dummyData.find(item => item.id === parseInt(id));
    if (item) {
      setFormData(item);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Update data:', formData);
    // Redirect kembali ke dashboard
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Edit Data (ID: {id})</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminEditPage;