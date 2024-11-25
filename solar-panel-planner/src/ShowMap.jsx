import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { userDb } from "./userDb";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ShowMap() {
  const coordLA = { lat: 34.0549, lng: -118.2426 };
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [markerID, setMarkerID] = useState(null);
  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          style={{ width: "80vw", height: "80vh", margin: "0 auto" }}
          defaultCenter={coordLA}
          defaultZoom={10}
          gestureHandling={"greedy"}
          // disableDefaultUI={true}
        />

        {userDb.map((user) => (
          <AdvancedMarker
            ref={markerRef}
            // isOpen={user.id == markerID}
            // onClick={() => setMarkerID(isOpen ? null : user.id)}
            position={user.address.coord}
            key={user.id}
            title={"AdvancedMarker that opens an Infowindow when clicked."}
          ></AdvancedMarker>
        ))}
      </APIProvider>
    </>
  );
}
