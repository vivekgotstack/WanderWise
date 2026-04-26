import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { recordActivity } from "@/lib/activity";

export default function FlightBooking() {
  const { theme } = useTheme();
  const { appUserId } = useAuth();
  const isDark = theme !== "light";

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "CANCELLED">("ALL");
  const [searchText, setSearchText] = useState("");

  const API = `${import.meta.env.VITE_API_BASE_URL}`;

  const getStatus = (b: any) => {
    if (b.status === "FAILED") return "CANCELLED";
    if (!b.status || b.status === "PENDING") return "CONFIRMED";
    return b.status;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!appUserId) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API}/bookings/user/${appUserId}`);
        setBookings(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [API, appUserId]);

  const handleCancel = async (id: number) => {
    try {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                status: "CANCELLING",
                updatedAt: new Date().toISOString(),
              }
            : b
        )
      );

      await axios.post(`${API}/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                status: "CANCELLED",
                updatedAt: new Date().toISOString(),
              }
            : b
        )
      );
      recordActivity({
        type: "cancel",
        module: "flights",
        summary: `Requested cancellation for booking #${id}`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const bg = isDark
    ? "#0b0c32"
    : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)";

  const filteredBookings = bookings.filter((booking) => {
    const status = getStatus(booking);
    const route = `${booking.flight?.source || ""} ${booking.flight?.destination || ""}`.toLowerCase();
    const text = searchText.trim().toLowerCase();
    const matchesText =
      !text || `${booking.id}`.includes(text) || route.includes(text);

    if (statusFilter === "ACTIVE") {
      return matchesText && status !== "CANCELLED";
    }

    if (statusFilter === "CANCELLED") {
      return matchesText && status === "CANCELLED";
    }

    return matchesText;
  });

  const bookingStats = {
    total: bookings.length,
    active: bookings.filter((b) => getStatus(b) !== "CANCELLED").length,
    cancelled: bookings.filter((b) => getStatus(b) === "CANCELLED").length,
    spend: bookings
      .filter((b) => getStatus(b) !== "CANCELLED")
      .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0),
  };

  return (
    <div
      className="min-h-screen text-center px-4 sm:px-6 md:px-12 lg:px-20 
      pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20 flex flex-col items-center"
      style={{ background: bg }}
    >
      <h1
        className={`text-2xl md:text-3xl font-bold mb-8 ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        My Flight Bookings
      </h1>

      {loading && (
        <p className="text-gray-400 mt-10">Loading bookings...</p>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-400 mt-10">No bookings yet</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="w-full max-w-4xl mb-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatChip label="Total" value={bookingStats.total} isDark={isDark} />
          <StatChip label="Active" value={bookingStats.active} isDark={isDark} />
          <StatChip label="Cancelled" value={bookingStats.cancelled} isDark={isDark} />
          <StatChip label="Live Spend" value={`₹${bookingStats.spend}`} isDark={isDark} />
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by booking id or route"
            className={`w-full sm:max-w-xs px-4 py-2 rounded-lg border text-sm ${
              isDark
                ? "bg-[#15173a] border-indigo-800/50 text-gray-100 placeholder:text-gray-400"
                : "bg-white border-indigo-200 text-gray-800"
            }`}
          />
          <div className="flex items-center gap-2">
            {(["ALL", "ACTIVE", "CANCELLED"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition ${
                  statusFilter === filter
                    ? "bg-indigo-600 text-white"
                    : isDark
                    ? "bg-[#1d2050] text-gray-200 hover:bg-[#252a6a]"
                    : "bg-white text-gray-700 border border-indigo-100 hover:bg-indigo-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-7 w-full max-w-4xl">
        {filteredBookings.map((b) => {
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
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="font-semibold">Booking #{b.id}</h2>
                  <p className="text-sm text-gray-400">
                    {b.flight.source} → {b.flight.destination}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    status === "CONFIRMED"
                      ? "bg-indigo-600 text-white"
                      : status === "CANCELLING"
                      ? "bg-violet-600 text-white"
                      : status === "CANCELLED"
                      ? "bg-slate-600 text-white"
                      : "bg-indigo-400 text-white"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-5 flex justify-between items-center flex-wrap gap-5">
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

                  {(status === "PENDING" || status === "CONFIRMED") && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="mt-2 px-4 py-1 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                    >
                      Cancel
                    </button>
                  )}

                  {status === "CANCELLED" && (
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="mt-2 ml-2 px-4 py-1 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && bookings.length > 0 && filteredBookings.length === 0 && (
        <p className="text-gray-400 mt-6">No bookings match your current filter.</p>
      )}
    </div>
  );
}

function StatChip({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string | number;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-left ${
        isDark
          ? "bg-[#15173a]/90 border border-indigo-900/50 text-gray-100"
          : "bg-white border border-indigo-100 text-gray-700"
      }`}
    >
      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}