import { useThemeStore } from "./themeStore";

export const initTheme = () => {
  const theme = useThemeStore.getState().theme;
  document.documentElement.setAttribute("data-theme", theme);
};
