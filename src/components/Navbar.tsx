import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="min-w-full fixed min-h-22 max-h-24 flex flex-wrap justify-around bg-white z-100">
      <div className="flex flex-wrap justify-around items-center w-2/3 text-gray-500 font-bold -translate-y-5">
        <NavLink to="/" end>
          <span className="flex justify-center">
            <img
              src="/logo.webp"
              alt="Goibibo"
              className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-auto ml-16"
            />
          </span>
        </NavLink>
        <NavLink
          to="/flights"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/plane.svg" alt="Flights" />
            Flights
          </div>
        </NavLink>
        <NavLink
          to="/hotel"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/hotel.svg" alt="Hotels" />
            Hotels
          </div>
        </NavLink>
        <NavLink
          to="/trains"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/train.svg" alt="Trains" />
            Trains
          </div>
        </NavLink>
        <NavLink
          to="/cabs"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/cab.svg" alt="Cabs" />
            Cabs
          </div>
        </NavLink>
        <NavLink
          to="/bus"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/bus.svg" alt="Bus" />
            Bus
          </div>
        </NavLink>
        <NavLink
          to="/holidays"
          className={({ isActive }) => (isActive ? "active-page" : "")}
        >
          <div className="text-center flex flex-wrap flex-col">
            <img src="/svg/holiday.svg" alt="Holidays" />
            Holidays
          </div>
        </NavLink>
      </div>
      <div className="flex flex-wrap justify-evenly items-center w-1/3 -translate-y-5">
        <NavLink to="/booking">
          <HoverCard>
            <HoverCardTrigger>
              <div className="text-center flex flex-wrap">
                <img src="/svg/bookingbag.svg" alt="Booking" />
                <div className="flex flex-wrap flex-col">
                  <div className="text-sm text-gray-500">Manage Booking</div>
                  <p className="text-gray-600 font-medium">My Trips</p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="bg-white mt-6 rounded-lg shadow-md shadow-gray-600 h-auto w-60 p-2 flex text-gray-400 text-sm flex-wrap text-center cursor-default">
                🟢 Access your bookings, easy cancellation, date change and much
                more
              </div>
            </HoverCardContent>
          </HoverCard>
        </NavLink>

        <NavLink to="/auth">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex text-blue-600 font-medium text-sm border-2 border-blue-600 rounded-lg p-1">
                <img src="/svg/userpfp.svg" alt="User" />
                <p className="p-2">Login/Signup</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <Card className="p-5 w-xs -translate-x-10 mt-5 rounded-lg shadow-md shadow-gray-600 cursor-default">
                <CardHeader>
                  <CardTitle>Hey Traveller</CardTitle>
                  <CardDescription>
                    Get exclusive deals & Manage your trips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center">
                    <Button
                      variant={"secondary"}
                      className="cursor-pointer p-2 w-60"
                      onClick={() => {}}
                    >
                      Login/Signup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;
