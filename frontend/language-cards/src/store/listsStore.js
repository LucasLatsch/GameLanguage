import { create } from "zustand";
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const useListsStore = create((set, get) => ({
  lists: [],
  loading: false,

  // criar lista
  createList: async (name) => {
    try {
      set({ loading: true });

      const { data } = await api.post("/lists", { name });

      set((state) => ({
        lists: [...state.lists, data],
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      set({ loading: false });
    }
  },

  // buscar listas
  fetchLists: async () => {
    try {
      set({ loading: true });

      const { data } = await api.get("/lists");

      set({
        lists: data,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      set({ loading: false });
    }
  },

  // deletar lista
  deleteList: async (id) => {
    try {
      set({ loading: true });
      await api.delete(`/lists/${id}`);
      set((state) => ({
        lists: state.lists.filter((list) => list._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
      set({ loading: false });
    }
  },
}));
