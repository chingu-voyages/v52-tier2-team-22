import { useSelector } from "react-redux";
import ShowMap from "../ShowMap";

function AdminDataTable() {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div className="flex flex-col overflow-auto rounded-lg shadow-lg m-8">
      <div className="flex items-center justify-between px-6 py-4 bg-secondaryGreen text-white text-center rounded-t-lg">
        <h2 className="text-lg text-center font-semibold">Appointment Requests</h2>
      </div>
      <table className="w-full border-collapse bg-background rounded-b-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, index) => (
            <tr key={index} className={`text-sm text-gray-800 ${index % 2 === 0 ? "bg-background" : "bg-white"}`}>
              <td className="px-6 py-3 border-t border-gray-200">{appointment.name}</td>
              <td className="px-6 py-3 border-t border-gray-200">{appointment.email}</td>
              <td className="px-6 py-3 border-t border-gray-200">{appointment.phone}</td>
              {/* <td className="px-6 py-3 border-t border-gray-200">{appointment.address}</td>
              <td className="px-6 py-3 border-t border-gray-200">{appointment.date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <ShowMap />
    </div>
  );
}

export default AdminDataTable;
