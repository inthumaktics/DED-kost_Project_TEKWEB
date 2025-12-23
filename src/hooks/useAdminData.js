// Custom hook untuk operasi CRUD admin
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://mockapi.io/resource/your-endpoint'; // Ganti dengan endpoint MockAPI

export const useAdminData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create data
  const createData = async (newData) => {
    try {
      const response = await axios.post(API_URL, newData);
      setData(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update data
  const updateData = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setData(prev => prev.map(item => 
        item.id === id ? response.data : item
      ));
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete data
  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData
  };
};