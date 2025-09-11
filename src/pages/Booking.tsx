import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Booking() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;
  return (
    <div className={`flex flex-wrap ${
      currentTheme.theme === "light" ? "bg-gradient-to-r from-white to-gray-200" : "bg-gradient-to-r from-gray-800 to-gray-700"
    }`}>
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/bookingpage.svg"
          alt="Manage Booking"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
        <h1 className={`text-4xl md:text-5xl ${currentTheme.theme === "light" ?"text-gray-800":"text-gray-300"} font-bold mb-6 leading-tight`}>
          Simplify Your Bookings
        </h1>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          Planning ahead has never been easier. Our booking section is built to
          help you reserve services quickly and effortlessly, giving you a smooth,
          stress-free experience from start to finish. Whether you’re scheduling
          an appointment, reserving a table, or securing a spot for an event,
          our intuitive interface makes the process seamless and reliable. With
          just a few clicks, you can confirm your booking and get instant updates,
          so you’re always in the loop.
        </p>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
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
