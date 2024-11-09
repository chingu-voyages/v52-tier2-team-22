import { useState } from "react";
import RoleSelection from "./RoleSelection";
import ResidentForm from "./ResidentForm";
import AdminForm from "./AdminForm";

function App() {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <main className="h-screen w-full">
      {/* <ResidentForm /> */}
      <RoleSelection setSelectedForm={setSelectedForm} />

      {selectedForm === "resident" && <ResidentForm />}
      {selectedForm === "admin" && <AdminForm />}
    </main>
  );
}

export default App;
