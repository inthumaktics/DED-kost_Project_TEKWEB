// src/hooks/useAdminData.js
import { useState, useEffect } from 'react';
import dummyKosts from '../data/dummyKosts';

const useAdminData = () => {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [bookings, setBookings] = useState([
    {
      id: "101",
      kostId: "1",
      kostName: "Kost Orange Tlogomas",
      customerName: "Andi Wijaya",
      customerPhone: "081234567890",
      customerEmail: "andi@email.com",
      status: "pending", 
      total: 850000,
      duration: 6, 
      startDate: "2025-12-25",
      endDate: "2026-06-25",
      paymentMethod: "transfer",
      notes: "Minta kamar lantai 2",
      createdAt: "2025-12-20T10:30:00Z"
    },
    {
      id: "102",
      kostId: "2",
      kostName: "Kost Putri Bunga Cempaka",
      customerName: "Budi Santoso",
      customerPhone: "081298765432",
      customerEmail: "budi@email.com",
      status: "confirmed",
      total: 2400000,
      duration: 12,
      startDate: "2025-12-20",
      endDate: "2026-12-20",
      paymentMethod: "cash",
      notes: "",
      createdAt: "2025-12-19T14:20:00Z"
    },
    {
      id: "103",
      kostId: "3",
      kostName: "Kost Campur Sejahtera",
      customerName: "Citra Dewi",
      customerPhone: "081233445566",
      customerEmail: "citra@email.com",
      status: "completed",
      total: 1950000,
      duration: 3,
      startDate: "2025-09-01",
      endDate: "2025-12-01",
      paymentMethod: "transfer",
      notes: "Sudah selesai masa sewa",
      createdAt: "2025-08-25T09:15:00Z"
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // CHECKPOINT 1: Gunakan data dummy
        // CHECKPOINT 2: Ganti dengan: const response = await axios.get('https://mockapi.io/kosts');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setKosts(dummyKosts);
        setError(null);
      } catch (err) {
        setError('Gagal mengambil data kost');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔧 CRUD Operations untuk Kost (Checkpoint 1: Simulasi)

  // CREATE: Tambah kost baru
  const addKost = async (newKost) => {
    setLoading(true);
    try {
      // Validasi data
      if (!newKost.name || !newKost.price) {
        throw new Error('Nama dan harga wajib diisi');
      }

      // Generate ID baru
      const newId = (Math.max(...kosts.map(k => parseInt(k.id)), 0) + 1).toString();
      
      const kostToAdd = {
        id: newId,
        ...newKost,
        createdAt: new Date().toISOString(),
        rating: newKost.rating || 4.0,
        available: newKost.available !== undefined ? newKost.available : true
      };

      // CHECKPOINT 1: Update state lokal
      // CHECKPOINT 2: Ganti dengan: await axios.post('https://mockapi.io/kosts', kostToAdd);
      setKosts(prev => [...prev, kostToAdd]);
      
      console.log('✅ Kost ditambahkan:', kostToAdd);
      return { 
        success: true, 
        data: kostToAdd,
        message: 'Kost berhasil ditambahkan' 
      };
    } catch (err) {
      const errorMsg = err.message || 'Gagal menambahkan kost';
      console.error('❌ Error addKost:', err);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Edit kost
  const updateKost = async (id, updatedData) => {
    setLoading(true);
    try {
      // CHECKPOINT 1: Update state lokal
      
      setKosts(prev => 
        prev.map(kost => 
          kost.id === id 
            ? { 
                ...kost, 
                ...updatedData,
                updatedAt: new Date().toISOString()
              } 
            : kost
        )
      );
      
      console.log(`✅ Kost ID ${id} diperbarui:`, updatedData);
      return { 
        success: true, 
        message: 'Kost berhasil diperbarui' 
      };
    } catch (err) {
      console.error('❌ Error updateKost:', err);
      return { 
        success: false, 
        error: 'Gagal memperbarui kost' 
      };
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Hapus kost
  const deleteKost = async (id) => {
    setLoading(true);
    try {
      // CHECKPOINT 1: Update state lokal
      
      setKosts(prev => prev.filter(kost => kost.id !== id));
      
      console.log(`✅ Kost ID ${id} dihapus`);
      return { 
        success: true, 
        message: 'Kost berhasil dihapus' 
      };
    } catch (err) {
      console.error('❌ Error deleteKost:', err);
      return { 
        success: false, 
        error: 'Gagal menghapus kost' 
      };
    } finally {
      setLoading(false);
    }
  };

  // READ: Ambil kost berdasarkan ID
  const getKostById = (id) => {
    return kosts.find(kost => kost.id === id) || null;
  };
  
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId 
            ? { 
                ...booking, 
                status: newStatus,
                updatedAt: new Date().toISOString()
              } 
            : booking
        )
      );
      
      console.log(`✅ Booking ${bookingId} status updated to ${newStatus}`);
      return { 
        success: true, 
        message: 'Status booking berhasil diperbarui' 
      };
    } catch (err) {
      console.error('❌ Error updateBookingStatus:', err);
      return { 
        success: false, 
        error: 'Gagal memperbarui status booking' 
      };
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      console.log(`✅ Booking ${bookingId} dihapus`);
      return { 
        success: true, 
        message: 'Booking berhasil dihapus' 
      };
    } catch (err) {
      console.error('❌ Error deleteBooking:', err);
      return { 
        success: false, 
        error: 'Gagal menghapus booking' 
      };
    }
  };

  const addBooking = async (newBooking) => {
    try {
      const bookingId = (Math.max(...bookings.map(b => parseInt(b.id)), 100) + 1).toString();
      const kost = getKostById(newBooking.kostId);
      
      const bookingToAdd = {
        id: bookingId,
        ...newBooking,
        kostName: kost ? kost.name : 'Unknown Kost',
        total: kost ? kost.price * (newBooking.duration || 1) : 0,
        createdAt: new Date().toISOString(),
        status: newBooking.status || 'pending'
      };

      setBookings(prev => [...prev, bookingToAdd]);
      console.log('✅ Booking ditambahkan:', bookingToAdd);
      
      return { 
        success: true, 
        data: bookingToAdd,
        message: 'Booking berhasil ditambahkan' 
      };
    } catch (err) {
      console.error('❌ Error addBooking:', err);
      return { 
        success: false, 
        error: 'Gagal menambahkan booking' 
      };
    }
  };

  
  const getStats = () => {
    const totalKosts = kosts.length;
    const availableKosts = kosts.filter(k => k.available).length;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const monthlyRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => sum + booking.total, 0);
    
    const kostByType = {
      Putra: kosts.filter(k => k.type === 'Putra').length,
      Putri: kosts.filter(k => k.type === 'Putri').length,
      Campur: kosts.filter(k => k.type === 'Campur').length
    };

    return {
      totalKosts,
      availableKosts,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      monthlyRevenue,
      kostByType,
      averageRating: kosts.length > 0 
        ? (kosts.reduce((sum, k) => sum + (k.rating || 0), 0) / kosts.length).toFixed(1)
        : 0
    };
  };

  const filterKosts = (criteria = {}) => {
    const { type, minPrice = 0, maxPrice = 5000000, available, search = '' } = criteria;
    
    return kosts.filter(kost => {
      // Filter by type
      if (type && kost.type !== type) return false;
      
      // Filter by price
      if (kost.price < minPrice || kost.price > maxPrice) return false;
      
      // Filter by availability
      if (available !== undefined && kost.available !== available) return false;
      
      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        const searchable = `${kost.name} ${kost.address} ${kost.description}`.toLowerCase();
        if (!searchable.includes(searchLower)) return false;
      }
      
      return true;
    });
  };

  const filterBookings = (status = '') => {
    if (!status) return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  const refreshData = () => {
    console.log('🔄 Refreshing admin data (Checkpoint 1 - dummy)');
    return { success: true, message: 'Data direfresh' };
  };

  // 📤 Export data (simulasi)
  const exportData = (type = 'kosts') => {
    const dataToExport = type === 'kosts' ? kosts : bookings;
    console.log(`📤 Exporting ${type} data:`, dataToExport);
    
    return { 
      success: true, 
      message: `Data ${type} siap diunduh`,
      data: dataToExport 
    };
  };

  return {
    kosts,
    bookings,
    loading,
    error,
    stats: getStats(),
    
    addKost,
    updateKost,
    deleteKost,
    getKostById,
    filterKosts,
    
    updateBookingStatus,
    deleteBooking,
    addBooking,
    filterBookings,
    
    refreshData,
    exportData,
    

    data: kosts, 
    updateData: updateKost, 
    deleteData: deleteKost, 
    createData: addKost 
  };
};

export default useAdminData;