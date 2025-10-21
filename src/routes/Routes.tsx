import MainLayout from "@/layouts/MainLayout";
import Booking from "@/pages/Booking";
import Bus from "@/pages/Bus";
import Cabs from "@/pages/Cabs";
import ErrorPage from "@/pages/ErrorPage";
import Flight from "@/pages/Flight";
import Holidays from "@/pages/Holidays";
import Hotel from "@/pages/Hotel";
import Trains from "@/pages/Trains";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            {
                path: "/",
                Component: Flight
            },
            {
                path: "/flights",
                Component: Flight
            },
            {
                path: "/hotel",
                Component: Hotel
            },
            {
                path: "/trains",
                Component: Trains
            },
            {
                path: "/cabs",
                Component: Cabs
            },
            {
                path: "/bus",
                Component: Bus
            },
            {
                path: "/holidays",
                Component: Holidays
            },
            {
                path: "/booking",
                Component: Booking,
            },
            {
                path: "*",
                Component: ErrorPage,
            },
        ]
    }
]);
export default function AppRouter() {
    return <RouterProvider router={router} />
}