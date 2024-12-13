import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import VisitExport from "../utils/VisitExport.jsx";
import ShowMap from "../ui/ShowMap.jsx";

export default function VisitingRoutePage() {
  const location = useLocation();
  const { listOfDay, selectedDay, listOfToday } = location.state;
  const today = moment().format("YYYY-MM-DD");

  return (
    <div>
      <Link
        to="/admin"
        className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-secondaryGreen"
      >
        Go back to All Data
      </Link>
      <VisitExport
        listOfDay={listOfDay}
        selectedDay={selectedDay ? selectedDay : today}
        listOfToday={listOfToday}
      />
      <div className="flex flex-col overflow-auto rounded-lg shadow-md m-6">
        <div className="flex items-center justify-between px-6 py-4 bg-primaryGreen text-white text-center rounded-t-lg">
          <h2 className="text-lg text-white text-center font-semibold">
            All Appointment Requests
          </h2>
        </div>

        <table className="w-full border-collapse bg-background rounded-b-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3 flex w-fit items-center">Status</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3 min-w-[15rem]">Date</th>
            </tr>
          </thead>
          <tbody>
            {(selectedDay === today ? listOfToday : listOfDay).map(
              (appointment, index) => (
                <tr
                  key={appointment.id}
                  className={`text-sm text-gray-800 ${
                    index % 2 === 0 ? "bg-background" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 border-t border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border-t border-gray-200">
                    {appointment.status}
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
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6">
        <ShowMap
          appointmentsArr={selectedDay === today ? listOfToday : listOfDay}
        />
      </div>
    </div>
  );
}
