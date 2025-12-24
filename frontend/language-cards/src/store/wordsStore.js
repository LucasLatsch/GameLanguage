import { create } from "zustand";
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const useWordsStore = create((set, get) => ({
  words: [],
  loading: false,

  fetchWords: async () => {
    try {
      set({ loading: true });
      const token = useAuthStore.getState().token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await api.get("/words");
      set({ words: data, loading: false });
    } catch (error) {
      console.error("Erro ao buscar palavras:", error);
      set({ loading: false });
    }
  },

  addWord: async (term, translation) => {
    try {
      set({ loading: true });
      const token = useAuthStore.getState().token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await api.post("/words", { term, translation });
      set((state) => ({
        words: [...(state.words || []), data],
        loading: false, // <-- zera o loading aqui
      }));
    } catch (error) {
      console.error("Erro ao adicionar palavra:", error);
      set({ loading: false });
    }
  },

  removeWord: async (id) => {
    try {
      set({ loading: true });
      const token = useAuthStore.getState().token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await api.delete(`/words/${id}`);
      set((state) => ({
        words: state.words.filter((w) => w._id !== id),
        loading: false, // <-- zera o loading aqui também
      }));
    } catch (error) {
      console.error("Erro ao remover palavra:", error);
      console.log("Erro ao remover palavra:", error);
      set({ loading: false });
    }
  },
}));
