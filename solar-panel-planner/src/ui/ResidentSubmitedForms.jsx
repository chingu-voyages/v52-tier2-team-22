import { useSelector, useDispatch } from "react-redux";
import { deleteAppointment } from "../utils/appointmentsSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function ResidentSubmitedForms() {
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();

  const handleCancelRequest = (index) => {
    dispatch(deleteAppointment(index));
    toast.success("Request deleted");
  };

  return (
    <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8 px-6">
      {appointments?.map((appointment, index) => (
        <div
          key={index}
          className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="mb-4">
            <h4 className="text-lg font-bold text-primaryGreen">
              Request #{index + 1}
            </h4>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Name:</span> {appointment.name}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {appointment.email}
            </li>
            <li>
              <span className="font-semibold">Phone:</span> {appointment.phone}
            </li>
            <li>
              <span className="font-semibold">Address:</span>{" "}
              {appointment.address.combinedAddress}
            </li>
            <li>
              <span className="font-semibold">Preferred Date:</span>{" "}
              {appointment.date}
            </li>
          </ul>
          <button
            onClick={() => handleCancelRequest(index)}
            className="mt-4 bg-white border-[2px] text-black border-red-500 hover:text-white py-2 px-4 rounded hover:bg-red-500 w-full transition"
          >
            Cancel Request
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default ResidentSubmitedForms;
