import { create } from "zustand";
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const useWordsStore = create((set, get) => ({
  words: [],
  lists: [],
  loading: false,

  // criar palavra
  addWord: async (term, translation, categoryId, listId = null) => {
    try {
      set({ loading: true });

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

  // buscar palavras
  fetchWords: async (listId = null) => {
    try {
      set({ loading: true });

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

  // remover palavra
  removeWord: async (id) => {
    try {
      set({ loading: true });

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
