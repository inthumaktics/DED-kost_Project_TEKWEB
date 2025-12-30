// hooks/useAdminKosts.js - TAMBAH tanpa ubah struktur
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kostDiscountData from "@/data/kostDiscountData";

const useAdminKosts = () => {
  const navigate = useNavigate();
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ TAMBAH state untuk edit (tidak mengganggu fungsi yang ada)
  const [editingKost, setEditingKost] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    const savedKosts = localStorage.getItem("adminKosts");
    if (savedKosts) {
      setKosts(JSON.parse(savedKosts));
    } else {
      const adminFormattedData = kostDiscountData.map(kost => ({
        id: kost.id,
        name: kost.name,
        location: `${kost.city}, ${kost.address}`,
        price: kost.priceAfter,
        description: `Kost ${kost.type} dengan fasilitas: ${kost.facilities.join(', ')}`,
        facilities: kost.facilities,
        image: kost.image,
        originalData: kost
      }));

      setKosts(adminFormattedData);
      localStorage.setItem("adminKosts", JSON.stringify(adminFormattedData));
    }

    setLoading(false);
  }, [navigate]);

  const addKost = (newKost) => {
    const newData = {
      ...newKost,
      id: Date.now(),
    };
    const updated = [...kosts, newKost];
    setKosts(updated);
    localStorage.setItem("adminKosts", JSON.stringify(updated));
  };

  const deleteKost = (id) => {
    const updated = kosts.filter((k) => k.id !== id);
    setKosts(updated);
    localStorage.setItem("adminKosts", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  // ✅ FUNGSI BARU untuk Checkpoint 2 (tambahan, tidak mengganti)
  const updateKost = (id, updatedData) => {
    const updated = kosts.map(kost => 
      kost.id === id ? { ...kost, ...updatedData } : kost
    );
    setKosts(updated);
    localStorage.setItem("adminKosts", JSON.stringify(updated));
    setEditingKost(null); // Reset setelah update
    return { success: true };
  };

  const startEditKost = (kost) => {
    setEditingKost(kost);
  };

  const cancelEdit = () => {
    setEditingKost(null);
  };

  return {
    // Data yang sudah dipakai Anggota B
    kosts,
    loading,
    addKost,
    deleteKost,
    logout,
    
    // Tambahan jika diperlukan
    updateKost,
    editingKost,
    startEditKost,
    cancelEdit
  };
};

export default useAdminKosts;
