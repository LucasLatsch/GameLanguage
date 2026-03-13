// src/store/listsStore.js
import { create } from "zustand";
import { api } from "../api/api";

export const useListsStore = create((set) => ({
  lists: [],
  loading: false,

  createList: async (name) => {
    try {
      set({ loading: true });

      const { data } = await api.post("/lists", { name });

      set((state) => ({ lists: [...state.lists, data], loading: false }));
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      set({ loading: false });
    }
  },

  fetchLists: async () => {
    try {
      set({ loading: true });

      const { data } = await api.get("/lists");

      set({ lists: data, loading: false });
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      set({ loading: false });
    }
  },

  updateList: async (id, name) => {
    try {
      set({ loading: true });

      const { data } = await api.put(`/lists/${id}`, { name });

      set((state) => ({
        lists: state.lists.map((list) => (list._id === id ? data : list)),
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao atualizar lista:", error);
      set({ loading: false });
    }
  },

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
