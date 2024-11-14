import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col gap-6 items-center justify-center bg-green-100">
      <h1 className="text-5xl text-green-700 text-center">Admin Placeholder page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </section>
  );
}

export default AdminPage;
