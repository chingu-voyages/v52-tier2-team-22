import { useSelector } from "react-redux";

function Test() {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div className="border-2 border-red-400 p-6">
      <h1>TEST component, displaying the submited data</h1>
      <ul>
        {appointments.map((el, index) => (
          <li key={index}>
            {el.name}
            {el.email}
            {el.phone}
            {el.address}
            {el.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
