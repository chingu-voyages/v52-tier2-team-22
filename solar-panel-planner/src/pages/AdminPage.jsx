import AdminDataTable from "../ui/AdminDataTable";
import AdminForm from "../ui/AdminForm";
import { useState } from "react";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full h-screen bg-background">
      {isLoggedIn ? (
        <AdminDataTable />
      ) : (
        <AdminForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default AdminPage;
