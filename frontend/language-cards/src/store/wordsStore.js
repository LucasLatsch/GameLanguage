import { create } from "zustand";
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const useWordsStore = create((set, get) => ({
  words: [],
  lists: [],
  categories: [],
  loading: false,

  setAuthHeader: () => {
    const token = useAuthStore.getState().token;

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  },

  // buscar palavras
  fetchWords: async (listId = null) => {
    try {
      set({ loading: true });
      get().setAuthHeader();

      const url = listId ? `/words?listId=${listId}` : "/words";

      const { data } = await api.get(url);

      set({
        words: data,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar palavras:", error);
      set({ loading: false });
    }
  },

  // buscar listas
  fetchLists: async () => {
    try {
      get().setAuthHeader();

      const { data } = await api.get("/lists");

      set({
        lists: data,
      });
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  },

  // buscar categorias
  fetchCategories: async () => {
    try {
      const { data } = await api.get("/categories");

      set({
        categories: data,
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  },

  // criar palavra
  addWord: async (term, translation, categoryId, listId = null) => {
    try {
      set({ loading: true });
      get().setAuthHeader();

      const { data } = await api.post("/words", {
        term,
        translation,
        categoryId,
        listId,
      });

      set((state) => ({
        words: [...state.words, data],
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao adicionar palavra:", error);
      set({ loading: false });
    }
  },

  // remover palavra
  removeWord: async (id) => {
    try {
      set({ loading: true });
      get().setAuthHeader();

      await api.delete(`/words/${id}`);

      set((state) => ({
        words: state.words.filter((w) => w._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Erro ao remover palavra:", error);
      set({ loading: false });
    }
  },
}));
