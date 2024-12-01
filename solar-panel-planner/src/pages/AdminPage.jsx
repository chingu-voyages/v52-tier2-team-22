import AdminDataTable from "../ui/AdminDataTable";
import AdminForm from "../ui/AdminForm";
import { useState } from "react";
import Navbar from "../components/Navbar";

function AdminPage() {
const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="w-full h-screen bg-background">
      <Navbar />
     
     {isLoggedIn ? <AdminDataTable/> : <AdminForm setIsLoggedIn={setIsLoggedIn} />}
  
    </div>
  );
}

export default AdminPage;