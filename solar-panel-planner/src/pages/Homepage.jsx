// import { useState } from "react";
// import RoleSelection from "../RoleSelection";
// import ResidentForm from "../ResidentForm";
// import AdminForm from "../AdminForm";
// import landingpage from "../assets/landingpage.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Img1 from "../assets/img1.jpg"
import Img2 from "../assets/img2.webp"
import Img3 from "../assets/img3.jpeg"
import ShowMap from "../ShowMap";
import Img4 from "../assets/hero-back.jpg"
import { Link } from "react-router-dom";

function Homepage() {
  // const [selectedForm, setSelectedForm] = useState(null);


  return (
    <main className="w-full bg-background">
      <Navbar />
      {/* <img className="w-full" src={landingpage} alt="landingpage" />
      <RoleSelection setSelectedForm={setSelectedForm} />

      {selectedForm === "resident" && <ResidentForm />}
      {selectedForm === "admin" && <AdminForm />} */}

      <ShowMap />

<div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Img4})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        SolarSync LA
        </h1>
        <h2 className="text-2xl md:text-2xl lg:text-4xl font-semibold text-white mt-2">
        Making solar energy adoption simple and accessible for LA residents.
        </h2>
        <p className="text-white text-lg mt-4">GO SOLAR, SAVE ENERGY</p>
        <Link to="/residentpage">
        <button className="mt-6 px-6 py-3 bg-primaryYellow hover:bg-primaryYellow text-white font-bold rounded-lg">
          Send Request
        </button></Link>
      </div>
    </div>


      <div className="flex flex-col gap-12 px-6 py-12 ">
      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6">
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-bold mb-4">Send a Request</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <img
          src={Img1}
          alt="Send a Request"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center md:gap-6">
        <img
          src={Img2}
          alt="Evaluation"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-bold mb-4">Evaluation</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6 ">
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <img
          src={Img3}
          alt="Installation"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
      </div>
    </div>
    <div className="flex justify-center py-12">
      <Link to="/residentpage" className="bg-primaryGreen text-white text-xl font-semibold px-9 py-5 rounded-lg shadow-md hover:bg-secondaryGreen">
        Send a Request
      </Link>
    </div>
    <Footer />
    </main>
  );
}

export default Homepage;
