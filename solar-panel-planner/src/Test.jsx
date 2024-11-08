import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Test() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className="bg-white flex flex-col gap-5 shadow-md w-[20rem] rounded mx-auto px-8 py-8">
      <article className="flex flex-col gap-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  
 focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter name"
        />
      </article>

      {/* email */}
      <article className="flex flex-col gap-2">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  
 focus:shadow-outline"
          id="name"
          type="email"
          placeholder="Enter email"
        />
      </article>

      {/* phone nmb */}
      <article className="flex flex-col gap-2">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="phone"
        >
          Phone number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  
 focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter phone number"
        />
      </article>

      {/* adress */}
      <article className="flex flex-col gap-2">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="adress"
        >
          Adress
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  
 focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter adress"
        />
      </article>

      {/* date */}
      <article className="flex flex-col gap-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="date">
          Preferred timeslot
        </label>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          className="shadow border w-[16rem] rounded py-2 px-3 text-gray-700 focus:outline-none  
 focus:shadow-outline"
          timeIntervals={60}
          timeCaption="Time"
          placeholderText="Clik to select"
          dateFormat="MMMM d, yyyy h:mm"
        />
      </article>

      {/* Add more fields for email, phone number, and address */}
      <article className="flex gap-5 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
        <button
          className="bg-gray-300  
 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          type="button"
        >
          Cancel
        </button>
      </article>
    </section>
  );
}

export default Test;
