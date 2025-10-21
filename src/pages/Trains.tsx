import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Trains() {
  const currentTheme = useTheme();
  const backgroundStyle =
    currentTheme.theme === "light"
      ? {
        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }
      : {
        background: "#0f172a",
        backgroundImage: `
      radial-gradient(circle, rgba(139,92,246,0.6) 1px, transparent 1px),
      radial-gradient(circle, rgba(59,130,246,0.4) 1px, transparent 1px),
      radial-gradient(circle, rgba(236,72,153,0.5) 1px, transparent 1px)
    `,
        backgroundSize: "20px 20px, 40px 40px, 60px 60px",
        backgroundPosition: "0 0, 10px 10px, 30px 30px",
  };
  return (
    <div
      className={`inset-0 z-0 relative flex flex-col md:flex-row min-h-screen w-full 
      pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
      overflow-x-hidden`}
      style={backgroundStyle}
    >
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <PrefetchedImage
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
