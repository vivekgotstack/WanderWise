import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";

export default function FlightBooking() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/bookings/user/101`
        );
        setBookings(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const bg = isDark
    ? "#0b0c32"
    : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)";

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 pt-[120px] pb-10 flex flex-col items-center"
      style={{ background: bg }}
    >
      <h1
        className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? "text-gray-200" : "text-gray-800"
          }`}
      >
        My Flight Bookings
      </h1>

      {loading && <p className="text-gray-400">Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-400">No bookings yet</p>
      )}

      <div className="space-y-6 w-full max-w-4xl">
        {bookings.map((b) => (
          <div
            key={b.id}
            className={`p-6 rounded-2xl shadow-md ${isDark ? "bg-[#15173a] text-white" : "bg-white text-black"
              }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Booking #{b.id}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded ${b.status === "CONFIRMED"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                  }`}
              >
                {b.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              {b.flight.source} → {b.flight.destination}
            </p>

            <p className="text-sm mt-1">
              Seats:{" "}
              {b.seats?.map((s: any) => s.seatNumber).join(", ")}
            </p>

            <p className="mt-2 font-bold text-indigo-500">
              ₹{b.totalPrice}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Booked on: {new Date(b.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}