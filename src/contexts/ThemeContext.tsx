import { createContext, useState, type ReactNode, useEffect, useContext } from "react";

interface Themes {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<Themes>({} as Themes);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { useTheme, ThemeProvider };
