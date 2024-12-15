import Layout from "./Layout";
import AdminPage from "./pages/AdminPage";
import Homepage from "./pages/Homepage";
import ResidentPage from "./pages/ResidentPage";
import VisitingRoutePage from "./pages/VisitingRoutePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminForm from "./ui/AdminForm";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/adminlogin" element={<AdminForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/visiting_route" element={<VisitingRoutePage />} />
          <Route path="/residentpage" element={<ResidentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
