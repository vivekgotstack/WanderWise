import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const currentTheme = useTheme();
  const buttonStyle =
    currentTheme.theme === "light" ? "text-black" : "text-white"

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`
        ${buttonStyle}
        fixed bottom-8 left-1/2 transform -translate-x-1/2
        w-10 h-10
        rounded-full
        shadow-[0_8px_20px_rgba(0,0,0,0.25)]
        flex items-center justify-center
        transition-transform duration-300
        hover:scale-110
        animate-pulse-slow
        z-100
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
