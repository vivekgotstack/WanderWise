import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

import { Login } from "@/pages/authPages/Login";
import { Signup } from "@/pages/authPages/Signup";

import Dashboard from "@/pages/Dashboard";
import Booking from "@/pages/Booking";
import Bus from "@/pages/Bus";
import Cabs from "@/pages/Cabs";
import Flight from "@/pages/Flight";
import Holidays from "@/pages/Holidays";
import Hotel from "@/pages/Hotel";
import Trains from "@/pages/Trains";
import ErrorPage from "@/pages/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FlightResults from "@/pages/results/FlightResults";
import SeatSelection from "@/pages/SeatSelection";
import BookingSuccess from "@/pages/BookingSuccess";
import FlightBooking from "@/pages/FlightBooking";
import BusResults from "@/pages/results/BusResults";
import TrainResults from "@/pages/results/TrainResults";
import HolidayResults from "@/pages/results/HolidayResults";
import HotelResults from "@/pages/results/HotelResults";
import CabResults from "@/pages/results/CabResults";
import CabSearchResults from "@/pages/results/CabSearchResults";

const router = createBrowserRouter([

    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    {
        path: "/",
        element: <AuthLayout><MainLayout /></AuthLayout>,
        children: [
            { path: "flights", element: <Flight /> },
            { path: "flights/results", element: <FlightResults /> },
            { path: "flights/:id/seats", element: <SeatSelection /> },
            { path: "flight-booking", element: <FlightBooking /> },
            { path: "hotel", element: <Hotel /> },
            { path: "hotel/results", element: <HotelResults /> },
            { path: "trains", element: <Trains /> },
            { path: "trains/results", element: <TrainResults /> },
            { path: "cabs", element: <Cabs /> },
            { path: "cabs/search", element: <CabSearchResults /> },
            { path: "cabs/results", element: <CabResults /> },
            { path: "bus", element: <Bus /> },
            { path: "bus/results", element: <BusResults /> },
            { path: "holidays", element: <Holidays /> },
            { path: "holidays/results", element: <HolidayResults /> },
            { path: "booking", element: <Booking /> },
            { path: "booking-success/:id", element: <BookingSuccess /> },
            { path: "*", element: <ErrorPage /> },
        ]
    }
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
