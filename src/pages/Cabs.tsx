import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Cabs() {
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
          src="/svg/pagessvg/cabpage.svg"
          alt="Cab Service"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`page-heading text-3xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        > Book Your Ride Instantly
        </h1>

        <p
          className={`text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          Getting around the city should be simple and stress-free. Our cab
          booking section makes it effortless to book rides in seconds — whether
          you’re heading to work, catching a flight, or exploring the city. With
          a sleek and intuitive interface, you can request a ride, choose the
          vehicle that suits your needs, and track your cab in real-time. No
          more waiting around or dealing with last-minute hassles — just a
          smooth, reliable ride, exactly when you need it.
        </p>
      </div>
    </div>
  );
}
