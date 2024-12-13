import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { addAppointment } from "../utils/appointmentsSlice";
import { v4 as uuid } from "uuid";
import AddressAutoComplete from "../utils/AddressAutoComplete";
import ShowAvailableTimeSlot from "./ShowAvailableTimeSlot";
import { RxCheck, RxCross2 } from "react-icons/rx";

function ResidentForm({ setIsRequested }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

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
    if (!address.combinedAddress || residentFormData.requestDate === "") {
      return (
        setModalContent({
          icon: RxCross2,
          title: "Form unsuccessful !",
          desc: "You forgot to input either a date or an address. ",
          additionalInfo: null,
        }),
        setIsModalOpen(true)
      );
    }

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
    setModalContent({
      icon: RxCheck,
      title: "Form submitted succesfully !",
      desc: "Your preffered timeslot is only i͟n͟d͟i͟c͟a͟t͟i͟v͟e͟. You will receive a confirmation via phone call a few hours before scheduled visit.",
      additionalInfo:
        "If you want to cancel your appointment, you can reach us at number 1-800-123-4567",
    });
    setIsRequested(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-4">
      <h2 className="mt-8 text-center text-3xl font-semibold">
        Send a Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="my-4 flex flex-col sm:flex-row gap-5 rounded mx-auto px-8 py-8"
      >
        {/* Date */}
        <ShowAvailableTimeSlot setResidentFormData={setResidentFormData} />

        <div className="mx-auto my-5 sm:w-1/2 bg-white shadow-md rounded-lg p-6">
          {/* Name */}
          <article className="flex flex-col gap-2 mt-4">
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
          <article className="flex flex-col gap-2 mt-4">
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
          <article className="flex flex-col gap-2 mt-4">
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
              minLength="7"
              maxLength="13"
              className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
            />
          </article>

          {/* Address */}
          <article className="flex flex-col gap-2 mt-4">
            <label
              htmlFor="street_address"
              className="block text-gray-700 text-sm font-bold"
            >
              Address - <span className="font-normal italic text-red-600">must start with a number</span> 
            </label>
            <AddressAutoComplete setAddress={setAddress} />
          </article>

          {/* Buttons */}
          <article className="flex items-start gap-4 mt-8 justify-between">
            <button
              type="submit" //submit the form
              className="bg-primaryGreen transition hover:bg-secondaryGreen text-white font-semibold py-2 px-4 rounded w-2/3"
            >
              Send Request
            </button>
            <button
              type="button"
              onClick={() => setResidentFormData(defaultValue)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 w-1/4"
            >
              Clear
            </button>
          </article>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-6 text-lg">
          <div
            className={`mx-auto text-5xl flex justify-center ${
              modalContent.icon === RxCheck
                ? "text-primaryGreen"
                : "text-red-500"
            }`}
          >
            {React.createElement(modalContent.icon || "")}
          </div>

          <p
            className={`font-bold text-xl ${
              modalContent.title === "Form submitted succesfully !"
                ? "text-primaryGreen" // Green for success
                : "text-red-500" // Red for failure
            }`}
          >
            {modalContent.title}
          </p>
          <p>{modalContent.desc}</p>
          {modalContent.additionalInfo && <p>{modalContent.additionalInfo}</p>}
        </div>
      </Modal>
    </section>
  );
}

export default ResidentForm;
