import { useState } from "react";
import RoleSelection from "../RoleSelection";
import ResidentForm from "../ResidentForm";
import AdminForm from "../AdminForm";
import landingpage from "../assets/landingpage.png";

function Homepage() {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <main className="h-screen w-full">
      <img className="w-full h-[70vh]" src={landingpage} alt="landingpage" />
      <RoleSelection setSelectedForm={setSelectedForm} />

      {selectedForm === "resident" && <ResidentForm />}
      {selectedForm === "admin" && <AdminForm />}
    </main>
  );
}

export default Homepage;
