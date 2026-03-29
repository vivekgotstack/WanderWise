import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSeats } from "@/api/flightApi";
import { createBooking, confirmBooking } from "@/api/bookingApi";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function SeatSelection() {
    const navigate = useNavigate();
    const { id } = useParams();
    const flightId = Number(id);

    const { theme } = useTheme();
    const isDark = theme !== "light";

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [seats, setSeats] = useState<any[]>([]);

    const toggleSeat = (seatId: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const data = await getSeats(flightId);
                setSeats(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchSeats();
    }, [flightId]);

    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert("Select at least 1 seat");
            return;
        }

        try {
            setLoading(true);

            const booking = await createBooking({
                flightId,
                userId: 101,
                seatIds: selectedSeats,
            });

            await confirmBooking(booking.id);

            navigate(`/booking-success/${booking.id}`);
        } catch (e) {
            throw new Error("Booking failed");
        } finally {
            setLoading(false);
        }
    };

    const sortedSeats = [...seats].sort((a, b) =>
        a.seatNumber.localeCompare(b.seatNumber)
    );

    const backgroundStyle = isDark
        ? {
            background: "#0b0c32",
            backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(99,102,241,0.20), transparent 60%),
          radial-gradient(circle at 80% 60%, rgba(79,70,229,0.15), transparent 60%)
        `,
        }
        : {
            background:
                "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        };

    return (
        <div
            className="min-h-screen text-center px-4 sm:px-6 md:px-12 lg:px-20 
            pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20 flex flex-col items-center"
            style={backgroundStyle}
        >
            <h1
                className={`text-3xl md:text-4xl font-bold mb-6 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                }`}
            >
                Select Seats
            </h1>

            {/* Seat Section */}
            <div className="flex flex-col items-center">

                <div
                    className={`mb-4 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    Front
                </div>

                {/* Scroll Container */}
                <div className="max-h-[400px] overflow-y-auto p-2">
                    <div className="grid grid-cols-6 gap-3 max-w-md">

                        {sortedSeats.map((seat) => {
                            const isSelected = selectedSeats.includes(seat.id);
                            const isUnavailable = seat.status !== "AVAILABLE";

                            return (
                                <button
                                    key={seat.id}
                                    disabled={isUnavailable}
                                    onClick={() => toggleSeat(seat.id)}
                                    className={`
                    w-12 h-12 rounded-lg text-xs font-medium transition flex items-center justify-center

                    ${isUnavailable
                                            ? isDark 
                                                ? "bg-gray-400 text-white cursor-not-allowed" 
                                                : "text-gray-300"
                                            : ""
                                        }

                    ${isSelected
                                            ? "bg-indigo-600 text-white scale-105"
                                            : isDark
                                                ? "bg-[#1a1c4b] text-white hover:bg-indigo-500"
                                                : "bg-white text-black hover:bg-indigo-300"
                                        }
                  `}
                                >
                                    {seat.seatNumber}
                                </button>
                            );
                        })}

                    </div>
                </div>

                {/* Legend */}
                <div
                    className={`flex gap-6 mt-6 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    <span>⬜ Available</span>
                    <span>🟦 Selected</span>
                    <span>⬛ Booked</span>
                </div>
            </div>

            {/* Action */}
            <div className="mt-10">
                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}