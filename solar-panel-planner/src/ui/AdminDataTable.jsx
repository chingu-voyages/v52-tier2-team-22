import { useSelector } from "react-redux";

function AdminDataTable() {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <table className="bg-white table-auto border-collapse border border-gray-400 w-full">
      <thead className="">
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
            <td className="border border-gray-400 px-4 py-2">{item.address}</td>
            <td className="border border-gray-400 px-4 py-2">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminDataTable;
