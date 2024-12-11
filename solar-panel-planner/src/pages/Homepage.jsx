import Footer from "../ui/Footer";
import Img1 from "../assets/image2.png";
import Img2 from "../assets/image1.png";
import Img3 from "../assets/image3.png";
import Img4 from "../assets/hero-back.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Homepage() {
  return (
    <main className="w-full bg-background">
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Img4})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{
            y: 70,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            SolarSync LA
          </h1>
          <h2 className="text-2xl md:text-2xl lg:text-4xl font-semibold text-white mt-2">
            Making solar energy adoption simple and accessible for LA residents.
          </h2>
          <p className="text-white text-lg mt-4">GO SOLAR, SAVE ENERGY</p>
          <Link
            to="/residentpage"
            className="bg-primaryGreen mt-6 text-white text-xl font-semibold px-9 py-5 transition rounded-lg shadow-md hover:bg-secondaryGreen"
          >
            Send a Request
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col gap-[120px] px-8 lg: py-[120px] bg-background md:px-[50px] lg:px-[100px]">
        <motion.div
          initial={{
            x: 70,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6"
        >
          <div className="text-center w-full lg:w-[590px] md:w-[400px] md:text-left">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">
              Request Your Solar Panel Evaluation
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our team will assess your property to determine the ideal solar
              panel system that suits your energy needs. Book an evaluation and
              start your journey toward sustainable energy today.
            </p>
          </div>
          <img
            src={Img1}
            alt="Send a Request"
            className="w-full md:w-[320px] lg:w-[450px] rounded-lg shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{
            x: -70,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between md: gap-16"
        >
          <img
            src={Img2}
            alt="Evaluation"
            className="w-full md:w-[320px] lg:w-[450px] rounded-lg shadow-xl"
          />
          <div className="text-center w-full lg:w-[590px] md:w-[400px] md:text-left">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">
              Solar Panel Evaluation
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our expert evaluators will visit your home to examine your roof,
              assess energy consumption, and explain the best options for your
              solar panel installation. We’ll guide you every step of the way.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: 70,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.45,
          }}
          viewport={{ once: true }}
          className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6 "
        >
          <div className="text-center w-full lg:w-[590px] md:w-[400px] md:text-left">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">
              Solar Panel Installation
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Once your evaluation is complete, our certified installation team
              will install your solar panels with the utmost care and precision,
              ensuring efficiency and durability. Begin saving on energy bills
              immediately.
            </p>
          </div>
          <img
            src={Img3}
            alt="Installation"
            className="w-full md:w-[320px] lg:w-[450px] rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
      <h2 className="text-4xl font-semibold text-center text-gray-800">
        Make an appointment now
      </h2>

      <div className="flex justify-center py-12">
        <Link
          to="/residentpage"
          className="bg-primaryGreen text-white text-xl font-semibold px-9 py-5 transition rounded-lg shadow-md hover:bg-secondaryGreen"
        >
          Send a Request
        </Link>
      </div>
      <Footer />
    </main>
  );
}

export default Homepage;
