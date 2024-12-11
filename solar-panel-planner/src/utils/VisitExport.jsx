import moment from "moment";
import { jsPDF } from "jspdf";
import DownloadIcon from "../assets/download-icon.png";


export default function VisitList({ listOfDay, selectedDay }) {
  const exportList = listOfDay?.map((user) => ({
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
            ...optimizedOrder.map((index) => exportList[index + 1]), // Adjust for slice(1, -1)
            exportList[exportList.length - 1], // Add the endpoint
          ];
          const orderedAddresses = ordered;
          exportToPDF(orderedAddresses);
        } else {
          setError("Failed to retrieve directions: " + status);
        }
      }
    );
  };

  const exportToPDF = (orderedAddresses) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight(); 
    const pageWidth = doc.internal.pageSize.getWidth();
    const lineHeight = 5;
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;

    let y = 16; 
    doc.setFontSize(14);
    doc.text(`Optimized Route Addresses for ${selectedDay}`, margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.text("1. Los Angeles City Hall", margin, y);
    y += 10;

    orderedAddresses.forEach((address, index) => {
        if (index !== 0) {
            const details = `${index + 1}. ${address.name}, 
            Time: ${moment(address.date).format("h:mm a")}, 
            Address: ${address.address}, 
            Phone: ${address.phone}, 
            Email: ${address.email}`;
            const splitText = doc.splitTextToSize(details, contentWidth);

            splitText.forEach((line) => {
                if (y + lineHeight > pageHeight - margin) {
                    doc.addPage(); 
                    y = margin;
                }
                doc.text(line, margin, y);
                y += lineHeight;
            });

            y += 4;
        }
    });

    doc.save("optimized_route.pdf");
  };

  return (
    <div className="">
      <button
        onClick={getOptimizedRoute}
        className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-secondaryGreen"
      >
        Export {selectedDay} route 
        <img src={DownloadIcon} className="h-5 pl-2 inline mb-1" />
      </button>
    </div>
  );
}


