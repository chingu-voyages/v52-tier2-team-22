import AdminPage from "./pages/AdminPage";
import Homepage from "./pages/Homepage";
import ResidentPage from './pages/ResidentPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/residentpage" element={<ResidentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
