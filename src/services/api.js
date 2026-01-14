// services/api.js
const API_CONFIG = {
  baseURL: 'https://694a982526e870772065fe69.mockapi.io',
  endpoint: '/kosts',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper untuk fetch dengan error handling
const apiRequest = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  console.log(`📡 API Request: ${options.method || 'GET'} ${url}`);
  
  const defaultOptions = {
    headers: API_CONFIG.headers,
    signal: controller.signal,
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    clearTimeout(timeoutId);
    
    console.log(`📡 API Response: ${response.status} ${url}`);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        const text = await response.text();
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }
    
    const text = await response.text();
    if (!text) return { success: true };
    
    return JSON.parse(text);
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`❌ API Error (${endpoint}):`, error);
    
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${API_CONFIG.timeout}ms`);
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }
    
    throw error;
  }
};

// Helper untuk format data dari API
export const formatKostFromAPI = (apiData) => {
  if (Array.isArray(apiData)) {
    return apiData.map(item => formatKostFromAPI(item));
  }
  
  return {
    id: apiData.id?.toString() || Date.now().toString(),
    name: apiData.name || 'Kost Tanpa Nama',
    city: apiData.city || 'Kota',
    address: apiData.address || 'Alamat tidak tersedia',
    type: apiData.type || 'Campur',
    facilities: Array.isArray(apiData.facilities) 
      ? apiData.facilities 
      : (typeof apiData.facilities === 'string' ? apiData.facilities.split(',') : []),
    priceBefore: Number(apiData.priceBefore) || 0,
    priceAfter: Number(apiData.priceAfter) || Number(apiData.price) || 0,
    price: Number(apiData.priceAfter) || Number(apiData.price) || 0,
    discount: apiData.discount !== undefined ? Number(apiData.discount) : 0,
    image: apiData.image || 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Kost+Image',
    description: apiData.description || 'Kost nyaman dengan fasilitas lengkap',
    contact: apiData.contact || '',
    isAvailable: apiData.isAvailable !== false,
    rating: Number(apiData.rating) || 4.5,
    createdAt: apiData.createdAt || new Date().toISOString(),
    updatedAt: apiData.updatedAt || new Date().toISOString(),
    location: apiData.location || `${apiData.city || ''}, ${apiData.address || ''}`,
  };
};

// Test koneksi API
export const testApiConnection = async () => {
  try {
    console.log('🔌 Testing API connection...');
    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoint}`);
    
    if (response.ok) {
      console.log('✅ API connection successful!');
      return {
        success: true,
        message: 'API connected successfully',
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`,
      };
    } else {
      console.error('❌ API connection failed:', response.status);
      return {
        success: false,
        message: `API connection failed with status ${response.status}`,
        url: `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`,
      };
    }
  } catch (error) {
    console.error('❌ API connection error:', error);
    return {
      success: false,
      message: error.message,
      url: `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`,
    };
  }
};

// ===== CRUD OPERATIONS =====

// GET: Mendapatkan semua kosts
export const getKosts = async (params = {}) => {
  try {
    console.log('🔄 Fetching all kosts from MockAPI...');
    
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `${API_CONFIG.endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const data = await apiRequest(endpoint);
    const formattedData = formatKostFromAPI(data);
    
    console.log(`✅ Successfully fetched ${Array.isArray(formattedData) ? formattedData.length : 1} kosts`);
    
    // Cache data hanya jika mendapatkan array
    if (Array.isArray(formattedData)) {
      try {
        localStorage.setItem('cachedKosts', JSON.stringify(formattedData));
        localStorage.setItem('lastApiFetch', new Date().toISOString());
      } catch (cacheError) {
        console.warn('⚠️ Could not cache data:', cacheError.message);
      }
    }
    
    return formattedData;
  } catch (error) {
    console.error('❌ Failed to fetch kosts:', error.message);
    
    // Fallback ke cache
    try {
      const cached = localStorage.getItem('cachedKosts');
      if (cached) {
        const parsed = JSON.parse(cached);
        console.log('🔄 Using cached data as fallback');
        return parsed;
      }
    } catch (cacheError) {
      console.error('❌ Cache read failed:', cacheError.message);
    }
    
    throw error;
  }
};

// GET: Mendapatkan kost berdasarkan ID
export const getKostById = async (id) => {
  try {
    if (!id) throw new Error('ID is required');
    
    console.log(`🔄 Fetching kost with ID: ${id}`);
    
    const data = await apiRequest(`${API_CONFIG.endpoint}/${id}`);
    const formattedData = formatKostFromAPI(data);
    
    console.log(`✅ Successfully fetched kost: ${formattedData.name}`);
    return formattedData;
  } catch (error) {
    console.error(`❌ Failed to fetch kost ${id}:`, error.message);
    
    // Fallback: cari di cache
    try {
      const cached = localStorage.getItem('cachedKosts');
      if (cached) {
        const kosts = JSON.parse(cached);
        const kost = kosts.find(k => 
          k.id.toString() === id.toString() || 
          k.id === parseInt(id)
        );
        if (kost) {
          console.log('🔄 Found kost in cache');
          return kost;
        }
      }
    } catch (cacheError) {
      console.error('❌ Cache search failed:', cacheError.message);
    }
    
    throw error;
  }
};

// POST: Membuat kost baru
export const addKost = async (kostData) => {
  try {
    console.log('🔄 Adding new kost to MockAPI:', kostData);
    
    const response = await apiRequest(API_CONFIG.endpoint, {
      method: 'POST',
      body: JSON.stringify(kostData),
    });
    
    const newKost = formatKostFromAPI(response);
    console.log(`✅ Successfully added kost: ${newKost.name}`);
    
    // Update cache
    try {
      const cached = localStorage.getItem('cachedKosts');
      if (cached) {
        const kosts = JSON.parse(cached);
        kosts.push(newKost);
        localStorage.setItem('cachedKosts', JSON.stringify(kosts));
      }
    } catch (e) {
      console.warn('⚠️ Could not update cache:', e.message);
    }
    
    return newKost;
  } catch (error) {
    console.error('❌ Failed to add kost:', error.message);
    throw error;
  }
};

// PUT: Mengupdate kost
export const updateKost = async (id, kostData) => {
  try {
    console.log(`🔄 Updating kost ${id}:`, kostData);
    
    const response = await apiRequest(`${API_CONFIG.endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(kostData),
    });
    
    const updatedKost = formatKostFromAPI(response);
    console.log(`✅ Successfully updated kost: ${updatedKost.name}`);
    
    // Update cache
    try {
      const cached = localStorage.getItem('cachedKosts');
      if (cached) {
        const kosts = JSON.parse(cached);
        const index = kosts.findIndex(k => k.id.toString() === id.toString());
        if (index !== -1) {
          kosts[index] = updatedKost;
          localStorage.setItem('cachedKosts', JSON.stringify(kosts));
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not update cache:', e.message);
    }
    
    return updatedKost;
  } catch (error) {
    console.error(`❌ Failed to update kost ${id}:`, error.message);
    throw error;
  }
};

// DELETE: Menghapus kost
export const deleteKost = async (id) => {
  try {
    console.log(`🔄 Deleting kost ${id}`);
    
    await apiRequest(`${API_CONFIG.endpoint}/${id}`, {
      method: 'DELETE',
    });
    
    console.log(`✅ Successfully deleted kost ${id}`);
    
    // Update cache
    try {
      const cached = localStorage.getItem('cachedKosts');
      if (cached) {
        const kosts = JSON.parse(cached);
        const filtered = kosts.filter(k => k.id.toString() !== id.toString());
        localStorage.setItem('cachedKosts', JSON.stringify(filtered));
      }
    } catch (e) {
      console.warn('⚠️ Could not update cache:', e.message);
    }
    
    return { success: true, id };
  } catch (error) {
    console.error(`❌ Failed to delete kost ${id}:`, error.message);
    throw error;
  }
};

// SEARCH: Mencari kosts
export const searchKosts = async (query, params = {}) => {
  try {
    console.log(`🔍 Searching kosts for: "${query}"`);
    
    const allKosts = await getKosts(params);
    
    if (!query || !query.trim()) return allKosts;
    
    const searchTerm = query.toLowerCase().trim();
    
    const filtered = allKosts.filter(kost => {
      return (
        (kost.name && kost.name.toLowerCase().includes(searchTerm)) ||
        (kost.city && kost.city.toLowerCase().includes(searchTerm)) ||
        (kost.address && kost.address.toLowerCase().includes(searchTerm)) ||
        (kost.description && kost.description.toLowerCase().includes(searchTerm)) ||
        (kost.type && kost.type.toLowerCase().includes(searchTerm))
      );
    });
    
    console.log(`✅ Found ${filtered.length} kosts matching "${query}"`);
    return filtered;
  } catch (error) {
    console.error('❌ Search failed:', error.message);
    throw error;
  }
};

// GET dengan filter
export const getKostsWithFilter = async (filters = {}) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      order = 'desc',
      type,
      city,
      minPrice,
      maxPrice
    } = filters;
    
    console.log(`🔄 Fetching kosts with filters:`, filters);
    
    const params = {
      page,
      limit,
      sortBy,
      order,
    };
    
    if (type) params.type = type;
    if (city) params.city = city;
    
    let data = await getKosts(params);
    
    // Filter harga di client side
    if (minPrice !== undefined || maxPrice !== undefined) {
      data = data.filter(kost => {
        const price = kost.priceAfter || kost.price || 0;
        if (minPrice !== undefined && price < minPrice) return false;
        if (maxPrice !== undefined && price > maxPrice) return false;
        return true;
      });
    }
    
    return data;
  } catch (error) {
    console.error('❌ Filter failed:', error.message);
    throw error;
  }
};

// Cek kesehatan API
export const checkApiHealth = async () => {
  try {
    console.log('🔄 Checking API health...');
    
    await apiRequest(API_CONFIG.endpoint);
    
    console.log('✅ API is healthy');
    return {
      success: true,
      status: 'healthy',
      message: 'MockAPI is accessible',
      timestamp: new Date().toISOString(),
      url: `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`,
    };
  } catch (error) {
    console.error('❌ API health check failed:', error.message);
    return {
      success: false,
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString(),
      url: `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`,
    };
  }
};

// Clear cache
export const clearCache = () => {
  try {
    localStorage.removeItem('cachedKosts');
    localStorage.removeItem('lastApiFetch');
    console.log('✅ Cache cleared');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to clear cache:', error);
    return { success: false, error: error.message };
  }
};

// Eksport semua fungsi
export default {
  testApiConnection,
  getKosts,
  getKostById,
  addKost,
  updateKost,
  deleteKost,
  searchKosts,
  getKostsWithFilter,
  checkApiHealth,
  clearCache,
  formatKostFromAPI
};