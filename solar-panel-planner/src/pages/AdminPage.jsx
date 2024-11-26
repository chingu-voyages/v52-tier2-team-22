import { Link } from "react-router-dom";
import AdminDataTable from "../ui/AdminDataTable";
import AdminForm from "../ui/AdminForm";
import { useState } from "react";

function AdminPage() {
const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <section className="p-6 bg-green-100">
     
     {isLoggedIn ? <AdminDataTable/> : <AdminForm setIsLoggedIn={setIsLoggedIn} />}

      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-6 py-2 px-4 rounded"
        to="/"
      >
        Go back
      </Link>
    </section>
  );
}

export default AdminPage;
