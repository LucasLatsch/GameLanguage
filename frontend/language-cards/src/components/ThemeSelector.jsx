import { useThemeStore } from "../store/themeStore";
import { daisyThemes } from "../utils/daisyThemes";
import { useEffect } from "react";
const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">🎨 Escolha um tema</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {daisyThemes.map((t) => (
          <button
            key={t}
            data-theme={t}
            onClick={() => setTheme(t)}
            className={`border rounded-lg p-3 text-left transition hover:scale-[1.02]
              ${
                theme === t
                  ? "border-primary ring-2 ring-primary"
                  : "border-base-300"
              }`}
          >
            <div className="font-semibold capitalize mb-2">{t}</div>

            <div className="flex gap-1">
              <span className="w-5 h-5 rounded bg-primary" />
              <span className="w-5 h-5 rounded bg-secondary" />
              <span className="w-5 h-5 rounded bg-accent" />
              <span className="w-5 h-5 rounded bg-base-100 border" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
