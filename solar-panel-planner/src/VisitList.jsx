import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useJsApiLoader } from "@react-google-maps/api";
import moment from "moment";
import { jsPDF } from "jspdf";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export default function VisitList() {
    const userDb = useSelector((state) => state.appointments.appointments)
    const addressList = userDb?.map((user) => 
      ({coord: user.address.coord,
        name: user.name,
        phone: user.phone,
        address: user.address.combinedAddress,
        date: user.requestDate
      }))
    const [orderedAddresses, setOrderedAddresses] = useState([]);
    const [error, setError] = useState(null);
    // const { isLoaded, loadError } = useJsApiLoader({
    //   googleMapsApiKey: API_KEY,
    // });
    // const [directionsService, setDirectionsService] = useState(null);
    // useEffect(() => {
    //   if (isLoaded) {
    //     setDirectionsService(new window.google.maps.DirectionsService());
        
    //   }
    // }, [isLoaded]);
  
    const getOptimizedRoute = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = addressList[0].coord; // Starting point
      const destination = addressList[addressList.length - 1].coord; // End point
      const waypoints = addressList.slice(5, -1).map((address) => ({
        location: `${address.coord.lat},${address.coord.lng}`,
        stopover: true,
      }));
  
      directionsService?.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true, // Enables waypoint optimization
        },
        (result, status) => {
          if (status === "OK") {
            const optimizedOrder = result.routes[0].waypoint_order;
  
            // Rearrange addresses based on the optimized order
            const ordered = [
              addressList[0], // Add the starting point
              ...optimizedOrder.map((index) => addressList[index + 1]), // Adjust for slice(1, -1)
              addressList[addressList.length - 1], // Add the endpoint
            ];
  
            setOrderedAddresses(ordered);
            exportToPDF()
          } else {
            setError("Failed to retrieve directions: " + status);
          }
        }
      );
    }

    const exportToPDF = () => {
      const doc = new jsPDF();
      let y = 10; 
  
      doc.setFontSize(16);
      doc.text("Optimized Route Addresses", 10, y);
      y += 10;
  
      doc.setFontSize(12);
      orderedAddresses.forEach((address, index) => {
        doc.text(`${index + 1}. ${address.name}`, 10, y);
        y += 6;
        doc.text(`Address: ${address.address}`, 10, y); 
        y += 6;
        doc.text(`Phone: ${address.phone}`, 10, y);
        y += 6;
        doc.text(`Date: ${moment(address.date).format("YYYY-MM-DD")}`, 10, y);
        y += 10;
      });

      doc.save("optimized_route.pdf");
    };

  return (

    <div className="p-8">
      <button
        onClick={getOptimizedRoute}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Export today's route
      </button>
    </div>
  )
}
