import { useState, useEffect } from "react";
import { getAllCategories } from "../api/menu/menuCategoriesApi";
export function useCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const categoriesFunction = async () => {
      try {
        const response = await getAllCategories();
        const categoriesData = response.data.map(([id, name]) => ({
          id,
          name,
        }));
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };

    categoriesFunction();
  }, []);

  return categories;
}
