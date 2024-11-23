import AdminPage from "./pages/AdminPage";
import ResidentPage from "./pages/ResidentPage";
import Homepage from "./pages/Homepage";
import ResidentForm from './ResidentForm'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/residentform" element={<ResidentForm />} />
        <Route path="/residentpage" element={<ResidentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
