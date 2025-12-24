// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import dummyKosts from '../data/dummyKosts';

/**
 * Custom Hook untuk fetching data - Checkpoint 1 (Data Dummy)
 * Digunakan oleh Anggota A di Home.jsx dan Detail.jsx
 */
const useFetch = (endpoint = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        
        // Simulasi network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Return data sesuai endpoint
        if (endpoint.includes('/kosts') || endpoint === '') {
          setData(dummyKosts);
        } else {
          // Default: return semua kosts
          setData(dummyKosts);
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        setError('Gagal memuat data. Silakan coba lagi.');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  // Fungsi untuk mengambil kost berdasarkan ID
  const getKostById = (id) => {
    return data.find(item => item.id === id) || null;
  };

  const filterKosts = (criteria = {}) => {
    const { type, minPrice = 0, maxPrice = 5000000, available } = criteria;
    
    return data.filter(kost => {
      let pass = true;
      
      if (type && type !== 'Semua' && kost.type !== type) pass = false;
      if (kost.price < minPrice || kost.price > maxPrice) pass = false;
      if (available !== undefined && kost.available !== available) pass = false;
      
      return pass;
    });
  };

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setData([...dummyKosts]);
      setLoading(false);
      console.log('✅ Data refreshed');
    }, 300);
  };

  return {
    data,
    loading,
    error,
    refetch,
    getKostById,
    filterKosts
  };
};

export default useFetch;