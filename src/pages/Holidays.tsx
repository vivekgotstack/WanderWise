import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Holidays() {
  const currentTheme = useTheme();
  const isDark = currentTheme.theme !== "light";

  const backgroundStyle =
    currentTheme.theme === "light"
      ? {
          background:
            "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #6366f1 100%)",
        }
      : {
          background: "#0b0c32",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99,102,241,0.20), transparent 60%),
            radial-gradient(circle at 80% 60%, rgba(79,70,229,0.15), transparent 60%),
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 2px,
              transparent 2px,
              transparent 6px
            )`,
          backgroundSize: "cover, cover, 200px",
        };

  const navigate = useNavigate();

  return (
    <div
      className={`inset-0 z-0 relative flex flex-col md:flex-row min-h-screen w-full 
        pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
        overflow-x-hidden`}
      style={backgroundStyle}
    >
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-8">
        <PrefetchedImage
          src="/svg/pagessvg/holidaypage.svg"
          alt="Holiday Packages"
          className="w-full max-w-md md:max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:p-12 lg:p-16 text-left">
        
        <h1
          className={`page-heading text-3xl md:text-5xl font-extrabold mb-6 ${
            isDark ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Discover{" "}
          <span
            className={`bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            Perfect Holidays
          </span>
        </h1>

        <p
          className={`text-base md:text-lg mb-6 ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Explore curated travel packages designed for every mood — from beaches
          to mountains to international getaways.
        </p>

        <button
          onClick={() => navigate("/holidays/results")}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            isDark
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Explore Packages →
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Handpicked experiences. Best deals.
        </p>
      </div>
    </div>
  );
}