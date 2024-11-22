import { useSelector } from "react-redux";

function ResidentSubmitedForms() {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div className="flex">
      {appointments.map((appointment, index) => (
        <article className="w-[20rem] rounded-md text-xl p-4 m-5 bg-stone-200" key={index}>
          <p>{appointment.name}</p>
          <p>{appointment.email}</p>
          <p>{appointment.phone}</p>
          {/* <p>{appointment.adress}</p>
          <p>{appointment.date}</p> */}
        </article>
      ))}
    </div>
  );
}

export default ResidentSubmitedForms;
