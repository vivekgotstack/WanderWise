import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getSavedFlights, removeSavedFlight, type SavedFlightTrip } from "@/lib/savedTrips";
import { useNavigate } from "react-router-dom";

export default function SavedTrips() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const navigate = useNavigate();
  const [savedFlights, setSavedFlights] = useState<SavedFlightTrip[]>([]);

  useEffect(() => {
    setSavedFlights(getSavedFlights());
  }, []);

  const onRemove = (id: number) => {
    removeSavedFlight(id);
    setSavedFlights((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-20 -left-16 h-72 w-72 rounded-full blur-3xl ${
            isDark ? "bg-indigo-500/20" : "bg-indigo-300/50"
          }`}
        />
        <div
          className={`absolute top-48 right-0 h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-pink-500/15" : "bg-pink-300/40"
          }`}
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          Saved Trips
        </h1>
        <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Flights you bookmarked for later.
        </p>

        {savedFlights.length === 0 ? (
          <div
            className={`rounded-3xl p-8 text-center backdrop-blur-md ${
              isDark
                ? "bg-[#15173a]/85 text-gray-200 border border-indigo-800/40"
                : "bg-white/90 border border-indigo-100 shadow-xl shadow-indigo-100/40 text-gray-700"
            }`}
          >
            <div className="text-4xl mb-3">💾</div>
            <p className="mb-4 text-base md:text-lg">No saved trips yet.</p>
            <button
              onClick={() => navigate("/flights")}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Explore Flights
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {savedFlights.map((flight) => (
              <div
                key={flight.id}
                className={`rounded-3xl p-5 md:p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDark
                    ? "bg-[#15173a]/85 text-gray-100 border border-indigo-800/40 hover:shadow-indigo-900/30"
                    : "bg-white/90 border border-indigo-100 hover:shadow-indigo-200/60"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 text-xs ${
                      isDark ? "bg-[#23275f] text-indigo-200" : "bg-indigo-50 text-indigo-700"
                    }`}>
                      <span>✈️</span>
                      <span>Flight Watchlist</span>
                    </div>
                    <h2 className="font-semibold text-lg md:text-xl">
                      {flight.airline} • {flight.flightNumber || "N/A"}
                    </h2>
                    <p className={`text-sm md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {flight.source} → {flight.destination}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                      Saved: {new Date(flight.savedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-indigo-500">₹{flight.basePrice}</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {flight.availableSeats} seats left
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => navigate(`/flights/${flight.id}/seats`)}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => onRemove(flight.id)}
                    className={`px-4 py-2.5 rounded-lg transition ${
                      isDark
                        ? "bg-[#1d2050] text-gray-100 hover:bg-[#252a6a]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
