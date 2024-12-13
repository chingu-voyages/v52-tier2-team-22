import { useSelector, useDispatch } from "react-redux";
import ShowMap from "../ui/ShowMap.jsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { updateAppointmentStatus } from "../utils/appointmentsSlice";
// import VisitExport from "../utils/VisitExport.jsx";
import { exportIndividualPDF } from "../utils/exportingPDF.jsx";
import DownloadIcon from "../assets/download_icon.png";
import { Link } from "react-router-dom";

function AdminDataTable() {
  const today = moment().format("YYYY-MM-DD");
  const [showTable, setShowTable] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const appointments = useSelector((state) => state.appointments.appointments);
  const [appointmentsArr, setAppointmentsArr] = useState(appointments);
  const [listOfToday, setListOfToday] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusState = ["pending", "confirmed", "canceled", "visited"];

  const dispatch = useDispatch();
  useEffect(() => {
    const todayArr = filteringDay(appointmentsArr, today);
    setListOfToday(todayArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filteringDay(arr, day) {
    return arr
      .filter((req) => moment(req.requestDate).format("YYYY-MM-DD") === day)
      .sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
  }

  useEffect(() => {
    let filteredArr = [...appointments];

    function filteringStatus(arr, status) {
      if (status === "all") return [...appointments];
      return arr
        .filter((req) => {
          if (status === "pending") {
            return req.status === "pending";
          } else if (status === "confirmed") {
            return req.status === "confirmed";
          } else if (status === "canceled") {
            return req.status === "canceled";
          } else if (status === "visited") {
            return req.status === "visited";
          }
        })
        .sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
    }

    if (selectedDay) filteredArr = filteringDay(filteredArr, selectedDay);

    if (selectedStatus || selectedDay) {
      if (selectedDay) filteredArr = filteringDay(filteredArr, selectedDay);
      if (selectedStatus)
        filteredArr = filteringStatus(filteredArr, selectedStatus);
    }

    setAppointmentsArr(filteredArr);
  }, [selectedStatus, selectedDay, appointments]);

  const resetFilter = () => {
    setAppointmentsArr(appointments);
    setSelectedDay("");
    setSelectedStatus("");
  };

  return (
    <>
      <h1 className="ml-8 text-3xl font-semibold pt-8">Welcome Admin</h1>
      <div className="flex justify-between px-8 py-4">
        <div className="flex justify-start gap-6">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 h-10"
            onClick={() => {
              setShowTable(true);
              setShowMap(true);
            }}
          >
            Default View
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 h-10"
            onClick={() => {
              setShowTable(true);
              setShowMap(false);
            }}
          >
            Table View
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 h-10"
            onClick={() => {
              setShowTable(false);
              setShowMap(true);
            }}
          >
            Map View
          </button>
        </div>
        {/* <VisitExport
          listOfDay={appointmentsArr}
          selectedDay={selectedDay ? selectedDay : today}
          listOfToday={listOfToday}
        /> */}
        <Link
          to="/admin/visiting_route"
          className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-secondaryGreen"
          state={{
            listOfDay: appointmentsArr,
            selectedDay: selectedDay ? selectedDay : today,
            listOfToday: listOfToday,
          }}
        >
          Show {selectedDay ? selectedDay : "today's"} route
        </Link>
      </div>

      {showTable && (
        <div className="flex flex-col overflow-auto rounded-lg shadow-md m-6">
          <div className="flex items-center justify-between px-6 py-4 bg-primaryGreen text-white text-center rounded-t-lg">
            <h2 className="text-lg text-white text-center font-semibold">
              All Appointment Requests
            </h2>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
              onClick={resetFilter}
            >
              Reset filters
            </button>
          </div>

          <table className="w-full border-collapse bg-background rounded-b-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="px-6 py-3">No.</th>

                <th className="px-6 py-3 flex w-fit items-center">
                  Status
                  <select
                    className="ml-4 px-2 bg-white py-1 rounded-md"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">all</option>
                    {statusState.map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3 min-w-[15rem]">
                  Date
                  <input
                    type="date"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="ml-3 px-2 rounded-md py-1"
                  />
                </th>
                <th className="px-6 py-3">Export</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsArr?.map((appointment, index) => (
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
                    <select
                      defaultValue={appointment.status}
                      onChange={(e) =>
                        dispatch(
                          updateAppointmentStatus({
                            id: appointment.id,
                            status: e.target.value,
                          })
                        )
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
                    >
                      {statusState.map((status) => (
                        <option key={status} value={status}>
                          {status}
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
                      onClick={() => exportIndividualPDF(appointment)}
                      className="px-4 py-2 bg-primaryYellow transition rounded-md hover:bg-secondaryYellow"
                    >
                      Export
                      <img
                        src={DownloadIcon}
                        className=" font-black h-4  px-3"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showMap && (
        <div className="p-6">
          <ShowMap appointmentsArr={appointmentsArr} />
        </div>
      )}
    </>
  );
}

export default AdminDataTable;
