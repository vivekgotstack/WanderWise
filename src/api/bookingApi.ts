import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const createBooking = async (payload: {
    flightId: number;
    userId: number;
    seatIds: number[];
}) => {
    const res = await axios.post(`${API_BASE}/bookings`, payload);
    return res.data;
};

export const confirmBooking = async (bookingId: number) => {
    const res = await axios.post(`${API_BASE}/bookings/${bookingId}/confirm`);
    return res.data;
};

export const getBooking = async (id: number) => {
    const res = await axios.get(`${API_BASE}/bookings/${id}`);
    return res.data;
};