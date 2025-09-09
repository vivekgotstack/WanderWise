import MainLayout from "@/layouts/MainLayout";
import BusLoader from "@/loaders/BusLoader";
import CabsLoader from "@/loaders/CabsLoader";
import FlightLoader from "@/loaders/FlightLoader";
import HolidaysLoader from "@/loaders/HolidaysLoader";
import HotelLoader from "@/loaders/HotelLoader";
import TrainsLoader from "@/loaders/TrainsLoader";
import Booking from "@/pages/Booking";
import Bus from "@/pages/Bus";
import Cabs from "@/pages/Cabs";
import ErrorPage from "@/pages/ErrorPage";
import Flight from "@/pages/Flight";
import Holidays from "@/pages/Holidays";
import Hotel from "@/pages/Hotel";
import Trains from "@/pages/Trains";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router= createBrowserRouter([
    {
        Component:MainLayout,
        children:[
            {
                path:"/",
                Component:Flight,
                loader:FlightLoader
            },
            {
                path:"/flights",
                Component:Flight,
                loader:FlightLoader
            },
            {
                path:"/hotel",
                Component:Hotel,
                loader:HotelLoader
            },
            {
                path:"/trains",
                Component:Trains,
                loader:TrainsLoader,
            },
            {
                path:"/cabs",
                Component:Cabs,
                loader:CabsLoader,
            },
            {
                path:"/bus",
                Component:Bus,
                loader:BusLoader,
            },
            {
                path:"/holidays",
                Component:Holidays,
                loader:HolidaysLoader,
            },
            {
                path:"/booking",
                Component:Booking,
            },
            {
                path:"*",
                Component:ErrorPage,
            },
        ]
    }
]);
export default function AppRouter(){
    return <RouterProvider router={router}/>
}