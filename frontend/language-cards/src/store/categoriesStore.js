// src/store/categoriesStore.js
import { create } from "zustand";
import { api } from "../api/api";

export const useCategoriesStore = create((set) => ({
  categories: [],
  loading: false,

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

  // src/store/categoriesStore.js
  fetchCategories: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/categories");
      console.log("CATEGORIAS RECEBIDAS DO BACKEND:", data); // 👈 log para debug

      set({
        categories: data,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      set({ loading: false });
    }
  },
  updateCategory: async (id, name) => {
    try {
      set({ loading: true });

      const { data } = await api.put(`/categories/${id}`, { name });

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? data : cat,
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      set({ loading: false });
    }
  },

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
