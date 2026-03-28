import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

type Hotel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
};

export default function HotelResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const city = params.get("city")?.trim() || "";
  const isDark = theme !== "light";

  useEffect(() => {
    // If no city → don't generate fake data
    if (!city) {
      setHotels([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const generateHotels = (): Hotel[] => {
      const baseNames = [
        "Grand Palace",
        "Royal Residency",
        "Elite Suites",
        "Urban Stay",
        "Skyline Hotel",
        "Comfort Inn",
      ];

      return baseNames.map((name, i) => ({
        id: i,
        name: `${city} ${name}`,
        price: 2500 + Math.floor(Math.random() * 4000),
        rating: Number((3.5 + Math.random() * 1.5).toFixed(1)), // fixed type
        image: `/hotels/hotel${(i % 6) + 1}.jpg`,
      }));
    };

    const timer = setTimeout(() => {
      setHotels(generateHotels());
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer); // cleanup
  }, [city]);

  return (
    <div
      className="min-h-screen text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20 flex flex-col items-center"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }}
    >
      {/* HEADER */}
      <div className="w-full max-w-6xl mb-6">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {city ? `Hotels in ${city}` : "Search for hotels"}
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Finding best stays...</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && hotels.length === 0 && (
        <div className="mt-24 text-center max-w-md">
          <div className="text-5xl mb-4">🏨</div>

          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {city ? "No hotels found" : "No city selected"}
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            {city ? "Try another city." : "Please search for a city first."}
          </p>

          <button
            onClick={() => navigate("/hotel")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* HOTELS */}
      {!loading && hotels.length > 0 && (
        <div className="grid gap-5 w-full max-w-6xl">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition flex flex-col sm:flex-row gap-4 ${
                isDark
                  ? "bg-[#15173a] text-gray-200"
                  : "bg-gradient-to-br from-pink-50 via-white to-indigo-50 border border-indigo-100"
              }`}
            >
              {/* IMAGE */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full sm:w-44 h-32 object-cover rounded-lg"
              />

              {/* CONTENT */}
              <div className="flex flex-1 justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{hotel.name}</h2>

                  <p className="text-sm text-gray-400">
                    ⭐ {hotel.rating} • Premium Stay
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-500">
                    ₹{hotel.price}
                  </p>

                  <p className="text-xs text-gray-400">per night</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex sm:items-center justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}