import { useEffect, useRef } from "react";

function DirectionsMap({ orderedList, directionsResult }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!orderedList || !orderedList.length) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 34.0549, lng: -118.2426 },
      zoom: 10,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true,
    });
    directionsRenderer.setDirections(directionsResult);
    const routePoints = [
      orderedList[0],
      ...orderedList.slice(1, -1),
      orderedList[orderedList.length - 1],
    ];

    routePoints.forEach((point, index) => {
      new window.google.maps.Marker({
        position: {
          lat: point.address.coord.lat,
          lng: point.address.coord.lng,
        },
        map: map,
        label: `${index + 1}`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "yellow",
          fillOpacity: 1,
          strokeColor: "black",
          strokeWeight: 1,
        },
      });
    });
  }, [orderedList]);

  return (
    <div
      ref={mapRef}
      style={{ width: "80vw", height: "80vh", margin: "0 auto" }}
    />
  );
}

export default DirectionsMap;
