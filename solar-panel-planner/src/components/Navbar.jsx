import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo1.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-navbarBackground py-1 px-8 text-grey-800 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="h-12"
          />
        </Link>

        <button
          className="block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
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

        <ul className="hidden md:flex flex-row space-x-6 py-4">
          <li>
            <NavLink
              to="/residentpage"
              className={({ isActive }) =>
                `hover:font-bold hover:text-grey-700 ${
                  isActive ? "font-bold text-grey-700" : "font-semibold text-grey-500"
                }`
              }
            >
              Send Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adminpage"
              className={({ isActive }) =>
                `hover:font-bold hover:text-grey-700 ${
                  isActive ? "font-bold text-grey-700" : "font-semibold text-grey-500"
                }`
              }
            >
              Admin
            </NavLink>
          </li>
</ul>
      </div>

      {isOpen && (
        <ul className="flex flex-col items-end mt-4 space-y-4 md:hidden">
          <li>
            <Link to="/residentpage" className="hover:underline">
              Send Request
            </Link>
          </li>
          <li>
            <Link to="/adminpage" className="hover:underline">
              Admin
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
