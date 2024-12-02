import { useSelector } from "react-redux";
import ShowMap from "../ShowMap";
import { jsPDF } from "jspdf";
import moment from "moment";

function AdminDataTable() {
  const appointments = useSelector((state) => state.appointments.appointments);
  const exportToPDF = (appointment) => {
    const doc = new jsPDF();
    doc.text(`Appointment Details`, 10, 10);
    doc.text(`Name: ${appointment.name}`, 10, 20);
    doc.text(`Email: ${appointment.email}`, 10, 30);
    doc.text(`Phone: ${appointment.phone}`, 10, 40);
    doc.text(
      `Address: ${
        appointment.address.combinedAddress + " " + appointment.address.zipcode
      }`,
      10,
      50
    );
    doc.text(
      `Date: ${moment(appointment.requestDate).format("MMMM Do YYYY, h:mm a")}`,
      10,
      60
    );
    doc.save(`${appointment.name}_appointment.pdf`);
  };

  const statusState = ["pending", "confirmed", "canceled"];

  return (
    <>
      <h1 className="my-8 mx-8 text-2xl">
        Welcome Admin, here are all resident submitted requests
      </h1>
      <div className="flex flex-col overflow-auto rounded-lg shadow-lg m-8">
        <div className="flex items-center justify-between px-6 py-4 bg-secondaryGreen text-white text-center rounded-t-lg">
          <h2 className="text-lg text-center font-semibold">
            Appointment Requests
          </h2>
        </div>
        <table className="w-full border-collapse bg-background rounded-b-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Export</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`text-sm text-gray-800 ${
                  index % 2 === 0 ? "bg-background" : "bg-white"
                }`}
              >
                <td className="px-6 py-3 border-t border-gray-200">
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {statusState.map((state) => (
                      <option
                        value={state}
                        key={state}
                        selected={appointment.status === state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.name}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.email}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.phone}
                </td>
                {/* <td className="px-6 py-3 border-t border-gray-200">{appointment.address}</td> */}
                <td className="px-6 py-3 border-t border-gray-200">
                  {appointment.address.combinedAddress +
                    " " +
                    appointment.address.zipcode}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  {moment(appointment.requestDate).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </td>
                <td className="px-6 py-3 border-t border-gray-200">
                  <button
                    onClick={() => exportToPDF(appointment)}
                    className="px-4 py-2 bg-primaryYellow transition rounded-md hover:bg-secondaryYellow"
                  >
                    Export PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ShowMap />
      </div>
    </>
  );
}

export default AdminDataTable;
