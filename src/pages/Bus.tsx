import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { recordActivity } from "@/lib/activity";

export default function Bus() {
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

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const inputBase =
    "p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200";

  const inputTheme = isDark
    ? "bg-[#1a1c4b]/80 text-white border-gray-600 placeholder-gray-400 backdrop-blur"
    : "bg-white/90 text-black border-gray-300 placeholder-gray-500 shadow-sm";

  const handleSearch = () => {
    if (!source || !destination) {
      alert("Fill all fields");
      return;
    }

    recordActivity({
      type: "search",
      module: "bus",
      summary: `Searched buses ${source.trim().toUpperCase()} to ${destination.trim().toUpperCase()}`,
    });

    navigate(
      `/bus/results?source=${source.trim().toUpperCase()}&destination=${destination
        .trim()
        .toUpperCase()}&date=${date}`
    );
  };

  return (
    <div
      className={`inset-0 z-0 relative flex flex-col md:flex-row min-h-screen w-full 
        pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
        overflow-x-hidden`}
      style={backgroundStyle}
    >
      {/* LEFT IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-8">
        <PrefetchedImage
          src="/svg/pagessvg/buspage.svg"
          alt="Bus Booking"
          className="w-full max-w-md md:max-w-full h-auto object-contain 
          transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:p-12 lg:p-16 text-left">
        
        {/* HEADING */}
        <h1
          className={`page-heading text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${
            isDark ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Travel Smarter,{" "}
          <span
            className={`bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            Ride Easier
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className={`text-base md:text-lg mb-6 leading-relaxed max-w-xl ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Booking your bus tickets has never been this simple. Search routes,
          compare schedules, and reserve your seat effortlessly.
        </p>

        {/* FORM */}
        <div className="w-full max-w-sm space-y-3">
          <input
            placeholder="Source (DEL)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={`${inputBase} ${inputTheme} w-full`}
          />

          <input
            placeholder="Destination (MUM)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${inputBase} ${inputTheme} w-full`}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${inputBase} ${inputTheme} w-full`}
          />

          <button
            onClick={handleSearch}
            className={`w-full mt-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 
              ${
                isDark
                  ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md hover:shadow-indigo-900/40"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
          >
            Search Buses →
          </button>
        </div>

        <div className="mt-5 w-full max-w-sm">
          <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Fast choices
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { from: "DEL", to: "JPR" },
              { from: "MUM", to: "PUN" },
              { from: "BLR", to: "MYS" },
            ].map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                onClick={() => {
                  setSource(route.from);
                  setDestination(route.to);
                }}
                className={`px-3 py-1.5 text-xs rounded-full transition ${
                  isDark
                    ? "bg-[#1d2050] text-gray-200 hover:bg-[#252a6a]"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {route.from} → {route.to}
              </button>
            ))}
          </div>
        </div>

        {/* SUBTEXT */}
        <p className="mt-4 text-sm text-gray-500">
          No hidden fees. Real-time availability.
        </p>
      </div>
    </div>
  );
}