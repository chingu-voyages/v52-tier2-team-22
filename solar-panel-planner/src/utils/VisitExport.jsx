import DownloadIcon from "../assets/download_icon.png";
import { useEffect, useState } from "react";
import { exportListPDF } from "./exportingPDF";
import moment from "moment";
import { motion } from "framer-motion";

export default function VisitList({ listOfDay, selectedDay, listOfToday }) {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const today = moment().format("YYYY-MM-DD");

  const exportList = (selectedDay === today ? listOfToday : listOfDay)
    .filter((user) => user.status === "confirmed")
    .map((user) => ({
      coord: user.address.coord,
      name: user.name,
      phone: user.phone,
      address: user.address.combinedAddress,
      email: user.email,
      date: user.requestDate,
    }));

  const startPoint = {
    name: "Los Angeles City Hall",
    address: "200 North Spring St",
    coord: { lat: 34.05396246411889, lng: -118.24267476192357 },
  };

  useEffect(() => {
    if (isAlertVisible) {
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  const getRoute = async () => {
    if (!exportList.length) return setIsAlertVisible(true);

    setIsAlertVisible(false);
    const getOptimizedRoute = async () => {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = startPoint.coord;
      const destination = exportList[exportList.length - 1].coord;
      const waypoints = exportList.slice(0, -1).map((address) => ({
        location: `${address.coord.lat},${address.coord.lng}`,
        stopover: true,
      }));

      await directionsService?.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(
            destination.lat,
            destination.lng
          ),
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === "OK") {
            const optimizedOrder = result.routes[0].waypoint_order;

            // Rearrange addresses based on the optimized order
            const ordered = [
              startPoint, // Add the starting point
              ...optimizedOrder.map((index) => exportList[index]), // Adjust for slice(1, -1)
              exportList[exportList.length - 1], // Add the endpoint
            ];
            const orderedAddresses = ordered;
            exportListPDF(orderedAddresses, selectedDay);
          } else {
            alert("Failed to retrieve directions: " + status);
          }
        }
      );
    };
    await getOptimizedRoute();
  };

  return (
    <motion.div className="text-center">
      <button
        onClick={getRoute}
        className="bg-primaryGreen text-white px-7 py-2 rounded hover:bg-secondaryGreen"
      >
        Export {selectedDay === today ? "today's" : selectedDay} route
        <img src={DownloadIcon} className="h-5 pl-2 inline mb-1" />
      </button>
      {isAlertVisible && (
        <motion.p
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className="text-red-500 font-semibold"
        >
          No requests for selected day.
        </motion.p>
      )}
    </motion.div>
  );
}
