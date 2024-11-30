import { Link } from "react-router-dom";
import AdminDataTable from "../ui/AdminDataTable";
import AdminForm from "../ui/AdminForm";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiArrowLeft } from "react-icons/fi";

function AdminPage() {
const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="w-full h-screen bg-background">
      <Navbar />
     
     {isLoggedIn ? <AdminDataTable/> : <AdminForm setIsLoggedIn={setIsLoggedIn} />}
  
     <Link
       className="inline-flex items-center gap-2 text-grey-600 hover:text-primaryYellow font-medium my-6 py-2 px-4 rounded transition duration-200"
       to="/"
     >
       <FiArrowLeft className="w-5 h-5" />
       Go back
     </Link>
    </div>
  );
}

export default AdminPage;