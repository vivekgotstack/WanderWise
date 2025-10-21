import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Holidays() {
  const currentTheme = useTheme();

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
        <PrefetchedImage
          src="/svg/pagessvg/holidaypage.svg"
          alt="Holiday planning"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`page-heading text-4xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        >
          Unforgettable Holidays, Just a Click Away
        </h1>

        <p
          className={`text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          Turn your travel dreams into reality with our holidays section,
          designed to make planning your perfect getaway effortless and
          exciting. Whether you’re looking for a serene beach escape, an
          adventurous mountain trek, or a vibrant city tour, we’ve got a wide
          range of curated holiday packages tailored to fit every mood and
          budget. With seamless booking and instant confirmation, you can focus
          on what truly matters — enjoying the journey and creating
          unforgettable memories.
        </p>
      </div>
    </div>
  );
}
