import { useNavigate } from "react-router-dom";
import ResidentForm from "../ui/ResidentForm";

function ResidentPage() {
  const navigate = useNavigate();

  return (
    <div>
      ResidentPage
      <button
        onClick={() => navigate("/")}
        className="bg-primaryGreen text-white text-xl font-semibold px-9 py-5 rounded-lg shadow-md hover:bg-secondaryGreen"
      >
        Back
      </button>
      <ResidentForm />
    </div>
  );
}

export default ResidentPage;
