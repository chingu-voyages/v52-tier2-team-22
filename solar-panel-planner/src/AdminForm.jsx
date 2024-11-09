function AdminForm() {
  return (
    <section className="bg-zinc-100 py-8">
      <h2 className="text-center text-5xl">Book an appointment</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-stone-50 flex my-8 flex-col gap-5 shadow-lg max-w-sm rounded mx-auto px-8 py-8"
      >
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
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </article>

        {/* Password */}
        <article className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold"
          >
            Email
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value=""
            onChange={handleInputChange}
            placeholder="Enter password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </article>

        {/* Phone Number */}

        {/* Buttons */}
        <article className="flex gap-5 mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button" // prevent form submission
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </article>
      </form>

    </section>
  );
}

export default AdminForm;
