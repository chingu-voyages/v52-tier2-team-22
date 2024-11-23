import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { TiTickOutline } from "react-icons/ti";
// import { useDispatch } from "react-redux";
import { addAppointment } from "./utils/appointmentsSlice";
import { ScheduleMeeting } from "react-schedule-meeting";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

function ResidentForm() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultValue = {
    name: "",
    email: "",
    phone: "",
    address: { street_address: "", zipcode: "" },
    date: "",
  };
  const [residentFormData, setResidentFormData] = useState(defaultValue);

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let LastDayOfMonth = new Date(year, month, 0).getDate();
  let daysLeft = LastDayOfMonth - day;

  let availableTimeslots = [];
  function getAvailableTimeslots(dayOfWeek, dayCount) {
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      availableTimeslots.push({
        id: dayCount,
        startTime: new Date(
          new Date(
            new Date().setDate(new Date().getDate() + dayCount)
          ).setHours(9, 0, 0, 0)
        ),
        endTime: new Date(
          new Date(
            new Date().setDate(new Date().getDate() + dayCount)
          ).setHours(17, 0, 0, 0)
        ),
      });
    }
  }

  for (let dayCount = 0; dayCount <= daysLeft; dayCount++) {
    let dayOfWeek = new Date(
      new Date(new Date().setDate(new Date().getDate() + dayCount))
    ).getDay();

    getAvailableTimeslots(dayOfWeek, dayCount);
  }

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    let inputData = { ...residentFormData };
    if (name === "street_address" || name === "zipcode") {
      inputData = {
        ...inputData,
        address: {
          ...inputData.address,
          [name]: value,
        },
      };
    } else {
      inputData = {
        ...inputData,
        [name]: value,
      };
    }

    setResidentFormData(inputData);
  };

  const handleDateChange = function (date) {
    setResidentFormData((prevData) => ({ ...prevData, date: date.startTime }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(residentFormData);
    setIsModalOpen(true);

    const serializedData = {
      ...residentFormData,
      date: residentFormData.date
        ? new Date(residentFormData.date).toISOString()
        : "",
    };

    // dispatch(addAppointment(serializedData));

    // commented out for testing purposes
    setResidentFormData(defaultValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-background py-8">
      <h2 className="text-center text-3xl font-bold">Book an appointment</h2>

      <form
        onSubmit={handleSubmit}
        className=" my-8 flex gap-5 shadow-lg rounded mx-auto px-8 py-8"
      >
        {/* Date */}
        <ScheduleMeeting
          borderRadius={20}
          primaryColor="#95d387"
          eventDurationInMinutes={30}
          availableTimeslots={availableTimeslots}
          onStartTimeSelect={handleDateChange}
          format_selectedDateDayTitleFormatString="ccc, LLLL do"
        />

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
            <APIProvider apiKey={API_KEY}>
              <PlaceAutocomplete
                residentFormData={residentFormData}
                setResidentFormData={setResidentFormData}
                handleInputChange={handleInputChange}
              />
            </APIProvider>
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

const PlaceAutocomplete = ({
  residentFormData,
  setResidentFormData,
  handleInputChange,
}) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["address_components"],
      componentRestrictions: { country: "us" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", fillInAddress);
  }, [setResidentFormData, placeAutocomplete]);

  function fillInAddress() {
    const place = placeAutocomplete.getPlace();

    let street_address = "";
    let zipcode = "";

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          street_address = `${component.long_name} ${street_address}`;
          break;
        }

        case "route": {
          street_address += component.short_name;
          break;
        }

        case "postal_code": {
          zipcode = `${component.long_name}${zipcode}`;
          break;
        }
      }
    }

    setResidentFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        street_address: street_address,
        zipcode: zipcode,
      },
    }));
  }

  return (
    <>
      <label
        htmlFor="street_address"
        className="block text-gray-700 text-sm font-bold"
      >
        Street Address
      </label>
      <input
        type="text"
        id="street_address"
        name="street_address"
        value={residentFormData.address.street_address}
        ref={inputRef}
        onChange={handleInputChange}
        placeholder="Street Address"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      />
      <label
        htmlFor="zipcode"
        className="block text-gray-700 text-sm font-bold"
      >
        Zipcode
      </label>
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        value={residentFormData.address.zipcode}
        onChange={handleInputChange}
        placeholder="Zipcode"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      />
    </>
  );
};
