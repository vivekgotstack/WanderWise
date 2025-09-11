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
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

function Navbar() {
  const currentTheme = useContext(ThemeContext);
  if (!currentTheme) return null;
  return (
    <div
      className={`min-w-full fixed min-h-22 max-h-24 flex flex-wrap ${
        currentTheme.theme === "light" ? "bg-gradient-to-r from-white to-gray-200" : "bg-gray-800"
      } justify-around z-100`}
    >
      <div
        className={`flex flex-wrap justify-around items-center w-2/3 font-bold -translate-y-5 ${
          currentTheme.theme === "light" ? "text-gray-500" : "text-gray-200"
        }`}
      >
        <a href="/">
          <span className="flex justify-center">
            <img
              src="/logo.webp"
              alt="Goibibo"
              className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-auto ml-16"
            />
          </span>
        </a>
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
                  <div
                    className={`text-sm ${
                      currentTheme.theme === "light"
                        ? "text-gray-500"
                        : "text-gray-200"
                    }`}
                  >
                    Manage Booking
                  </div>
                  <p
                    className={`${
                      currentTheme.theme === "light"
                        ? "text-gray-600"
                        : "text-gray-300"
                    } font-medium`}
                  >
                    My Trips
                  </p>
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
        <button
          id="theme"
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={currentTheme.toggleTheme}
        >
          {currentTheme.theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1M2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1m-6 8a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0zm5.364-3.05a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414zM4.929 4.929a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414M7.05 18.364a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414zM19.071 4.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M7 12a5 5 0 1 1 10 0a5 5 0 0 1-10 0" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.058 20q-3.334 0-5.667-2.333T4.058 12q0-3.039 1.98-5.27t4.904-2.634q.081 0 .159.006t.153.017q-.506.706-.801 1.57T10.158 7.5q0 2.667 1.866 4.533t4.534 1.867q.951 0 1.813-.295t1.548-.801q.012.075.017.153t.006.159q-.384 2.923-2.615 4.903T12.057 20" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
export default Navbar;
