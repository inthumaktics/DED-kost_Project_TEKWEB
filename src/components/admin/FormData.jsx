import { useState } from 'react'

const FormData = ({ onAddKost }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    facilities: '',
    image: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newKost = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      price: parseInt(formData.price),
      description: formData.description,
      facilities: formData.facilities.split(',').map(f => f.trim()),
      image: formData.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
    
    onAddKost(newKost)
    setFormData({
      name: '',
      location: '',
      price: '',
      description: '',
      facilities: '',
      image: ''
    })
    
    alert('Kost berhasil ditambahkan!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Kost Baru</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Nama Kost</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nama Kost"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Lokasi</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Lokasi Kost"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Harga per Bulan</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Contoh: 1500000"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Deskripsi lengkap kost"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Fasilitas (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Contoh: WiFi, AC, Kamar Mandi Dalam"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">URL Gambar (opsional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tambah Kost
        </button>
      </form>
    </div>
  )
}

export default FormData