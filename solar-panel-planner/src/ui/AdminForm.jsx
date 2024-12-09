import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminEmailDb } from "../adminEmailDb";

function AdminForm({ setIsLoggedIn }) {
  const [adminFormData, setAdminFormData] = useState({
    email: "just.Click.Login.Button@sample.com",
  });

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    setAdminFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const isValidEmail = adminEmailDb.includes(adminFormData.email);

    if (isValidEmail) {
      setIsLoggedIn(true);
      toast.success("Admin logged in successfully");
    } else {
      toast.error("Invaild email address");
      setAdminFormData({
        email: "",
      });
    }
  };

  return (
    <section
      style={{ height: "calc(100vh - 68px)" }}
      className="py-8 bg-background"
    >
      <ToastContainer />
      <h2 className="my-8 text-center text-3xl font-semibold">
        Login as Admin
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-6 shadow-md max-w-md rounded-lg mx-auto px-8 py-8 border border-gray-200"
      >
        <article className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="block text-gray-800 text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            value={adminFormData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-secondaryGreen focus:border-secondaryGreen"
          />
        </article>

        {/* Buttons */}
        <article className="flex gap-4 mt-4 items-center">
          <button
            type="submit"
            className="bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() =>
              setAdminFormData({
                email: "",
              })
            }
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
          >
            Cancel
          </button>
        </article>
      </form>
    </section>
  );
}

export default AdminForm;
