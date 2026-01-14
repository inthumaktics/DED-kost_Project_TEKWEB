import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getKosts, 
  addKost as apiAddKost, 
  updateKost as apiUpdateKost, 
  deleteKost as apiDeleteKost 
} from "@/services/api";
import { 
  formatKostForApi, 
  formatKostForUI, 
  storage,
  handleApiError,
  validateKostData,
  generateId 
} from "@/lib/utils";
import { kostDiscountData } from "@/data/kostDiscountData";

const useAdminKosts = () => {
  const navigate = useNavigate();
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKost, setEditingKost] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load data dari MockAPI dengan fallback
  const fetchKosts = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);
      
      console.log("Fetching kosts from MockAPI...");
      const data = await getKosts();
      console.log("Data from API:", data);
      
      let formattedData;
      
      if (Array.isArray(data) && data.length > 0) {
        // Gunakan data dari API (sudah diformat oleh getKosts di api.js)
        formattedData = data;
        console.log("Using data from API, count:", formattedData.length);
      } else {
        // Fallback ke data dummy
        console.log("API returned empty, using dummy data");
        formattedData = kostDiscountData.map(formatKostForUI);
        storage.set('cachedKosts', formattedData);
      }
      
      setKosts(formattedData);
      return { success: true, data: formattedData };
      
    } catch (err) {
      console.error("Error fetching kosts:", err);
      const errorResult = handleApiError(err, "Gagal memuat data dari server");
      setApiError(errorResult.message);
      
      // Fallback ke cache
      const cachedKosts = storage.get('cachedKosts', []);
      if (cachedKosts.length > 0) {
        setKosts(cachedKosts);
        return { success: true, data: cachedKosts, fromCache: true };
      }
      
      // Ultimate fallback: data dummy
      const fallbackData = kostDiscountData.map(formatKostForUI);
      setKosts(fallbackData);
      return { success: true, data: fallbackData, fromFallback: true };
      
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data saat komponen mount
  useEffect(() => {
    const isLoggedIn = storage.get("isAdminLoggedIn", false);
    console.log("Admin login status:", isLoggedIn);
    
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    fetchKosts();
  }, [navigate, fetchKosts]);

  // CRUD operations dengan MockAPI
  const addKost = async (newKost) => {
    try {
      setLoading(true);
      setApiError(null);
      setSuccessMessage(null);
      
      // Validasi data
      const validation = validateKostData(newKost);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors).join(', '));
      }
      
      console.log("Adding kost to MockAPI:", newKost);
      
      // Format untuk API
      const formattedKost = formatKostForApi(newKost);
      
      // Kirim ke API
      const addedKost = await apiAddKost(formattedKost);
      console.log("Kost added to API:", addedKost);
      
      // Data dari API sudah diformat oleh formatKostFromAPI
      const uiKost = addedKost;
      
      // Update state lokal
      setKosts(prev => [...prev, uiKost]);
      
      // Update cache
      const updatedKosts = [...kosts, uiKost];
      storage.set('cachedKosts', updatedKosts);
      
      // Set success message
      setSuccessMessage(`Kost "${uiKost.name}" berhasil ditambahkan!`);
      
      return { 
        success: true, 
        data: uiKost,
        message: `Kost "${uiKost.name}" berhasil ditambahkan!`
      };
      
    } catch (err) {
      console.error("Error adding kost:", err);
      const errorResult = handleApiError(err, "Gagal menambahkan kost");
      setApiError(errorResult.message);
      
      // Fallback lokal dengan ID temporary
      const fallbackKost = {
        ...newKost,
        id: generateId('temp_'),
        createdAt: new Date().toISOString()
      };
      const uiKost = formatKostForUI(fallbackKost);
      setKosts(prev => [...prev, uiKost]);
      
      return { 
        success: false, 
        error: errorResult.message,
        data: uiKost,
        warning: "Data disimpan lokal karena server error"
      };
      
    } finally {
      setLoading(false);
    }
  };

  const deleteKost = async (id) => {
    try {
      setLoading(true);
      setApiError(null);
      setSuccessMessage(null);
      
      console.log("Deleting kost from MockAPI:", id);
      
      // Hapus dari API
      await apiDeleteKost(id);
      console.log("Kost deleted from API:", id);
      
      // Update state lokal
      const updated = kosts.filter(kost => kost.id?.toString() !== id?.toString());
      const deletedKost = kosts.find(kost => kost.id?.toString() === id?.toString());
      
      setKosts(updated);
      storage.set('cachedKosts', updated);
      
      // Set success message
      if (deletedKost) {
        setSuccessMessage(`Kost "${deletedKost.name}" berhasil dihapus!`);
      }
      
      return { 
        success: true, 
        message: "Kost berhasil dihapus",
        deletedId: id
      };
      
    } catch (err) {
      console.error("Error deleting kost:", err);
      const errorResult = handleApiError(err, "Gagal menghapus kost");
      setApiError(errorResult.message);
      
      // Fallback lokal
      const updated = kosts.filter(kost => kost.id?.toString() !== id?.toString());
      setKosts(updated);
      storage.set('cachedKosts', updated);
      
      return { 
        success: true, 
        message: "Kost dihapus dari cache lokal",
        deletedId: id,
        warning: "Server mungkin tidak terupdate"
      };
      
    } finally {
      setLoading(false);
    }
  };

  const updateKost = async (id, updatedData) => {
    try {
      setLoading(true);
      setApiError(null);
      setSuccessMessage(null);
      
      // Validasi data
      const validation = validateKostData(updatedData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors).join(', '));
      }
      
      console.log("Updating kost in MockAPI:", id, updatedData);
      
      // Format untuk API
      const formattedKost = formatKostForApi(updatedData);
      
      // Update di API
      const updatedKost = await apiUpdateKost(id, formattedKost);
      console.log("Kost updated in API:", updatedKost);
      
      // Data dari API sudah diformat oleh formatKostFromAPI
      const uiKost = updatedKost;
      
      // Update state lokal
      const updated = kosts.map(kost => 
        kost.id?.toString() === id?.toString() ? uiKost : kost
      );
      
      setKosts(updated);
      storage.set('cachedKosts', updated);
      setEditingKost(null);
      
      // Set success message
      setSuccessMessage(`Kost "${uiKost.name}" berhasil diperbarui!`);
      
      return { 
        success: true, 
        data: uiKost,
        message: `Kost "${uiKost.name}" berhasil diperbarui!`
      };
      
    } catch (err) {
      console.error("Error updating kost:", err);
      const errorResult = handleApiError(err, "Gagal mengupdate kost");
      setApiError(errorResult.message);
      
      // Fallback lokal
      const uiKost = formatKostForUI({
        ...updatedData,
        id: id,
      });
      
      const updated = kosts.map(kost => 
        kost.id?.toString() === id?.toString() ? uiKost : kost
      );
      
      setKosts(updated);
      storage.set('cachedKosts', updated);
      setEditingKost(null);
      
      return { 
        success: false, 
        error: errorResult.message,
        data: uiKost,
        warning: "Perubahan disimpan lokal karena server error"
      };
      
    } finally {
      setLoading(false);
    }
  };

  // Refresh data dari API
  const refreshData = async () => {
    setSuccessMessage("Menyegarkan data...");
    const result = await fetchKosts();
    
    if (result.success) {
      setSuccessMessage(`Data berhasil disegarkan! (${result.data.length} kost ditemukan)`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
    
    return result;
  };

  // Admin statistics
  const getStats = () => {
    const totalKosts = kosts.length;
    const totalRevenue = kosts.reduce((sum, kost) => sum + (kost.priceAfter || kost.price || 0), 0);
    const averagePrice = totalKosts > 0 ? Math.round(totalRevenue / totalKosts) : 0;
    const totalDiscountKosts = kosts.filter(kost => kost.discount > 0).length;
    const locations = [...new Set(kosts.map(kost => kost.city).filter(Boolean))];
    const types = [...new Set(kosts.map(kost => kost.type).filter(Boolean))];
    
    // Revenue by type
    const revenueByType = types.reduce((acc, type) => {
      const typeKosts = kosts.filter(kost => kost.type === type);
      const revenue = typeKosts.reduce((sum, kost) => sum + (kost.priceAfter || 0), 0);
      acc[type] = revenue;
      return acc;
    }, {});
    
    return {
      totalKosts,
      totalRevenue: totalRevenue,
      formattedRevenue: totalRevenue.toLocaleString('id-ID'),
      averagePrice,
      formattedAveragePrice: averagePrice.toLocaleString('id-ID'),
      totalDiscountKosts,
      discountPercentage: totalKosts > 0 ? Math.round((totalDiscountKosts / totalKosts) * 100) : 0,
      totalLocations: locations.length,
      locations,
      types,
      revenueByType
    };
  };

  // Export data
  const exportToCSV = () => {
    if (kosts.length === 0) {
      setApiError("Tidak ada data untuk diexport");
      return;
    }

    const headers = ["ID", "Nama", "Kota", "Alamat", "Tipe", "Fasilitas", "Harga Sebelum", "Harga Sesudah", "Diskon (%)", "Rating", "Status", "Gambar"];
    
    const csvRows = [
      headers.join(","),
      ...kosts.map(kost => [
        kost.id,
        `"${kost.name || ''}"`,
        `"${kost.city || ''}"`,
        `"${kost.address || ''}"`,
        kost.type || '',
        `"${Array.isArray(kost.facilities) ? kost.facilities.join(", ") : ''}"`,
        kost.priceBefore || 0,
        kost.priceAfter || kost.price || 0,
        kost.discount || 0,
        kost.rating || 0,
        kost.isAvailable ? 'Tersedia' : 'Tidak Tersedia',
        kost.image || ""
      ].join(","))
    ];
    
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kost-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    setSuccessMessage(`Data berhasil diexport (${kosts.length} data)`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Clear messages
  const clearMessages = () => {
    setApiError(null);
    setSuccessMessage(null);
  };

  // Logout
  const logout = () => {
    storage.remove("isAdminLoggedIn");
    storage.remove("adminKosts");
    navigate("/admin/login");
  };

  return {
    // Data states
    kosts,
    loading,
    editingKost,
    apiError,
    successMessage,
    
    // CRUD operations
    addKost,
    deleteKost,
    updateKost,
    startEditKost: setEditingKost,
    cancelEdit: () => setEditingKost(null),
    
    // Admin functions
    getStats,
    exportToCSV,
    refreshData,
    clearMessages,
    logout,
  };
};

export default useAdminKosts;