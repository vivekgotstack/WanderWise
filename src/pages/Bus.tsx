import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Bus() {
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
          src="/svg/pagessvg/buspage.svg"
          alt="Bus Booking"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`page-heading text-4xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        > Travel Smarter, Ride Easier
        </h1>

        <p
          className={`text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          ooking your bus tickets has never been this simple. Our bus booking
          section makes it effortless to plan your travel, whether it’s a daily
          commute, a weekend getaway, or a long-distance journey. With a clean
          and intuitive interface, you can search routes, compare schedules, and
          reserve your seat in just a few clicks. Say goodbye to long queues and
          uncertainty — get instant confirmation and travel with confidence,
          knowing everything is ready before you even set foot on the bus.
        </p>
      </div>
    </div>
  );
}
