import { useState } from "react";
import { FiKey } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminForm({setIsLoggedIn}) {

  const [adminFormData, setAdminFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    setAdminFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(adminFormData);
    // commented out for testing purposes

    // setAdminFormData({
    //   name: "",
    //   password: "",
    // });

    if (
      adminFormData.name === "Admin John Smith" &&
      adminFormData.password === "admin_678"
    ) {
      setIsLoggedIn(true)
      toast.success("Welcome Admin")
    } else {
      toast.error("Incorrect username or password");
      setAdminFormData({
        name: "",
        password: "",
      });
    }
  };

  const handleAutofill = function () {
    setAdminFormData({
      name: "Admin John Smith",
      password: "admin_678",
    });
  };

  return (
    <section className="bg-background py-8">
      <ToastContainer />
      <h2 className="text-center text-3xl font-semibold mt-4 py-5">Login as Admin</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-6 shadow-md max-w-sm rounded-lg mx-auto p-6 border border-gray-200"
      >
        {/* Name */}
        <article className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="block text-gray-800 text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={adminFormData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
          />
        </article>

        {/* Password */}
        <article className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="block text-gray-800 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            name="password"
            value={adminFormData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
          />
        </article>

        {/* Phone Number */}

        {/* Buttons */}
        <article className="flex gap-4 mt-4 items-center">
          <button
            type="submit"
            className="bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Submit
          </button>
          <button
            onClick={() =>
              setAdminFormData({
                name: "",
                password: "",
              })
            }
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAutofill}
            className="bg-primaryGreen hover:bg-secondaryGreen text-white p-2 rounded-full shadow-md transition duration-200 ml-auto flex items-center justify-center"
          >
            <FiKey className="size-5" />
          </button>
        </article>
      </form>
    </section>
  );
}

export default AdminForm;
