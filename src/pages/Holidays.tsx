import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Holidays() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;
  return (
    <div className={`flex flex-wrap min-w-screen ${
      currentTheme.theme === "light" ? "bg-gradient-to-r from-white to-gray-200" : "bg-gradient-to-r from-gray-800 to-gray-700"
    }`}>
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/holidaypage.svg"
          alt="Holiday planning"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
      <h1 className={`text-4xl md:text-5xl ${currentTheme.theme === "light" ?"text-gray-800":"text-gray-300"} font-bold mb-6 leading-tight`}>
          Unforgettable Holidays, Just a Click Away
        </h1>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          Turn your travel dreams into reality with our holidays section,
          designed to make planning your perfect getaway effortless and
          exciting. Whether you’re looking for a serene beach escape, an
          adventurous mountain trek, or a vibrant city tour, we’ve got a wide
          range of curated holiday packages tailored to fit every mood and
          budget. With seamless booking and instant confirmation, you can focus
          on what truly matters — enjoying the journey and creating
          unforgettable memories.
        </p>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          From solo adventures to family vacations, we bring you the best
          destinations and exclusive deals, all in one place. Easily compare
          options, customize your itinerary, and book with confidence, knowing
          you’re getting a reliable, stress-free experience. Whether it’s a
          weekend retreat or a once-in-a-lifetime trip, our goal is simple: to
          make your holidays smoother, smarter, and more memorable than ever
          before.
        </p>
      </div>
    </div>
  );
}
