import { useNavigate } from "react-router-dom";
import AdminDataTable from "../ui/AdminDataTable";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <section className="p-6 bg-green-100">

    <AdminDataTable/>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-6 py-2 px-4 rounded"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </section>
  );
}

export default AdminPage;
