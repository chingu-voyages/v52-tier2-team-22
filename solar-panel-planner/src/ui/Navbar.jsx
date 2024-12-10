import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo1.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-navbarBackground py-1 px-8 text-grey-800 shadow-sm z-50 relative">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-12" />
        </Link>

        <button
          className="block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 hover:rotate-180 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <ul className="hidden md:flex flex-row gap-3 p-4">
          {[
            { to: "/", label: "Home" },
            { to: "/residentpage", label: "Send Request" },
            { to: "/admin", label: "Admin" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `transition-colors font-semibold duration-300 px-4 py-2 rounded-lg text-lg ${
                    isActive
                      ? " text-gray-900 bg-gray-300" // Active state
                      : " text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile nav */}
      {isOpen && (
        <ul className="flex flex-col items-end mt-4 space-y-4 p-4 md:hidden">
          {[
            { to: "/", label: "Home" },
            { to: "/residentpage", label: "Send Request" },
            { to: "/admin", label: "Admin" },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={
                  "transition-all duration-300 px-4 py-2 rounded-lg text-lg w-full text-right hover:mr-3 hover:font-semibold"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
