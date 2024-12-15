import AdminDataTable from "../ui/AdminDataTable";
import { useState, useEffect } from "react";
import { loadState } from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadState("admin")) return navigate("/adminlogin");
    setIsLoggedIn(true);
    navigate("/admin");

  }, []);

  return (
    <div className="w-full bg-background">
      {isLoggedIn && <AdminDataTable />}
    </div>
  );
}

export default AdminPage;
