// src/store/initAuth.js
import { api } from "../api/api";
import { useAuthStore } from "./authStore";

export const initAuth = () => {
  const { token } = useAuthStore.getState();

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
