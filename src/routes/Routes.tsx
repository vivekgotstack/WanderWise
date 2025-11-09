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

const router = createBrowserRouter([

    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    {
        path: "/",
        element: <AuthLayout><MainLayout /></AuthLayout>,
        children: [
            { path: "flights", element: <Flight /> },
            { path: "hotel", element: <Hotel /> },
            { path: "trains", element: <Trains /> },
            { path: "cabs", element: <Cabs /> },
            { path: "bus", element: <Bus /> },
            { path: "holidays", element: <Holidays /> },
            { path: "booking", element: <Booking /> },
            { path: "*", element: <ErrorPage /> },
        ]
    }
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
