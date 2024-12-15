import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-800 overflow-hidden flex-col md:flex-row gap-10 py-10 flex justify-between md:px-20 px-8 text-white text-center"
    >
      <div className="flex flex-col md:w-2/6">
        <p>
          This{" "}
          <Link
            className="text-primaryYellow underline transition"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/chingu-voyages/v52-tier2-team-22"
          >
            app
          </Link>{" "}
          has been made as a part of{" "}
          <Link
            className="text-primaryYellow underline transition"
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.chingu.io/"
          >
            Chingu&apos;s
          </Link>{" "}
          Voyage 52, team 22, on December 2024, which lasted 6 weeks, following
          Scrum framework to building web application
        </p>
        <p className="mt-6">
          &copy; {new Date().getFullYear()} SolarSync LA. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <span className="flex">
          <p>Anita Boakye-Yiadom - Scrum Master</p>
          <Link
            className="text-primaryYellow underline transition ml-2"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/AnitaBoakye"
          >
            Github
          </Link>
        </span>

        <span className="flex">
          <p>Predrag Jandric - Developer</p>
          <Link
            className="text-primaryYellow underline transition ml-2"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/Predrag-Jandric"
          >
            Github
          </Link>
        </span>

        <span className="flex">
          <p>Ayumi Sato - Developer</p>
          <Link
            className="text-primaryYellow underline transition ml-2"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/ayumi-ayumi"
          >
            Github
          </Link>
        </span>

        <span className="flex">
          <p>Noora Saleh - Scrum Master</p>
          <Link
            className="text-primaryYellow underline transition ml-2"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/NooraHakim1"
          >
            Github
          </Link>
        </span>

        <span className="flex">
          <p>Ikram Maizi - Developer</p>
          <Link
            className="text-primaryYellow underline transition ml-2"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/ikrammaizi"
          >
            Github
          </Link>
        </span>
      </div>
    </motion.footer>
  );
}
