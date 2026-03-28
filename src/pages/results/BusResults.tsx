import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";

type Bus = {
  id: number;
  operator: string;
  type: string;
  departureTime: string;
  price: number;
};

export default function BusResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");

  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const isDark = theme !== "light";

  // 🔥 LOGO MAP
  const logoMap: any = {
    "RedBus Travels": "/buses/redbus.png",
    "VRL Travels": "/buses/vrl.png",
    "Orange Travels": "/buses/orange.png",
    "ZingBus": "/buses/zingbus.png",
    "IntrCity SmartBus": "/buses/intrcity.png",
    "PasiBus": "/buses/pasibus.png",
    "SRS Travels": "/buses/srs.png",
    "KSRTC": "/buses/ksrtc.png",
  };

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/buses/search",
          {
            params: { source, destination, date },
          }
        );

        let data: Bus[] = res.data.data;

        // 🔥 ADD EXTRA MOCK OPTIONS (for richness)
        const extra: Bus[] = [
          {
            id: 101,
            operator: "ZingBus",
            type: "AC Sleeper",
            departureTime: "21:45",
            price: 950,
          },
          {
            id: 102,
            operator: "IntrCity SmartBus",
            type: "AC Seater",
            departureTime: "19:30",
            price: 820,
          },
          {
            id: 103,
            operator: "SRS Travels",
            type: "Non-AC Sleeper",
            departureTime: "23:15",
            price: 700,
          },
          {
            id: 104,
            operator: "KSRTC",
            type: "Volvo AC",
            departureTime: "20:00",
            price: 1200,
          },
        ];

        data = [...data, ...extra];

        // 🔥 SORT
        data = [...data].sort((a, b) => {
          let valA: any = a[sortBy as keyof Bus];
          let valB: any = b[sortBy as keyof Bus];

          if (sortBy === "departureTime") {
            valA = new Date(`1970-01-01T${valA}`);
            valB = new Date(`1970-01-01T${valB}`);
          }

          return direction === "asc"
            ? valA > valB ? 1 : -1
            : valA < valB ? 1 : -1;
        });

        setBuses(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [source, destination, date, sortBy, direction]);

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
          Buses from {source} → {destination}
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Fetching buses...</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && buses.length === 0 && (
        <div className="mt-24 text-center max-w-md">
          <div className="text-5xl mb-4">🚌</div>

          <h2 className="text-xl font-semibold">
            No buses found
          </h2>

          <button
            onClick={() => navigate("/bus")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      )}

      {/* SORT */}
      {!loading && buses.length > 0 && (
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
              <option value="price">Price</option>
              <option value="departureTime">Departure</option>
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
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          {/* RESULTS */}
          <div className="grid gap-5 w-full max-w-6xl">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className={`p-5 rounded-xl shadow-md hover:shadow-xl transition ${
                  isDark
                    ? "bg-[#15173a] text-gray-200"
                    : "bg-gradient-to-br from-pink-50 via-white to-indigo-50 border border-indigo-100"
                }`}
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  
                  {/* LEFT WITH LOGO */}
                  <div className="flex items-center gap-3">
                    <img
                      src={logoMap[bus.operator]}
                      className="w-12 h-12 object-contain"
                      onError={(e: any) => (e.target.style.display = "none")}
                    />

                    <div>
                      <h2 className="font-semibold">
                        {bus.operator}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {source} → {destination}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-500">
                      ₹{bus.price}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bus.type}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-400">
                    Departure: {bus.departureTime}
                  </p>

                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Select Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}