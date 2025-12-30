import { useState, useEffect } from "react";
import kostDiscountData from "@/data/kostDiscountData";

const useKosts = () => {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setKosts(kostDiscountData);
    setLoading(false);
  }, []);

  const searchKost = (keyword) => {
    if (!keyword) return kosts;
    return kosts.filter((kost) =>
      kost.name.toLowerCase().includes(keyword.toLowerCase()) ||
      kost.city.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getKostById = (id) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    return kosts.find(kost => kost.id === numericId);
  };

  return {
    kosts,
    loading,
    searchKost,
    getKostById 
  };
};

export default useKosts;
