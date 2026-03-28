import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* 🔥 SEARCH FLIGHTS */
export const searchFlights = async ({
  source,
  destination,
  date,
  page = 0,
  size = 10,
  sortBy = "basePrice",
  direction = "asc",
}: any) => {
  const res = await axios.get(`${API_BASE}/flights/search`, {
    params: { source, destination, date, page, size, sortBy, direction },
  });

  return res.data;
};

/* 🔥 GET SEATS */
export const getSeats = async (flightId: number) => {
  const res = await axios.get(`${API_BASE}/seats/flight/${flightId}`);
  return res.data;
};

/* 🔥 CREATE BOOKING */
export const createBooking = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/bookings`, payload);
  return res.data;
};

/* 🔥 CONFIRM BOOKING */
export const confirmBooking = async (bookingId: number) => {
  const res = await axios.post(
    `${API_BASE}/bookings/${bookingId}/confirm`
  );
  return res.data;
};