import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

const DataTable = ({ kosts, onDeleteKost, onEditKost }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    kostId: null,
    kostData: null,
  })

  const [editingKost, setEditingKost] = useState(null)
  const [editModal, setEditModal] = useState(false)

  // Fungsi untuk mendapatkan gambar placeholder yang aman
  const getPlaceholderImage = (size = 48, text = "No+Image") => {
    // Pilihan placeholder yang berbeda
    const placeholders = [
      // Using SVG Data URL (always works, no external request)
      `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <rect width="${size}" height="${size}" fill="#f3f4f6"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/6}" 
                fill="#9ca3af" text-anchor="middle" dy=".3em">${text}</text>
        </svg>
      `)}`,
      
      // Using picsum.photos (alternative service)
      `https://picsum.photos/${size}/${size}?grayscale&blur=2`,
      
      // Using dummyimage.com (another alternative)
      `https://dummyimage.com/${size}x${size}/f3f4f6/9ca3af&text=${text}`,
    ];
    
    return placeholders[0]; // Gunakan SVG Data URL yang paling reliable
  }

  // Fungsi untuk mendapatkan URL gambar dengan fallback
  const getSafeImageUrl = (imageUrl, size = 48) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return getPlaceholderImage(size, "No+Image");
    }
    
    // Jika gambar dari placeholder.com, ganti dengan alternatif
    if (imageUrl.includes('via.placeholder.com')) {
      return getPlaceholderImage(size, "Image");
    }
    
    return imageUrl;
  }

  const handleDeleteClick = (id) => {
    const kostToDelete = kosts.find(kost => kost.id === id)
    setDeleteModal({
      isOpen: true,
      kostId: id,
      kostData: kostToDelete,
    })
  }

  const handleEditClick = (kost) => {
    console.log('Edit clicked for:', kost)
    setEditingKost({
      ...kost,
      // Pastikan semua field ada
      name: kost.name || '',
      city: kost.city || '',
      address: kost.address || '',
      priceAfter: kost.priceAfter?.toString() || '',
      priceBefore: kost.priceBefore?.toString() || '',
      discount: kost.discount?.toString() || '',
      type: kost.type || 'Campur',
      facilities: Array.isArray(kost.facilities) 
        ? kost.facilities.join(', ') 
        : kost.facilities || '',
      image: kost.image || ''
    })
    setEditModal(true)
  }

  const handleConfirmDelete = () => {
    onDeleteKost(deleteModal.kostId)
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  const handleSaveEdit = (e) => {
    e?.preventDefault()
    console.log('Saving edit:', editingKost)
    
    if (!editingKost || !onEditKost) {
      console.error('Missing editingKost or onEditKost')
      return
    }

    // Format data untuk dikirim
    const formattedData = {
      ...editingKost,
      id: editingKost.id, // Pastikan ID ada
      priceAfter: Number(editingKost.priceAfter) || 0,
      priceBefore: Number(editingKost.priceBefore) || 0,
      discount: Number(editingKost.discount) || 0,
      facilities: typeof editingKost.facilities === 'string' 
        ? editingKost.facilities.split(',').map(f => f.trim()).filter(f => f !== '')
        : editingKost.facilities
    }

    console.log('Formatted data to save:', formattedData)
    
    // Panggil fungsi edit dari parent
    onEditKost(formattedData.id, formattedData)
    
    // Tutup modal
    setEditModal(false)
    setEditingKost(null)
  }

  // Format lokasi
  const formatLocation = (kost) => {
    return `${kost.city || ''}, ${kost.address || ''}`
  }

  // Handler untuk perubahan input
  const handleInputChange = (field, value) => {
    setEditingKost(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handler untuk error gambar
  const handleImageError = (e) => {
    console.log('Image error, using placeholder');
    e.target.onerror = null;
    e.target.src = getPlaceholderImage(48, "Error");
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <TableRow>
                <TableHead className="w-[200px] text-black-800 font-bold">Nama Kost</TableHead>
                <TableHead className="text-black-800 font-bold">Lokasi</TableHead>
                <TableHead className="text-black-800 font-bold">Harga</TableHead>
                <TableHead className="text-black-800 font-bold">Fasilitas</TableHead>
                <TableHead className="text-right text-black-800 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kosts.map((kost) => (
                <TableRow key={kost.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 relative">
                        <img
                          className="h-12 w-12 rounded-lg object-cover shadow-md"
                          src={getSafeImageUrl(kost.image, 48)}
                          alt={kost.name}
                          onError={handleImageError}
                        />
                        <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{kost.id}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {kost.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {kost.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="text-sm font-medium">{formatLocation(kost)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                      <div className="text-sm font-bold text-green-700">
                        Rp {kost.priceAfter?.toLocaleString() || '0'}
                      </div>
                      <span className="ml-1 text-xs text-green-600">/bulan</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {kost.facilities?.slice(0, 2).map((facility, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm"
                        >
                          {facility}
                        </span>
                      ))}
                      {kost.facilities && kost.facilities.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 shadow-sm">
                          +{kost.facilities.length - 2} lagi
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditClick(kost)}
                        className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteClick(kost.id)}
                        className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover:shake-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Hapus
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal Hapus */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-300">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg 
                    className="h-6 w-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.938 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                  <p className="text-sm text-white/80">Data akan dihapus permanen</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {deleteModal.kostData && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 mb-4 shadow-inner">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <img
                          className="h-12 w-12 rounded-lg object-cover shadow-lg"
                          src={getSafeImageUrl(deleteModal.kostData?.image, 48)}
                          alt={deleteModal.kostData?.name}
                          onError={handleImageError}
                        />
                        <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-bold text-gray-900">
                          {deleteModal.kostData?.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          </svg>
                          {formatLocation(deleteModal.kostData)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Harga:</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-bold rounded-full text-sm">
                          Rp {deleteModal.kostData?.priceAfter?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Fasilitas:</span>
                        <span className="text-sm text-gray-600">
                          {deleteModal.kostData?.facilities?.length || 0} fasilitas
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          Data akan dihapus permanen dari sistem dan tidak dapat dikembalikan.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-gray-600 text-sm font-medium">
                    Apakah Anda yakin ingin menghapus kost ini?
                  </p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Batalkan
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 border border-transparent rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Ya, Hapus Sekarang
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editModal && editingKost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Edit Kost</h3>
                  <p className="text-sm text-white/80">Perbarui informasi kost</p>
                </div>
                <button
                  onClick={() => setEditModal(false)}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSaveEdit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Kost */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Kost *
                    </label>
                    <input
                      type="text"
                      value={editingKost.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Masukkan nama kost"
                      required
                    />
                  </div>

                  {/* Kota */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota *
                    </label>
                    <input
                      type="text"
                      value={editingKost.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Jakarta"
                      required
                    />
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap *
                    </label>
                    <input
                      type="text"
                      value={editingKost.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jl. Nama Jalan No. X"
                      required
                    />
                  </div>

                  {/* Harga per Bulan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga per Bulan *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">Rp</span>
                      <input
                        type="number"
                        value={editingKost.priceAfter}
                        onChange={(e) => handleInputChange('priceAfter', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Harga Sebelum */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga Sebelum (opsional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">Rp</span>
                      <input
                        type="number"
                        value={editingKost.priceBefore}
                        onChange={(e) => handleInputChange('priceBefore', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Diskon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diskon (%) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={editingKost.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                        className="w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        required
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">%</span>
                    </div>
                  </div>

                  {/* Tipe Kost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipe Kost *
                    </label>
                    <select
                      value={editingKost.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Campur">Campur</option>
                      <option value="Putri">Putri</option>
                      <option value="Putra">Putra</option>
                    </select>
                  </div>

                  {/* Fasilitas */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fasilitas (pisahkan dengan koma) *
                    </label>
                    <input
                      type="text"
                      value={editingKost.facilities}
                      onChange={(e) => handleInputChange('facilities', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: WiFi, AC, Kamar Mandi Dalam"
                      required
                    />
                  </div>

                  {/* URL Gambar (opsional) */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Gambar (opsional)
                    </label>
                    <input
                      type="url"
                      value={editingKost.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/images.jpg"
                    />
                    
                    {/* Preview Gambar - SELALU DITAMPILKAN */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview Gambar
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={getSafeImageUrl(editingKost.image, 150)} 
                            alt="Preview" 
                            className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                            onError={handleImageError}
                          />
                          {editingKost.image && editingKost.image.includes('http') && (
                            <div className="absolute -top-2 -right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Preview gambar</p>
                          <p className="text-xs mt-1">
                            {editingKost.image && editingKost.image.includes('http')
                              ? "Gambar akan ditampilkan seperti ini" 
                              : "Masukkan URL gambar untuk menampilkan preview"}
                          </p>
                          {editingKost.image && editingKost.image.includes('http') && (
                            <a 
                              href={editingKost.image} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs mt-2 inline-flex items-center"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                              </svg>
                              Buka gambar di tab baru
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Batal
                  </div>
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Simpan Perubahan
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DataTable