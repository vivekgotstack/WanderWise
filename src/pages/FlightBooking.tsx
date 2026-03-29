import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";

export default function FlightBooking() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API = `${import.meta.env.VITE_API_BASE_URL}`;

  // 🔥 STATUS HANDLER (3 min simulation)
  const getStatus = (b: any) => {
    const created = new Date(b.createdAt).getTime();
    const now = Date.now();

    if (!created || created > now) return "PENDING";

    const diff = (now - created) / 1000;

    // ⏱️ 3 minutes = 180 seconds
    if (!b.status || b.status === "PENDING") {
      return diff >= 180 ? "CONFIRMED" : "PENDING";
    }

    if (b.status === "CANCELLING") {
      const cancelTime = new Date(b.updatedAt || b.createdAt).getTime();
      const cancelDiff = (now - cancelTime) / 1000;

      return cancelDiff >= 180 ? "CANCELLED" : "CANCELLING";
    }

    // 🔁 normalize backend inconsistency
    if (b.status === "FAILED") return "CANCELLED";

    return b.status;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API}/bookings/user/101`);
        setBookings(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🔥 CANCEL HANDLER (no instant removal)
  const handleCancel = async (id: number) => {
    try {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                status: "CANCELLING",
                updatedAt: new Date().toISOString(), // track cancel start
              }
            : b
        )
      );

      await axios.post(`${API}/bookings/${id}/cancel`);
    } catch (e) {
      console.error(e);
    }
  };

  const bg = isDark
    ? "#0b0c32"
    : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)";

  return (
    <div
      className="min-h-screen text-center px-4 sm:px-6 md:px-12 lg:px-20 
      pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20 flex flex-col items-center"
      style={{ background: bg }}
    >
      {/* HEADER */}
      <h1
        className={`text-2xl md:text-3xl font-bold mb-8 ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        My Flight Bookings
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400 mt-10">Loading bookings...</p>
      )}

      {/* EMPTY */}
      {!loading && bookings.length === 0 && (
        <p className="text-gray-400 mt-10">No bookings yet</p>
      )}

      {/* BOOKINGS */}
      <div className="space-y-6 w-full max-w-4xl">
        {bookings.map((b) => {
          const status = getStatus(b);

          return (
            <div
              key={b.id}
              className={`p-5 rounded-xl shadow-md hover:shadow-xl transition ${
                isDark
                  ? "bg-[#15173a] text-gray-200"
                  : "bg-gradient-to-br from-pink-50 via-white to-indigo-50 border border-indigo-100"
              }`}
            >
              {/* TOP */}
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="font-semibold">Booking #{b.id}</h2>
                  <p className="text-sm text-gray-400">
                    {b.flight.source} → {b.flight.destination}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    status === "CONFIRMED"
                      ? "bg-green-500 text-white"
                      : status === "CANCELLING"
                      ? "bg-red-500 text-white"
                      : status === "CANCELLED"
                      ? "bg-gray-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* MIDDLE */}
              <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-400">
                    Seats:{" "}
                    {b.seats?.map((s: any) => s.seatNumber).join(", ")}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Booked on:{" "}
                    {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-500">
                    ₹{b.totalPrice}
                  </p>

                  {/* CANCEL BUTTON */}
                  {(status === "PENDING" || status === "CONFIRMED") && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="mt-2 px-4 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}