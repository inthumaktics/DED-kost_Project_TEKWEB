import { useState } from "react";
import { kostsData } from "../data/kosts";

export const useKosts = () => {
  const [kosts, setKosts] = useState(kostsData);

  const getKosts = () => kosts;

  const addKost = (newKost) => {
    setKosts([...kosts, newKost]);
    console.log("ADD KOST:", newKost);
  };

  const updateKost = (updatedKost) => {
    setKosts(
      kosts.map((kost) =>
        kost.id === updatedKost.id ? updatedKost : kost
      )
    );
    console.log("UPDATE KOST:", updatedKost);
  };

  const deleteKost = (id) => {
    setKosts(kosts.filter((kost) => kost.id !== id));
    console.log("DELETE KOST:", id);
  };

  return {
    kosts,
    getKosts,
    addKost,
    updateKost,
    deleteKost,
  };
};
