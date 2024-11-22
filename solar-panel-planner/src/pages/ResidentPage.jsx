import { useNavigate } from "react-router-dom";
import ResidentForm from "../ui/ResidentForm";
import ResidentSubmitedForms from "../ui/ResidentSubmitedForms";

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

      <h2 className="text-3xl text-center">Your submitted forms</h2>

      <ResidentSubmitedForms />
    </div>
  );
}

export default ResidentPage;
