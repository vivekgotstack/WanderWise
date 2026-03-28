import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function BookingSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme !== "light";

  const bg = isDark
    ? "#0b0c32"
    : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: bg }}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg max-w-md w-full ${
          isDark ? "bg-[#15173a] text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">🎉 Booking Confirmed</h1>

        <p className="text-sm mb-6 text-gray-400">
          Your booking ID is #{id}
        </p>

        <button
          onClick={() => navigate("/flight-booking")}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          View My Bookings
        </button>

        <button
          onClick={() => navigate("/flights")}
          className="w-full mt-3 py-2 border rounded-lg"
        >
          Book Another Flight
        </button>
      </div>
    </div>
  );
}