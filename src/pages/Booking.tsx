import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isDark = currentTheme.theme !== "light";
  const isLight = currentTheme.theme === "light";

  const backgroundStyle = isLight
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

  return (
    <>
      <div
        className={`inset-0 z-0 relative flex flex-col md:flex-row min-h-screen w-full 
        pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
        overflow-x-hidden`}
        style={backgroundStyle}
      >
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
          <PrefetchedImage
            src="/svg/pagessvg/bookingpage.svg"
            alt="Manage Booking"
            className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 md:p-8 lg:p-16 text-left">
          <h1
            className={`page-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Simplify Your{" "}
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                  : "bg-gradient-to-r from-indigo-400 to-purple-400"
              }`}
            >
              Bookings
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg mb-6 leading-relaxed max-w-xl ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Manage your reservations in one place. Fast access, clean interface,
            and a smooth experience from start to finish.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 
            ${
              isLight
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md hover:shadow-indigo-900/40"
            }`}
          >
            Go to My Bookings →
          </button>
        </div>
      </div>

      {/* DRAWER */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-end"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-t-2xl p-6 transition-all duration-300 ${
              isDark
                ? "bg-[#15173a] text-white border border-white/10"
                : "bg-white text-black shadow-xl"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              What booking do you want to view?
            </h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/flight-booking");
                }}
                className="w-full p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                ✈️ Flights
              </button>

              <button
                disabled
                className="w-full p-3 rounded-xl bg-gray-400 text-white cursor-not-allowed"
              >
                🏨 Hotels (Coming Soon)
              </button>

              <button
                disabled
                className="w-full p-3 rounded-xl bg-gray-400 text-white cursor-not-allowed"
              >
                🚆 Trains (Coming Soon)
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full text-sm text-gray-400 hover:text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}