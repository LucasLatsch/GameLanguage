// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      signIn: async (email, password) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/auth/login", {
            email,
            password,
          });

          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signUp: async (name, email, password) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/auth/register", {
            name,
            email,
            password,
          });

          // já loga automaticamente após registrar
          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

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
    }
  )
);
