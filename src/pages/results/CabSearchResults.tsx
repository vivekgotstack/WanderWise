import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";

export default function CabSearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [cabs, setCabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pickup = searchParams.get("pickup") || "";
  const drop = searchParams.get("drop") || "";

  const isDark = theme !== "light";

  const imageMap: any = {
    Mini: "/cabs/mini.png",
    Sedan: "/cabs/sedan.png",
    SUV: "/cabs/suv.png",
    Moto: "/cabs/moto.png",
    Premium: "/cabs/premium.png",
    XL: "/cabs/xl.png",
  };

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cabs/estimate`,
          { params: { pickup, drop } }
        );

        setCabs(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, [pickup, drop]);

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
          Cabs from {pickup} → {drop}
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Fetching best rides...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && cabs.length === 0 && (
        <div className="mt-24 text-center max-w-md">
          <div className="text-5xl mb-4">🚕</div>

          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No rides found
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            No cabs available for this route.
          </p>

          <button
            onClick={() => navigate("/cabs")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Another Search
          </button>
        </div>
      )}

      {/* RESULTS */}
      {!loading && cabs.length > 0 && (
        <div className="grid gap-5 w-full max-w-6xl">
          {cabs.map((cab, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl shadow-md hover:shadow-xl transition ${
                isDark
                  ? "bg-[#15173a] text-gray-200"
                  : "bg-gradient-to-br from-pink-50 via-white to-indigo-50 border border-indigo-100"
              }`}
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <img
                    src={imageMap[cab.type]}
                    className="w-12 h-12 object-contain"
                  />

                  <div>
                    <h2 className="font-semibold">{cab.type}</h2>
                    <p className="text-sm text-gray-400">
                      {pickup} → {drop}
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-500">
                    ₹{cab.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    {cab.distanceKm} km ride
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-400">
                    ETA: {cab.etaMinutes} mins
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/cabs/results?pickup=${pickup}&drop=${drop}&type=${cab.type}&price=${cab.price}&eta=${cab.etaMinutes}`
                    )
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
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