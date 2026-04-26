import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { confirmBooking } from "@/api/bookingApi";
import { recordActivity } from "@/lib/activity";
import { motion } from "framer-motion";

type PaymentMethod = "UPI" | "Card" | "NetBanking";

interface PaymentRouteState {
  bookingId: number;
  seatIds: number[];
  estimatedAmount?: number;
}

export default function Payment() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [phase, setPhase] = useState<"idle" | "processing" | "success">("idle");
  const [completedBookingId, setCompletedBookingId] = useState<number | null>(null);

  const state = (location.state || null) as PaymentRouteState | null;
  const seatCount = state?.seatIds?.length || 0;
  const estimatedAmount = useMemo(
    () => state?.estimatedAmount ?? seatCount * 2499,
    [seatCount, state?.estimatedAmount]
  );

  const payNow = async () => {
    if (!state?.bookingId || !state?.seatIds?.length) {
      alert("Missing booking details. Please reselect seats.");
      navigate("/flights");
      return;
    }

    try {
      setPhase("processing");
      await new Promise((resolve) => setTimeout(resolve, 1600));

      await confirmBooking(state.bookingId);
      recordActivity({
        type: "booking",
        module: "flights",
        summary: `Paid with ${method} for booking #${state.bookingId}`,
        amount: estimatedAmount,
      });

      setCompletedBookingId(state.bookingId);
      setPhase("success");
      setTimeout(() => {
        navigate(`/booking-success/${state.bookingId}`);
      }, 1800);
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
      setPhase("idle");
    }
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
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          Payment
        </h1>
        <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Complete your booking with a quick simulated payment.
        </p>

        <div
          className={`rounded-2xl p-6 ${
            isDark ? "bg-[#15173a] text-gray-100" : "bg-white border border-indigo-100 text-gray-800"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {(["UPI", "Card", "NetBanking"] as PaymentMethod[]).map((item) => (
              <button
                key={item}
                onClick={() => setMethod(item)}
                className={`px-4 py-3 rounded-lg border transition ${
                  method === item
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : isDark
                    ? "border-[#2b2f72] hover:bg-[#1d2050]"
                    : "border-gray-300 hover:bg-indigo-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className={`rounded-lg p-4 mb-6 ${isDark ? "bg-[#1c1f4f]" : "bg-indigo-50"}`}>
            <p className="text-sm">Seats selected: {seatCount}</p>
            <p className="text-lg font-semibold mt-1">Amount to pay: ₹{estimatedAmount}</p>
            <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Demo mode: payment is simulated for submission.
            </p>
          </div>

          <button
            onClick={payNow}
            disabled={phase !== "idle"}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {phase === "idle" ? `Pay ₹${estimatedAmount}` : "Processing Payment..."}
          </button>
        </div>
      </div>

      {phase !== "idle" && (
        <div className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl p-8 text-center ${
              isDark ? "bg-[#12153f] text-gray-100 border border-indigo-700/50" : "bg-white text-gray-800 border border-indigo-100"
            }`}
          >
            {phase === "processing" && (
              <>
                <div className="mx-auto w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="mt-5 text-lg font-semibold">Securing Your Payment...</p>
                <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  WanderWise is confirming your booking.
                </p>
              </>
            )}

            {phase === "success" && (
              <>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center"
                >
                  <motion.svg
                    viewBox="0 0 52 52"
                    className="w-11 h-11"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    <motion.path
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 27 L22 35 L38 18"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.div>
                <p className="text-xl font-bold">Payment Successful</p>
                <p className={`mt-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Booking ID: #{completedBookingId}
                </p>
                <p className={`mt-3 text-xs ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
                  WanderWise - Smartest way to travel.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
