import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Trains() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;
  return (
    <div className={`flex flex-wrap min-w-screen ${
      currentTheme.theme === "light" ? "bg-gradient-to-r from-white to-gray-200" : "bg-gradient-to-r from-gray-800 to-gray-700"
    }`}>
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/trainpage.svg"
          alt="Train Booking"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
      <h1 className={`text-4xl md:text-5xl ${currentTheme.theme === "light" ?"text-gray-800":"text-gray-300"} font-bold mb-6 leading-tight`}>
          Your Journey, On Track
        </h1>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          Booking train tickets should be quick and stress-free. Our train
          booking section makes it easy to search routes, check seat
          availability, and secure your tickets in just a few steps. Whether
          you’re planning a daily commute, a weekend getaway, or a cross-country
          adventure, our platform helps you book with confidence. With instant
          confirmation and real-time updates, you’ll always know your travel
          plans are on track.
        </p>
        <p className={`text-lg ${currentTheme.theme === "light" ?"text-gray-700":"text-gray-400"} mb-4 leading-relaxed`}>
          We understand that flexibility is key when it comes to travel. That’s
          why our system allows you to easily manage, reschedule, or cancel
          bookings anytime. With live updates on schedules and transparent
          pricing, you can plan ahead or make last-minute changes without
          hassle. It’s all about making train travel smooth, reliable, and
          perfectly suited to your journey.
        </p>
      </div>
    </div>
  );
}
