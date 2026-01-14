import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility untuk Tailwind class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ===== FORMATTING UTILITIES =====
export const formatCurrency = (amount, currency = 'IDR') => {
  if (amount === undefined || amount === null) return 'Rp 0'
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return new Intl.DateTimeFormat('id-ID', defaultOptions).format(date)
}

export const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// ===== STRING UTILITIES =====
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// ===== VALIDATION UTILITIES =====
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[0-9+\-\s()]{10,15}$/
  return re.test(phone)
}

export const validateKostData = (data) => {
  const errors = {}
  
  if (!data.name?.trim()) errors.name = 'Nama kost harus diisi'
  if (!data.city?.trim()) errors.city = 'Kota harus diisi'
  if (!data.address?.trim()) errors.address = 'Alamat harus diisi'
  if (!data.type?.trim()) errors.type = 'Tipe kost harus diisi'
  if (!data.priceAfter || data.priceAfter <= 0) errors.priceAfter = 'Harga setelah diskon harus lebih dari 0'
  if (!data.priceBefore || data.priceBefore <= 0) errors.priceBefore = 'Harga sebelum diskon harus lebih dari 0'
  if (data.discount < 0 || data.discount > 100) errors.discount = 'Diskon harus antara 0-100%'
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// ===== ARRAY & OBJECT UTILITIES =====
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  return JSON.parse(JSON.stringify(obj))
}

export const arrayToObject = (array, keyField) => {
  if (!Array.isArray(array)) return {}
  
  return array.reduce((obj, item) => {
    if (item && item[keyField] !== undefined) {
      obj[item[keyField]] = item
    }
    return obj
  }, {})
}

export const removeDuplicates = (array, key) => {
  if (!Array.isArray(array)) return []
  
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

// ===== NUMBER UTILITIES =====
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (!originalPrice || originalPrice <= 0) return 0
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export const formatDiscountText = (discount) => {
  if (!discount || discount <= 0) return null
  return `${discount}% OFF`
}

export const calculateTotalPrice = (price, quantity = 1, tax = 0) => {
  const subtotal = price * quantity
  const taxAmount = subtotal * (tax / 100)
  return subtotal + taxAmount
}

// ===== API & FETCH UTILITIES =====
export const createApiUrl = (endpoint, params = {}) => {
  const baseURL = import.meta.env.VITE_API_URL || 'https://694a982526e870772065fe69.mockapi.io/api/v1'
  let url = `${baseURL}${endpoint}`
  
  if (Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString())
      }
    })
    url += `?${queryParams.toString()}`
  }
  
  return url
}

export const handleApiError = (error, defaultMessage = 'Terjadi kesalahan') => {
  console.error('API Error:', error)
  
  // Jika error adalah instance Error
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message || defaultMessage,
      status: null
    }
  }
  
  // Untuk error dari fetch/axios
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      message: error.response.data?.message || `Error ${error.response.status}`,
      status: error.response.status
    }
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      message: 'Tidak ada respon dari server. Periksa koneksi internet Anda.',
      status: 0
    }
  } else {
    // Error setting up request
    return {
      success: false,
      message: error.message || defaultMessage,
      status: null
    }
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// ===== LOCAL STORAGE UTILITIES =====
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },
  
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// ===== URL & ROUTING UTILITIES =====
export const getQueryParam = (param) => {
  if (typeof window === 'undefined') return null
  
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export const setQueryParam = (param, value) => {
  if (typeof window === 'undefined') return
  
  const url = new URL(window.location)
  url.searchParams.set(param, value)
  window.history.pushState({}, '', url)
}

export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `${prefix}${timestamp}${random}`
}

