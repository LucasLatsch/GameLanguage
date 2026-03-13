// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api/api";
import { useWordsStore } from "./wordsStore";
import { useListsStore } from "./listsStore";
import { useCategoriesStore } from "./categoriesStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      // Função para carregar palavras, listas e categorias do usuário
      fetchUserData: async () => {
        try {
          const [listsRes, categoriesRes, wordsRes] = await Promise.all([
            useListsStore.getState().fetchLists(),
            useCategoriesStore.getState().fetchCategories(),
            useWordsStore.getState().fetchWords(),
          ]);

          // aqui não precisamos setar nada porque cada store já faz isso internamente
        } catch (err) {
          console.error("Erro ao carregar dados do usuário:", err);
        }
      },

      // LOGIN
      signIn: async (email, password) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/auth/login", { email, password });

          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });

          // carregar listas, categorias e palavras do usuário
          await useListsStore.getState().fetchLists();
          await useCategoriesStore.getState().fetchCategories();
          await useWordsStore.getState().fetchWords();
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      // CADASTRO
      signUp: async (name, email, password) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/auth/register", {
            name,
            email,
            password,
          });

          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });

          // carregar listas, categorias e palavras do usuário (incluindo palavras de exemplo)
          await useListsStore.getState().fetchLists();
          await useCategoriesStore.getState().fetchCategories();
          await useWordsStore.getState().fetchWords();
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      // LOGOUT
      signOut: () => {
        delete api.defaults.headers.common.Authorization;

        set({
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "@auth",
    },
  ),
);
