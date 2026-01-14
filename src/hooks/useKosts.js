import { useState, useEffect, useCallback } from "react";
import { getKosts, searchKosts as apiSearchKosts } from "@/services/api";
import { storage } from "@/lib/utils";
 // Pastikan import data dummy

const useKosts = () => {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [apiStatus, setApiStatus] = useState('checking');

  // Format data untuk konsistensi
  const formatKostData = useCallback((kost) => ({
    ...kost,
    priceAfter: kost.priceAfter || kost.price || 0,
    priceBefore: kost.priceBefore || kost.priceAfter || 0,
    discount: kost.discount || 0,
    facilities: Array.isArray(kost.facilities) ? kost.facilities : [],
    image: kost.image || '/images/default-kost.png',
    type: kost.type || 'Campur',
    city: kost.city || 'Unknown City',
    name: kost.name || 'Kost Tanpa Nama',
    address: kost.address || 'Alamat Tidak Diketahui',
    id: kost.id || Date.now(),
    location: `${kost.city || ''}, ${kost.address || ''}`,
    description: kost.description || 'Kost nyaman dengan fasilitas lengkap',
    contact: kost.contact || '',
    rating: kost.rating || 4.5,
    isAvailable: kost.isAvailable !== false,
  }), []);

  // Fetch data dari MockAPI dengan fallback
  const fetchKosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setApiStatus('checking');
      
      console.log("🔄 Fetching kosts from MockAPI...");
      
      let data;
      
      try {
        data = await getKosts();
        setApiStatus('online');
        console.log("✅ Data from API:", data);
      } catch (apiError) {
        console.warn("⚠️ API fetch failed:", apiError.message);
        setApiStatus('offline');
        
        // Fallback ke localStorage
        const cachedKosts = storage.get('cachedKosts');
        if (cachedKosts && cachedKosts.length > 0) {
          data = cachedKosts;
          console.log("📦 Using cached data:", data);
        } else {
          // Fallback ke data dummy
          data = kostDiscountData;
          console.log("📝 Using dummy data");
          // Simpan ke cache
          storage.set('cachedKosts', data);
        }
      }
      
      // Format data
      const formattedData = Array.isArray(data) 
        ? data.map(formatKostData)
        : [];
      
      setKosts(formattedData);
      setSearchResults(formattedData);
      
      console.log(`✅ Loaded ${formattedData.length} kosts`);
      return { success: true, data: formattedData };
      
    } catch (err) {
      console.error("❌ Error in fetchKosts:", err);
      setError(err.message || "Gagal memuat data");
      
      // Ultimate fallback
      const fallbackData = kostDiscountData.map(formatKostData);
      setKosts(fallbackData);
      setSearchResults(fallbackData);
      
      return { 
        success: false, 
        error: err.message,
        data: fallbackData 
      };
      
    } finally {
      setLoading(false);
    }
  }, [formatKostData]);

  // Initial load
  useEffect(() => {
    fetchKosts();
  }, [fetchKosts]);

  // Search function 
  const searchKost = useCallback((keyword) => {
    if (!keyword || !keyword.trim()) {
      const result = { success: true, data: kosts, count: kosts.length };
      setSearchResults(kosts);
      return result;
    }
    
    const lowerKeyword = keyword.toLowerCase().trim();
    const results = kosts.filter(
      (kost) =>
        (kost.name && kost.name.toLowerCase().includes(lowerKeyword)) ||
        (kost.city && kost.city.toLowerCase().includes(lowerKeyword)) ||
        (kost.address && kost.address.toLowerCase().includes(lowerKeyword)) ||
        (kost.type && kost.type.toLowerCase().includes(lowerKeyword))
    );
    
    setSearchResults(results);
    return { success: true, data: results, count: results.length };
  }, [kosts]);

  // API search function
  const searchKostWithApi = useCallback(async (keyword) => {
    if (!keyword || !keyword.trim()) {
      return { success: true, data: kosts, count: kosts.length };
    }
    
    try {
      if (apiStatus === 'online') {
        const apiResults = await apiSearchKosts(keyword);
        const formattedResults = Array.isArray(apiResults) 
          ? apiResults.map(formatKostData)
          : [];
        setSearchResults(formattedResults);
        return { success: true, data: formattedResults, count: formattedResults.length };
      }
    } catch (apiErr) {
      console.warn("⚠️ API search failed, using local:", apiErr.message);
    }
    
    // Fallback ke local search
    return searchKost(keyword);
  }, [apiStatus, formatKostData, searchKost, kosts]);

  // Get kost by ID
  const getKostById = useCallback(async (id) => {
    try {
      if (!id) return { success: false, error: 'ID tidak valid', data: null };
      
      // Cari di state dulu
      const found = kosts.find(k => 
        k.id?.toString() === id?.toString() || 
        k.id === parseInt(id)
      );
      
      if (found) {
        console.log("✅ Found kost in state:", found.name);
        return { success: true, data: found };
      }
      
      // Coba dari API
      if (apiStatus === 'online') {
        try {
          // Import dinamis untuk menghindari circular dependency
          const { getKostById: fetchKostById } = await import('@/services/api');
          const kost = await fetchKostById(id);
          console.log("✅ Found kost from API:", kost.name);
          return { success: true, data: formatKostData(kost) };
        } catch (apiError) {
          console.warn("⚠️ API get by ID failed:", apiError.message);
        }
      }
      
      // Cari di data dummy sebagai fallback terakhir
      const dummyKost = kostDiscountData.find(k => 
        k.id?.toString() === id?.toString() || 
        k.id === parseInt(id)
      );
      
      if (dummyKost) {
        return { success: true, data: formatKostData(dummyKost) };
      }
      
      return { success: false, error: 'Kost tidak ditemukan', data: null };
      
    } catch (err) {
      console.error("❌ Error getting kost by ID:", err);
      return { success: false, error: err.message, data: null };
    }
  }, [kosts, apiStatus, formatKostData]);

  // Filter by type
  const filterByType = useCallback((type) => {
    if (!type || type === 'all') {
      setSearchResults(kosts);
      return { success: true, data: kosts, count: kosts.length };
    }
    
    const results = kosts.filter(kost => 
      kost.type && kost.type.toLowerCase() === type.toLowerCase()
    );
    
    setSearchResults(results);
    return { success: true, data: results, count: results.length };
  }, [kosts]);

  // Filter by price range
  const filterByPriceRange = useCallback((minPrice = 0, maxPrice = Infinity) => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    
    if (min < 0 || max < 0 || min > max) {
      setSearchResults(kosts);
      return { success: false, error: 'Range harga tidak valid', data: kosts };
    }
    
    const results = kosts.filter(kost => {
      const price = kost.priceAfter || kost.price || 0;
      return price >= min && price <= max;
    });
    
    setSearchResults(results);
    return { success: true, data: results, count: results.length };
  }, [kosts]);

  // Sort kosts
  const sortKosts = useCallback((sortBy = 'name', order = 'asc') => {
    const sorted = [...searchResults];
    
    switch(sortBy) {
      case 'price':
        sorted.sort((a, b) => {
          const priceA = a.priceAfter || a.price || 0;
          const priceB = b.priceAfter || b.price || 0;
          return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
        break;
        
      case 'name':
        sorted.sort((a, b) => {
          const nameA = a.name || '';
          const nameB = b.name || '';
          return order === 'asc' 
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
        break;
        
      case 'discount':
        sorted.sort((a, b) => {
          const discountA = a.discount || 0;
          const discountB = b.discount || 0;
          return order === 'asc' ? discountA - discountB : discountB - discountA;
        });
        break;
        
      default:
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    
    setSearchResults(sorted);
    return { success: true, data: sorted, count: sorted.length };
  }, [searchResults]);

  // Get promotional kosts
  const getPromotionalKosts = useCallback(() => {
    const promotional = kosts
      .filter(kost => (kost.discount || 0) > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0));
    
    return { 
      success: true, 
      data: promotional, 
      count: promotional.length 
    };
  }, [kosts]);

  // Get featured kosts
  const getFeaturedKosts = useCallback(() => {
    const featured = [...kosts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
    
    return { 
      success: true, 
      data: featured, 
      count: featured.length 
    };
  }, [kosts]);

  // Refresh data
  const refreshKosts = useCallback(async () => {
    storage.remove('cachedKosts');
    return await fetchKosts();
  }, [fetchKosts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchResults(kosts);
    return { success: true, data: kosts, count: kosts.length };
  }, [kosts]);

  return {
    // Data states
    kosts,
    loading,
    error,
    searchResults,
    apiStatus,
    
    // Functions
    searchKost,
    getKostById,
    filterByType,
    filterByPriceRange,
    sortKosts,
    getPromotionalKosts,
    getFeaturedKosts,
    refreshKosts,
    resetFilters,
    fetchKosts,
    
    // Untuk debugging
    searchKostWithApi,
  };
};

export default useKosts;