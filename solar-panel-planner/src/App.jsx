import ResidentForm from "./ResidentForm";
import { useState } from "react";
import RoleSelection from "./RoleSelection";

function App() {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <main className="h-screen w-full">
      {/* <ResidentForm /> */}
      <RoleSelection setSelectedForm={setSelectedForm} />

      {selectedForm === "resident" && <ResidentForm />}
      {selectedForm === "admin" && <p>admin</p>}
    </main>
  );
}

export default App;
