import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const appointments = useSelector((state)=> state.appointments.appointments)
  
  return (
    <section className="h-screen bg-green-100">
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Phone</th>
            <th className="border border-gray-400 px-4 py-2">Address</th>
            <th className="border border-gray-400 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-400 px-4 py-2">{item.name}</td>
              <td className="border border-gray-400 px-4 py-2">{item.email}</td>
              <td className="border border-gray-400 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-400 px-4 py-2">
                {item.address}
              </td>
              <td className="border border-gray-400 px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
