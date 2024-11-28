import { useState } from "react";
import Modal from "../utils/Modal";
import { TiTickOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addAppointment } from "../utils/appointmentsSlice";
import { userDb } from "../userDb";
import { v4 as uuid } from "uuid";
import AddressAutoComplete from "../AddressAutoComplete";
import ShowAvailableTimeSlot from "../ShowAvailableTimeSlot";

function ResidentForm() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultValue = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: { combinedAddress: "", zipcode: "", coord: { lat: "", lng: "" } },
    date: "",
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
    console.log(residentFormData.date);
    setIsModalOpen(true);

    const serializedData = {
      ...residentFormData,
      id: uuid(),
      address: address,
      date: residentFormData.date
        ? new Date(residentFormData.date).toISOString()
        : "",
    };

    dispatch(addAppointment(serializedData));

    // commented out for testing purposes
    setResidentFormData(defaultValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const setSampleData = () => {
    let ranNum = Math.ceil(Math.random() * 20);
    setResidentFormData(userDb[ranNum]);
  };

  return (
    <section className="bg-background py-4">
      <h2 className="text-center text-3xl font-bold">Book an appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="my-8 flex gap-5 rounded mx-auto px-8 py-8"
      >
        {/* Date */}
        <ShowAvailableTimeSlot setResidentFormData={setResidentFormData} />

        <div className="w-1/2 mx-auto my-5">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
          <article className="flex gap-5 mt-4">
            <button
              type="submit"
              className="bg-primaryGreen hover:bg-secondaryGreen text-white font-bold py-2 px-4 rounded w-3/4"
            >
              Submit
            </button>
            <button
              type="button" // prevent form submission
              onClick={() => setResidentFormData(defaultValue)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-auto"
            >
              Cancel
            </button>
            <button
              type="button" // prevent form submission
              onClick={() => setSampleData()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-auto"
            >
              Sample data
            </button>
          </article>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-6">
          <TiTickOutline className="mx-auto size-10 text-green-400" />
          <p>Form submitted succesfully !</p>
          <p>
            Your preffered timeslot is only indicative ! You will receinve a
            confirmation via phone call a few hours before scheduled visit
          </p>
          <p>
            If you want to cancel your appointment, you can reach us at this
            number 1-800-123-4567
          </p>
        </div>
      </Modal>
    </section>
  );
}

export default ResidentForm;
