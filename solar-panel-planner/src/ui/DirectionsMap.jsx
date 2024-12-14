import { useEffect, useRef } from "react";

function DirectionsMap({ orderedList, directionsResult}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!orderedList || !orderedList.length) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 34.0549, lng: -118.2426 },
      zoom: 10,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map); 
    directionsRenderer.setDirections(directionsResult);
    const routePoints = [
      orderedList[0], // Start point
      ...orderedList.slice(1, -1), // Waypoints
      orderedList[orderedList.length - 1], // End point
    ];

    routePoints.forEach((point, index) => {
      new window.google.maps.Marker({
        position: {
          lat: point.address.coord.lat,
          lng: point.address.coord.lng,
        },
        map: map,
        label: `${index + 1}`, // Numbered label
      });
    });

  }, [orderedList]);

  return <div ref={mapRef} style={{ width: "80vw", height: "80vh", margin: "0 auto" }} />;
}

export default DirectionsMap;