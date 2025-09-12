import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Cabs() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;
  return (
    <div className={`flex flex-wrap min-w-screen ${
      currentTheme.theme === "light" ? "bg-gradient-to-r from-white to-gray-200" : "bg-gradient-to-r from-gray-800 to-gray-700"
    }`}>
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/cabpage.svg"
          alt="Cab Service"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
      <h1 className={`text-4xl md:text-5xl ${currentTheme.theme === "light" ?"text-gray-800":"text-gray-300"} font-bold mb-6 leading-tight`}>
        Book Your Ride Instantly
        </h1>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          Getting around the city should be simple and stress-free. Our cab
          booking section makes it effortless to book rides in seconds — whether
          you’re heading to work, catching a flight, or exploring the city. With
          a sleek and intuitive interface, you can request a ride, choose the
          vehicle that suits your needs, and track your cab in real-time. No
          more waiting around or dealing with last-minute hassles — just a
          smooth, reliable ride, exactly when you need it.
        </p>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          We prioritize your comfort and convenience. That’s why we provide
          flexible options to schedule, manage, or even cancel rides with ease.
          Our system keeps you informed with instant updates about your driver’s
          location, estimated arrival, and fare details. It’s all about making
          every journey safe, predictable, and stress-free — so you can focus on
          where you’re going, not how you’ll get there.
        </p>
      </div>
    </div>
  );
}
