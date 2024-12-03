import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Img1 from "../assets/image2.png";
import Img2 from "../assets/image1.png";
import Img3 from "../assets/image3.png";
import Img4 from "../assets/hero-back.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addAppointment } from "../utils/appointmentsSlice";
import { useEffect } from "react";

function Homepage() {
  const dispatch = useDispatch();
  // const [selectedForm, setSelectedForm] = useState(null);
  const appointments = useSelector((state) => state.appointments.appointments);
  useEffect(() => {
    const requestItems = JSON.parse(localStorage.getItem("request"));
    dispatch(addAppointment(requestItems));
    
  }, []);

console.log(appointments)

  return (
    <main className="w-full bg-background">
      <Navbar />

      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Img4})`,
        }}
      >
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
            <button className="mt-6 px-6 py-3 transition bg-primaryYellow hover:bg-primaryYellow text-white font-bold rounded-lg">
              Send Request
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-16 px-6 py-12 bg-background md: px-20">
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6">
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">Request Your Solar Panel Evaluation</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our team will assess your property to determine the ideal solar panel system that suits your energy needs.
              Book an evaluation and start your journey toward sustainable energy today.
            </p>
          </div>
          <img
            src={Img1}
            alt="Send a Request"
            className="w-full md:w-2/5 rounded-lg shadow-xl"
          />
        </div>
      
        <div className="flex flex-col md:flex-row items-center justify-between md: gap-16">
          <img
            src={Img2}
            alt="Evaluation"
            className="w-full md:w-2/5 rounded-lg shadow-xl"
          />
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">Solar Panel Evaluation</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our expert evaluators will visit your home to examine your roof, assess energy consumption, and explain
              the best options for your solar panel installation. We’ll guide you every step of the way.
            </p>
          </div>
        </div>
      
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-6">
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">Solar Panel Installation</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Once your evaluation is complete, our certified installation team will install your solar panels with
              the utmost care and precision, ensuring efficiency and durability. Begin saving on energy bills immediately.
            </p>
          </div>
          <img
            src={Img3}
            alt="Installation"
            className="w-full md:w-2/5 rounded-lg shadow-xl"
          />
        </div>
      </div>
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
