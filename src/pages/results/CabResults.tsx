import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function CabResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme !== "light";

  const pickup = params.get("pickup") || "";
  const drop = params.get("drop") || "";
  const price = params.get("price") || "";
  const type = params.get("type") || "";
  const eta = params.get("eta") || "";

  const imageMap: any = {
    Mini: "/cabs/mini.png",
    Sedan: "/cabs/sedan.png",
    SUV: "/cabs/suv.png",
    Moto: "/cabs/moto.png",
    Premium: "/cabs/premium.png",
    XL: "/cabs/xl.png",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-40 pb-20"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }}
    >
      <div
        className={`w-full max-w-xl rounded-2xl p-6 shadow-xl ${
          isDark
            ? "bg-[#15173a] text-white"
            : "bg-white border border-indigo-100"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Confirm Your Ride
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={imageMap[type]}
            className="w-16 h-16 object-contain"
          />

          <div>
            <h2 className="font-semibold text-lg">{type}</h2>
            <p className="text-sm text-gray-400">
              {pickup} → {drop}
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-400">Arrival</span>
          <span>{eta} mins</span>
        </div>

        <div className="flex justify-between mb-6">
          <span className="text-gray-400">Fare</span>
          <span className="text-indigo-500 font-bold">
            ₹{price}
          </span>
        </div>

        <div
          className={`p-4 rounded-lg mb-6 ${
            isDark ? "bg-[#1a1c4b]" : "bg-gray-50"
          }`}
        >
          <p className="text-sm text-gray-400">Driver</p>
          <p className="font-semibold">Amit Singh • ⭐ 4.8</p>
          <p className="text-xs text-gray-400">
            DL01 AB1234 • 3 mins away
          </p>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
          Confirm Booking
        </button>

        <button
          onClick={() => navigate("/cabs")}
          className="w-full mt-3 text-sm text-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}