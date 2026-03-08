import { create } from "zustand";
import { api } from "../api/api";

export const useWordsStore = create((set) => ({
  words: [],
  loading: false,

  setLoading: (value) => set({ loading: value }),

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
      }));
    } catch (error) {
      console.error("Erro ao adicionar palavra:", error);
    } finally {
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
      });
    } catch (error) {
      console.error("Erro ao buscar palavras:", error);
    } finally {
      set({ loading: false });
    }
  },

  // editar palavra
  updateWord: async (id, updatedData) => {
    try {
      set({ loading: true });

      const { data } = await api.put(`/words/${id}`, updatedData);

      set((state) => ({
        words: state.words.map((word) => (word._id === id ? data : word)),
      }));
    } catch (error) {
      console.error("Erro ao editar palavra:", error);
    } finally {
      set({ loading: false });
    }
  },

  // remover palavra
  removeWord: async (id) => {
    try {
      set({ loading: true });

      await api.delete(`/words/${id}`);

      set((state) => ({
        words: state.words.filter((word) => word._id !== id),
      }));
    } catch (error) {
      console.error("Erro ao remover palavra:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
