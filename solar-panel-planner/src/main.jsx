import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <APIProvider apiKey={API_KEY} libraries={["marker", "geometry"]}>
        <App />
      </APIProvider>
    </Provider>
  </StrictMode>
);
