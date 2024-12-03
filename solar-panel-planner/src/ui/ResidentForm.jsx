import { useState } from "react";
import Modal from "../utils/Modal";
import { TiTickOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addAppointment } from "../utils/appointmentsSlice";
import { userDb } from "../userDb";
import { v4 as uuid } from "uuid";
import AddressAutoComplete from "../AddressAutoComplete";
import ShowAvailableTimeSlot from "../ShowAvailableTimeSlot";
import { FiKey } from "react-icons/fi";


function ResidentForm({ setIsRequested }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValue = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: { combinedAddress: "", zipcode: "", coord: { lat: "", lng: "" } },
    requestDate: "",
    status: "",
    sentDate: "",
  };

  const [residentFormData, setResidentFormData] = useState(defaultValue);
  const [address, setAddress] = useState({});

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    let inputData = { ...residentFormData };
    inputData = {
      ...inputData,
      [name]: value,
    };

    setResidentFormData(inputData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!address || !residentFormData.requestDate)
      return alert("You forgot to select a request date or your address");

// toast.error("please select the date")

    const serializedData = {
      ...residentFormData,
      id: uuid(),
      address: address,
      requestDate: residentFormData.requestDate
      ? new Date(residentFormData.requestDate).toISOString()
      : "",
      status: "pending",
      sentDate: new Date().toISOString(),
    };
    
    dispatch(addAppointment(serializedData));
    setResidentFormData(defaultValue);
    setIsModalOpen(true);
    setIsRequested(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ranNUm * 3. this number MUST NOT be higher than the number of objects of fake users in UserDb.js
  const setSampleData = () => {
    let ranNum = Math.ceil(Math.random() * 3);
    setResidentFormData(userDb[ranNum]);
  };

  return (
    <section className="bg-background py-4">
      <h2 className="pt-8 text-4xl font-semibold text-center">Book an appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="my-8 flex gap-5 rounded p-6"
      >
        {/* Date */}
        <ShowAvailableTimeSlot  setResidentFormData={setResidentFormData} />

        <div className="w-1/2 min-w-[25rem] p-6 mx-auto my-5 bg-white shadow-md rounded-lg border-gray-200">
          {/* Name */}
          <article className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={residentFormData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
              className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
            />
          </article>

          {/* Email */}
          <article className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={residentFormData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
            />
          </article>

          {/* Phone Number */}
          <article className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={residentFormData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
              className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
            />
          </article>

          {/* Address */}
          <article className="flex flex-col gap-2">
            <label
              htmlFor="street_address"
              className="block text-gray-700 text-sm font-bold"
            >
              Street Address
            </label>
            <AddressAutoComplete setAddress={setAddress} />
          </article>

          {/* Buttons */}
          <article className="flex flex-row items-start justify-start gap-4 mt-4 ">
            <button
              type="submit"
              className="bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
            >
              Submit
            </button>
            <button
              type="button" // prevent form submission
              onClick={() => setResidentFormData(defaultValue)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
            >
              Cancel
            </button>
            <button
            type="button"
            onClick={() => setSampleData()}
            className="bg-primaryGreen hover:bg-secondaryGreen text-white p-2 rounded-full shadow-md transition duration-200 ml-auto flex items-center justify-center"
          >
            <FiKey className="size-5" />
          </button>
          </article>
        </div>
      </form>

     

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-6 text-lg">
          <TiTickOutline className="mx-auto size-14 text-primaryGreen" />
          <p className="font-bold text-primaryGreen text-xl">
            Form submitted succesfully !
          </p>
          <p>
            Your preffered timeslot is only i͟n͟d͟i͟c͟a͟t͟i͟v͟e͟. You will receive a
            confirmation via phone call a few hours before scheduled visit.
          </p>
          <p>
            If you want to cancel your appointment, you can reach us at number
            1-800-123-4567
          </p>
        </div>
      </Modal>
    </section>
  );
}

export default ResidentForm;
