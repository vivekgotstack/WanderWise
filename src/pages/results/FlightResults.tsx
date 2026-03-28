import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchFlights } from "@/api/flightApi";
import { useTheme } from "@/contexts/ThemeContext";

export default function FlightResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("basePrice");
  const [direction, setDirection] = useState("asc");

  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await searchFlights({
          source,
          destination,
          date,
          page,
          sortBy,
          direction,
        });

        setFlights(res.content);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [source, destination, date, page, sortBy, direction]);

  const isDark = theme !== "light";

  const formatDuration = (dep: string, arr: string) => {
    const d = new Date(dep);
    const a = new Date(arr);
    const diff = a.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div
      className="min-h-screen text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20 flex flex-col items-center"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }}
    >
      {/* 🔥 HEADER FIXED */}
      <div className="w-full max-w-6xl mb-6">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Flights from {source} → {destination}
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Fetching best flights...</p>
        </div>
      )}

      {/* 🔥 BEAUTIFUL EMPTY STATE */}
      {!loading && flights.length === 0 && (
        <div className="mt-24 text-center max-w-md">
          <div className="text-5xl mb-4">✈️</div>

          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No flights found
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            Looks like no flights match your route or date.
          </p>

          <button
            onClick={() => navigate("/flights")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Another Search
          </button>
        </div>
      )}

      {/* SORT */}
      {!loading && flights.length > 0 && (
        <>
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-2 rounded-lg border ${
                isDark
                  ? "bg-[#1a1c4b] text-white border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="basePrice">Price</option>
              <option value="departureTime">Departure Time</option>
            </select>

            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className={`p-2 rounded-lg border ${
                isDark
                  ? "bg-[#1a1c4b] text-white border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* FLIGHTS */}
          <div className="grid gap-5 w-full max-w-6xl">
            {flights.map((flight) => {
              const dep = new Date(flight.departureTime);
              const arr = new Date(flight.arrivalTime);

              return (
                <div
                  key={flight.id}
                  className={`p-5 rounded-xl shadow-md hover:shadow-xl transition ${
                    isDark
                      ? "bg-[#15173a] text-gray-200"
                      : "bg-gradient-to-br from-pink-50 via-white to-indigo-50 border border-indigo-100"
                  }`}
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/airlines/${flight.airline.toLowerCase()}.png`}
                        alt={flight.airline}
                        className="w-12 h-12 object-contain"
                        onError={(e: any) =>
                          (e.target.style.display = "none")
                        }
                      />

                      <div>
                        <h2 className="font-semibold">
                          {flight.airline} •{" "}
                          {flight.flightNumber || "N/A"}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {flight.source} → {flight.destination}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-500">
                        ₹{flight.basePrice}
                      </p>
                      <p className="text-xs text-gray-400">
                        {flight.availableSeats} seats left
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-400">
                        {dep.toLocaleTimeString()} →{" "}
                        {arr.toLocaleTimeString()}
                      </p>

                      <p className="text-xs text-gray-400">
                        {formatDuration(
                          flight.departureTime,
                          flight.arrivalTime
                        )}{" "}
                        • Non-stop
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/flights/${flight.id}/seats`)
                      }
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
            >
              Prev
            </button>

            <span className="text-gray-400">
              Page {page + 1} / {totalPages}
            </span>

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}