import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo1.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-stone-200 py-1 px-8 text-grey-800">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="h-12 hover:bg-red-300 transition"
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
            <Link to="/residentpage" className="font-semibold">
              Send Request
            </Link>
          </li>
          <li>
            <Link to="/adminpage" className="font-semibold">
              Admin
            </Link>
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
