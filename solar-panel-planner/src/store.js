import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./utils/appointmentsSlice";
import { userDb } from "./utils/userDb";
import { loadState } from "./utils/localStorageUtils";

const requestsLocalStorage = loadState("requests");
const myRequestsLocalStorage = loadState("myRequest");
const persistedState = setPersistedState();

function setPersistedState() {
  if (requestsLocalStorage) return requestsLocalStorage;
  if (myRequestsLocalStorage && !requestsLocalStorage)
    return { appointments: [...userDb, myRequestsLocalStorage] };
  if (myRequestsLocalStorage && requestsLocalStorage)
    return [...requestsLocalStorage, myRequestsLocalStorage];
  return { appointments: userDb };
}

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
  preloadedState: {
    appointments: persistedState,
  },
  middleware: localStorage.setItem("requests", JSON.stringify(persistedState)),
});

store.subscribe(() => {
  localStorage.setItem(
    "requests",
    JSON.stringify(store.getState().appointments)
  );
});

export default store;
