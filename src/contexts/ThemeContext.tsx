import { createContext, useState, type ReactNode } from "react";

interface ThemeTypes {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<null | ThemeTypes>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
