import { create } from "zustand";
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const useCategoriesStore = create((set, get) => ({
  categories: [],
  loading: false,

  // criar categoria
  addCategory: async (name) => {
    try {
      set({ loading: true });
      const { data } = await api.post("/categories", { name });

      set((state) => ({
        categories: [...state.categories, data],
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      set({ loading: false });
    }
  },

  // buscar categorias
  fetchCategories: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/categories");

      set({
        categories: data,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      set({ loading: false });
    }
  },

  // deletar categoria
  removeCategory: async (id) => {
    try {
      set({ loading: true });
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      set({ loading: false });
    }
  },
}));
