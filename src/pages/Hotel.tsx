import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hotel() {
  const currentTheme = useTheme();
  const backgroundStyle =
    currentTheme.theme === "light"
      ? {
        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
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
    <div
      className={`inset-0 z-0 relative flex flex-col md:flex-row min-h-screen w-full 
      pt-[250px] sm:pt-[200px] md:pt-[100px] lg:pt-[100px] 
      overflow-x-hidden`}
      style={backgroundStyle}
    >
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <PrefetchedImage
          src="/svg/pagessvg/hotelpage.svg"
          alt="Hotel Booking"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 text-left">
        <h1
          className={`page-heading text-3xl md:text-5xl font-bold mb-6 leading-tight ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        >
          Your Ideal Stay, One Click Away
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
