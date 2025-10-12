import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { useLocation, NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/ThemeContext";

function Navbar() {
  const currentTheme = useTheme();
  const location = useLocation();

  return (
    <nav className={`fixed top-0 left-0 w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-10 md:py-4 shadow-sm ${currentTheme.theme === "light"
      ? "bg-gradient-to-r from-white to-gray-200 text-gray-600"
      : "bg-gray-800 text-gray-200"
      } z-50`}
    >
      <div className="flex flex-shrink-0 items-center justify-between w-full md:w-auto mb-2 md:mb-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 relative ${isActive ? "active" : ""}`
          }
        >
          <img
            src={currentTheme.theme === "light" ? "/logo.png" : "/logo1.png"}
            alt="WanderWise"
            className="h-10 sm:h-12 md:h-14 w-auto"
          />
        </NavLink>
        <button
          id="theme"
          className="ml-4 sm:mr-4 text-gray-400 hover:text-gray-600"
          onClick={currentTheme.toggleTheme}
        >
          {currentTheme.theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#999798"
                fillRule="evenodd"
                d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1M2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1m-6 8a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0zm5.364-3.05a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414zM4.929 4.929a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414M7.05 18.364a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414zM19.071 4.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M7 12a5 5 0 1 1 10 0a5 5 0 0 1-10 0"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12.058 20q-3.334 0-5.667-2.333T4.058 12q0-3.039 1.98-5.27t4.904-2.634q.081 0 .159.006t.153.017q-.506.706-.801 1.57T10.158 7.5q0 2.667 1.866 4.533t4.534 1.867q.951 0 1.813-.295t1.548-.801q.012.075.017.153t.006.159q-.384 2.923-2.615 4.903T12.057 20" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center gap-4 md:gap-6 w-full md:w-auto mb-3 md:mb-0">
        {[
          { to: "/flights", icon: "/svg/plane.svg", label: "Flights" },
          { to: "/hotel", icon: "/svg/hotel.svg", label: "Hotels" },
          { to: "/trains", icon: "/svg/train.svg", label: "Trains" },
          { to: "/cabs", icon: "/svg/cab.svg", label: "Cabs" },
          { to: "/bus", icon: "/svg/bus.svg", label: "Bus" },
          { to: "/holidays", icon: "/svg/holiday.svg", label: "Holidays" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item flex flex-col items-center text-center ${isActive || (item.to === "/flights" && location.pathname === "/") ? "active" : ""
              }`
            }
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6 mb-1" />
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-6 mt-3 md:mt-0">
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            `flex items-center text-center flex-shrink-0 sm:ml-12 ${isActive ? "border-2 p-2 border-indigo-500 rounded-md" : ""}`
          }
        >
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center text-center">
                <img
                  src="/svg/bookingbag.svg"
                  alt="Booking"
                  className="w-6 h-6 mr-1"
                />
                <div className="flex flex-col leading-tight">
                  <span
                    className={`text-xs ${currentTheme.theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300"
                      }`}
                  >
                    Manage Booking
                  </span>
                  <span
                    className={`text-sm font-medium ${currentTheme.theme === "light"
                      ? "text-gray-700"
                      : "text-gray-200"
                      }`}
                  >
                    My Trips
                  </span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="bg-gray-200 mt-3 rounded-lg shadow-md text-gray-900 text-sm p-3 text-center w-56">
                🟢 Access your bookings, cancellations, and date changes.
              </div>
            </HoverCardContent>
          </HoverCard>
        </NavLink>

        <HoverCard>
          <HoverCardTrigger>
            <div className="flex items-center border-2 border-indigo-400 text-indigo-400 rounded-lg px-2 py-1 text-xs font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-indigo-400 mr-1 sm:translate-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <NavLink to="login">
                <span className="whitespace-nowrap sm:block md:hidden lg:block">Login/Signup</span>
              </NavLink>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <Card className="p-5 bg-gray-200 w-64 mt-3 rounded-lg shadow-md shadow-gray-600 cursor-default">
              <CardHeader>
                <CardTitle>Hey Traveller</CardTitle>
                <CardDescription className="text-black">
                  Get exclusive deals & manage your trips
                </CardDescription>
              </CardHeader>

              <CardContent>
                <NavLink to="/login">
                  <div className="flex justify-center">
                    <Button
                      className="cursor-pointer bg-indigo-500 text-white w-full p-2"
                      onClick={() => { }}
                    >
                      Login/Signup
                    </Button>
                  </div>
                </NavLink>
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      </div >
    </nav >
  );
}

export default Navbar;
