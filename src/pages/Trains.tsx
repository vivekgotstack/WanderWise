import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Trains() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen w-full 
        pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
        overflow-x-hidden ${currentTheme.theme === "light"
          ? "bg-gradient-to-r from-white to-gray-200"
          : "bg-gradient-to-r from-gray-800 to-gray-700"
        }`}
    >
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <img
          src="/svg/pagessvg/trainpage.svg"
          alt="Train Booking"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`page-heading text-3xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        >
          Your Journey, On Track
        </h1>

        <p
          className={`text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          Booking train tickets should be quick and stress-free. Our train
          booking section makes it easy to search routes, check seat
          availability, and secure your tickets in just a few steps. Whether
          you’re planning a daily commute, a weekend getaway, or a cross-country
          adventure, our platform helps you book with confidence. With instant
          confirmation and real-time updates, you’ll always know your travel
          plans are on track.
        </p>
      </div>
    </div>
  );
}
