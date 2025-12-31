import { useState } from 'react'
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"

const FormData = ({ onAddKost }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    address: '',
    type: 'Campur',
    price: '',
    priceBefore: '',
    discount: 0,
    description: '',
    facilities: '',
    image: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const price = parseInt(formData.price) || 0;
    const priceBefore = formData.priceBefore ? parseInt(formData.priceBefore) : Math.round(price * 1.2);
    const discount = parseInt(formData.discount) || 0;
    
    const newKost = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      city: formData.city || formData.location,
      address: formData.address,
      type: formData.type,
      price: price,
      priceBefore: priceBefore,
      priceAfter: price,
      discount: discount,
      description: formData.description,
      facilities: formData.facilities.split(',').map(f => f.trim()),
      image: formData.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString()
    }
    
    onAddKost(newKost)
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      city: '',
      address: '',
      type: 'Campur',
      price: '',
      priceBefore: '',
      discount: 0,
      description: '',
      facilities: '',
      image: ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border">      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Nama Kost *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Nama Kost"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Lokasi *</label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Lokasi Kost (Contoh: Jakarta)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Kota</label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full"
              placeholder="Kota (Contoh: Jakarta Selatan)"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Tipe Kost *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Putri">Putri</option>
              <option value="Putra">Putra</option>
              <option value="Campur">Campur</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Alamat Lengkap</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full"
            placeholder="Alamat lengkap kost"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Harga per Bulan *</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Contoh: 1500000"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Harga Sebelum Diskon</label>
            <Input
              type="number"
              name="priceBefore"
              value={formData.priceBefore}
              onChange={handleChange}
              className="w-full"
              placeholder="Harga asli (optional)"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Diskon (%)</label>
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full"
              placeholder="Contoh: 20"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Deskripsi *</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full"
            placeholder="Deskripsi lengkap kost"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Fasilitas (pisahkan dengan koma) *
          </label>
          <Input
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Contoh: WiFi, AC, Kamar Mandi Dalam"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">URL Gambar (opsional)</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full"
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