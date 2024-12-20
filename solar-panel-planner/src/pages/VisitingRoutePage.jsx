import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import VisitExport from "../utils/VisitExport.jsx";
import DirectionsMap from "../ui/DirectionsMap.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function VisitingRoutePage() {
  const location = useLocation();
  const { listOfDay, selectedDay, listOfToday } = location.state;
  const today = moment().format("YYYY-MM-DD");
  const [orderedList, setOrderedList] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [directionsResult, setDirectionsResult] = useState({});

  const exportList = (selectedDay === today ? listOfToday : listOfDay).map(
    (user) => ({
      id: user.id,
      status: user.status,
      name: user.name,
      phone: user.phone,
      address: user.address,
      email: user.email,
      requestDate: user.requestDate,
    })
  );

  const startPoint = {
    id: 0,
    name: "Los Angeles City Hall",
    address: {
      combinedAddress: "200 North Spring St",
      zipcode: "90012",
      coord: { lat: 34.05396246411889, lng: -118.24267476192357 },
    },
    date: "",
  };

  useEffect(() => {
    const getRoute = async () => {
      if (!exportList.length) return setIsAlertVisible(true);

      setIsAlertVisible(false);
      const getOptimizedRoute = async () => {
        const directionsService = new window.google.maps.DirectionsService();

        const startLatLng = new window.google.maps.LatLng(
          startPoint.address.coord.lat,
          startPoint.address.coord.lng
        );

        let maxDistance = -1;
        let farthestAddress = null;
        exportList.forEach((user) => {
          const userLatLng = new window.google.maps.LatLng(
            user.address.coord.lat,
            user.address.coord.lng
          );
          const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              startLatLng,
              userLatLng
            );
          if (distance > maxDistance) {
            maxDistance = distance;
            farthestAddress = user;
          }
        });
        const destination = farthestAddress.address.coord;

        const waypoints = exportList
          .filter((user) => user !== farthestAddress)
          .map((user) => ({
            location: `${user.address.coord.lat},${user.address.coord.lng}`,
            stopover: true,
          }));

        await directionsService?.route(
          {
            origin: startLatLng,
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
              setDirectionsResult(result);

              const ordered = [
                startPoint,
                ...optimizedOrder.map(
                  (index) =>
                    exportList.filter((user) => user !== farthestAddress)[index]
                ),
                farthestAddress,
              ];
              setOrderedList(ordered);
            } else {
              alert("Failed to retrieve directions: " + status);
            }
          }
        );
      };
      await getOptimizedRoute();
    };
    getRoute();
  }, []);

  return (
    <div>
      <div className="text-left m-6">
      <Link
        className="inline-flex items-center gap-2 text-gray-800 hover:text-gray-400 font-medium my-2 py-2 px-4 rounded transition duration-200"
        to="/admin"
      >
        <FiArrowLeft className="w-5 h-5" />
        Go back to all data
      </Link>
      </div>
      <VisitExport
        orderedList={orderedList}
        isAlertVisible={isAlertVisible}
        selectedDay={selectedDay ? selectedDay : today}
      />
      <div className="flex flex-col overflow-auto rounded-lg shadow-md m-6">
        <div className="flex items-center justify-between px-6 py-4 bg-primaryGreen text-white text-center rounded-t-lg">
          <h2 className="text-lg text-white text-center font-semibold">
            All Appointment Requests
          </h2>
        </div>

        <table className="w-full border-collapse bg-background rounded-b-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3 flex w-fit items-center">Status</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3 min-w-[15rem]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderedList.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`text-sm text-gray-800 ${
                  index % 2 === 0 ? "bg-background" : "bg-white"
                }`}
              >
                <td className="px-6 py-3 border-t border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.status}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.name}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.email}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.phone}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.address.combinedAddress +
                    " " +
                    appointment.address.zipcode}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.requestDate
                    ? moment(appointment.requestDate).format(
                        "MMMM Do YYYY, h:mm a"
                      )
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6">
        <DirectionsMap
          orderedList={orderedList}
          directionsResult={directionsResult}
        />
      </div>
    </div>
  );
}
