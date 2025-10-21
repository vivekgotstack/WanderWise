import PrefetchedImage from "@/components/PrefetchedImage";
import { useTheme } from "@/contexts/ThemeContext";

export default function Booking() {
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
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <PrefetchedImage
          src="/svg/pagessvg/bookingpage.svg"
          alt="Manage Booking"
          className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 md:p-8 lg:p-16 text-left">
        <h1
          className={`page-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
        >Simplify Your Bookings
        </h1>

        <p
          className={`text-sm sm:text-base md:text-lg mb-4 leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          Planning ahead has never been easier. Our booking section is built to
          help you reserve services quickly and effortlessly, giving you a smooth,
          stress-free experience from start to finish. Whether you’re scheduling
          an appointment, reserving a table, or securing a spot for an event,
          our intuitive interface makes the process seamless and reliable. With
          just a few clicks, you can confirm your booking and get instant updates,
          so you’re always in the loop.
        </p>

        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed ${currentTheme.theme === "light" ? "text-gray-700" : "text-gray-400"
            }`}
        >
          We value your time and flexibility. That’s why our system lets you
          easily modify or cancel bookings, putting you in control of your plans.
          With real-time availability and instant confirmation, you’ll never miss
          an opportunity. It’s all about making your life simpler and providing a
          smart, hassle-free way to organize the things that matter most.
        </p>
      </div>
    </div>
  );
}
