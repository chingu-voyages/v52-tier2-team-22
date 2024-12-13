import DownloadIcon from "../assets/download-icon.png";
import { useState } from "react";
import { exportListPDF } from "../helperFunction/exportingPDF";

export default function VisitList({ listOfDay, selectedDay, listOfToday }) {
  const [error, setError] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const exportList = (selectedDay ? listOfDay : listOfToday).map((user) => ({
    coord: user.address.coord,
    name: user.name,
    phone: user.phone,
    address: user.address.combinedAddress,
    email: user.email,
    date: user.requestDate,
  }));

  const startPoint = ({
    name: "Los Angeles City Hall",
    address:  "200 North Spring St",
    coord: {lat: 34.05396246411889,
   lng: -118.24267476192357}
    })
    
  const getRoute= async () =>{
    if (exportList.length > 2){
      setIsAlertVisible(false)
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
              setError("Failed to retrieve directions: " + status);
            }
          }
        );
      }
      await getOptimizedRoute()}
  else{
    setIsAlertVisible(true);
  }};

  return (
    <div className="text-center">
      <button
        onClick={getRoute}
        className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-secondaryGreen"
      >
        Export {selectedDay ? selectedDay : "today's"} route 
        <img src={DownloadIcon} className="h-5 pl-2 inline mb-1" />
      </button>
      {isAlertVisible && (
          <div className="">
            <p>No requests for the selected day.</p>
          </div>
      )}
    </div>
  );
}


