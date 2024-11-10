import AdminPage from "./pages/AdminPage";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