// ===== MOCK API DATA FORMATTER =====
export const formatKostForApi = (kostData) => {
  const defaultImage = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Kost+Image'
  
  return {
    name: kostData.name?.trim() || 'Kost Tanpa Nama',
    city: kostData.city?.trim() || 'Kota Tidak Diketahui',
    address: kostData.address?.trim() || 'Alamat Tidak Diketahui',
    type: kostData.type || 'Campur',
    facilities: Array.isArray(kostData.facilities) 
      ? kostData.facilities.join(',')
      : (typeof kostData.facilities === 'string' ? kostData.facilities : ''),
    priceBefore: Number(kostData.priceBefore) || 0,
    priceAfter: Number(kostData.priceAfter) || 0,
    price: Number(kostData.priceAfter) || 0,
    discount: Number(kostData.discount) || 0,
    image: kostData.image?.trim() || defaultImage,
    description: kostData.description?.trim() || '',
    contact: kostData.contact?.trim() || '',
    isAvailable: kostData.isAvailable !== false,
    rating: Number(kostData.rating) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

export const formatKostForUI = (kostData) => {
  if (!kostData) return null
  
  return {
    id: kostData.id || generateId('kost_'),
    name: kostData.name || 'Kost Tanpa Nama',
    city: kostData.city || 'Kota Tidak Diketahui',
    address: kostData.address || 'Alamat Tidak Diketahui',
    type: kostData.type || 'Campur',
    facilities: Array.isArray(kostData.facilities) 
      ? kostData.facilities 
      : (typeof kostData.facilities === 'string' ? kostData.facilities.split(',') : []),
    priceBefore: Number(kostData.priceBefore) || 0,
    priceAfter: Number(kostData.priceAfter) || 0,
    price: Number(kostData.priceAfter) || 0,
    discount: Number(kostData.discount) || 0,
    image: kostData.image || 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Kost+Image',
    description: kostData.description || '',
    contact: kostData.contact || '',
    isAvailable: kostData.isAvailable !== false,
    rating: Number(kostData.rating) || 0,
    createdAt: kostData.createdAt || new Date().toISOString(),
    updatedAt: kostData.updatedAt || new Date().toISOString(),
    
    // Kompatibilitas dengan UI yang ada
    location: `${kostData.city || ''}, ${kostData.address || ''}`,
    originalPrice: kostData.priceBefore || kostData.priceAfter || 0
  }
}

// ===== SORTING & FILTERING =====
export const sortArray = (array, key, order = 'asc') => {
  if (!Array.isArray(array)) return []
  
  return [...array].sort((a, b) => {
    let aVal = a[key]
    let bVal = b[key]
    
    // Handle undefined/null
    if (aVal === undefined || aVal === null) aVal = order === 'asc' ? Infinity : -Infinity
    if (bVal === undefined || bVal === null) bVal = order === 'asc' ? Infinity : -Infinity
    
    // Compare based on type
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    
    // Numeric comparison
    return order === 'asc' ? aVal - bVal : bVal - aVal
  })
}

export const filterArray = (array, filters) => {
  if (!Array.isArray(array)) return []
  if (!filters || Object.keys(filters).length === 0) return array
  
  return array.filter(item => {
    return Object.entries(filters).every(([key, filterValue]) => {
      const itemValue = item[key]
      
      // Jika filterValue adalah fungsi
      if (typeof filterValue === 'function') {
        return filterValue(itemValue)
      }
      
      // Jika filterValue adalah array (multiple values)
      if (Array.isArray(filterValue)) {
        return filterValue.includes(itemValue)
      }
      
      // String comparison (case insensitive)
      if (typeof itemValue === 'string' && typeof filterValue === 'string') {
        return itemValue.toLowerCase().includes(filterValue.toLowerCase())
      }
      
      // Exact match for other types
      return itemValue === filterValue
    })
  })
}

// ===== PAGINATION =====
export const paginateArray = (array, page = 1, limit = 10) => {
  if (!Array.isArray(array)) return { data: [], pagination: {} }
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const totalItems = array.length
  const totalPages = Math.ceil(totalItems / limit)
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  }
}

// ===== ERROR BOUNDARY UTILITIES =====
export const withErrorBoundary = (fn, errorHandler) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Error in withErrorBoundary:', error)
      if (errorHandler) {
        errorHandler(error)
      }
      throw error
    }
  }
}

// ===== PERFORMANCE UTILITIES =====
export const measurePerformance = (label, fn) => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${label}: ${(end - start).toFixed(2)}ms`)
  return result
}

// ===== EXPORT ALL UTILITIES =====
export default {
  cn,
  formatCurrency,
  formatDate,
  formatDateTime,
  truncateText,
  capitalizeFirst,
  slugify,
  validateEmail,
  validatePhone,
  validateKostData,
  deepClone,
  arrayToObject,
  removeDuplicates,
  calculateDiscountPercentage,
  formatDiscountText,
  calculateTotalPrice,
  createApiUrl,
  handleApiError,
  debounce,
  throttle,
  storage,
  getQueryParam,
  setQueryParam,
  generateId,
  formatKostForApi,
  formatKostForUI,
  sortArray,
  filterArray,
  paginateArray,
  withErrorBoundary,
  measurePerformance
}