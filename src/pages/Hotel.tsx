import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Hotel() {
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
          src="/svg/pagessvg/hotelpage.svg"
          alt="Hotel Booking"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        >
          <span className="inline-block mr-1 text-indigo-500">Y</span>
          our Ideal Stay, One Click Away
        </h1>

        <p
          className={`text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          Finding the right place to stay shouldn’t be a hassle. Our hotel
          booking section makes it simple to search, compare, and book
          accommodations that fit your needs — whether you’re traveling for
          business, a family vacation, or a quick weekend getaway. With access
          to a wide range of hotels, from luxury suites to budget-friendly
          rooms, you can easily find the perfect stay at the right price.
          Instant confirmations and clear details ensure a smooth booking
          process every time.
        </p>
      </div>
    </div>
  );
}
