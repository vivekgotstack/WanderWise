import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
type Holiday = {
  id: number;
  destination: string;
  days: number;
  price: number;
  rating: number;
  people: number;
  image: string;
  tag: string;
};

export default function HolidayResults() {
  const { theme } = useTheme();

  const [data, setData] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const isDark = theme !== "light";

  useEffect(() => {
    const destinations = [
      { name: "Bali", img: "/holidays/bali.jpg" },
      { name: "Santorini", img: "/holidays/santorini.jpg" },
      { name: "Maldives", img: "/holidays/maldives.jpg" },
      { name: "Paris", img: "/holidays/paris.jpg" },
      { name: "Swiss Alps", img: "/holidays/swiss.jpg" },
      { name: "Phuket", img: "/holidays/phuket.jpg" },
      { name: "Iceland", img: "/holidays/iceland.jpg" },
      { name: "Kyoto", img: "/holidays/kyoto.jpg" },
      { name: "Rome", img: "/holidays/rome.jpg" },
      { name: "Barcelona", img: "/holidays/barcelona.jpg" },
      { name: "Amsterdam", img: "/holidays/amsterdam.jpg" },
      { name: "New York", img: "/holidays/newyork.jpg" },
    ];

    const generated: Holiday[] = destinations.flatMap((place, idx) => {
      const count = Math.floor(Math.random() * 2) + 1;

      return Array.from({ length: count }).map((_, i) => ({
        id: idx * 10 + i,
        destination: place.name,
        days: 3 + Math.floor(Math.random() * 5),
        price: 15000 + Math.floor(Math.random() * 60000),
        rating: Number((4 + Math.random()).toFixed(1)),
        people: 1 + Math.floor(Math.random() * 4), // 🔥 added
        image: place.img,
        tag: ["Luxury", "Exclusive", "Top Rated", "Premium"][
          Math.floor(Math.random() * 4)
        ],
      }));
    });

    const shuffled = generated.sort(() => 0.5 - Math.random());

    setTimeout(() => {
      setData(shuffled);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(120% 120% at 50% 100%, #fff 35%, #fdf2f8 60%, #6366f1 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-2xl md:text-3xl font-bold mb-10 text-center ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Explore Premium Holiday Packages
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center gap-3 mt-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Curating luxury trips...</p>
          </div>
        )}

        {/* CARDS */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {data.map((pkg) => (
              <div
                key={pkg.id}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-[#15173a] text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-md border border-indigo-100 shadow-md"
                }`}
              >
                {/* IMAGE */}
                <div className="relative h-44">
                  <img
                    src={pkg.image}
                    alt={pkg.destination}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30" />

                  <div className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white">
                    {pkg.tag}
                  </div>

                  <div className="absolute bottom-3 left-4 text-white">
                    <h2 className="text-lg font-semibold">
                      {pkg.destination}
                    </h2>
                    <p className="text-xs opacity-90">
                      ⭐ {pkg.rating}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-sm text-gray-400">
                    {pkg.days} Days • {pkg.people} People
                  </p>

                  <p className="mt-2 text-xl font-bold text-indigo-500">
                    ₹{pkg.price}
                  </p>

                  <button className="mt-5 w-full px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    View Details
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