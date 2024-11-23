import { useNavigate } from "react-router-dom";
import ResidentForm from "../ui/ResidentForm";
import ResidentSubmitedForms from "../ui/ResidentSubmitedForms";
import Navbar from "../components/Navbar";

function ResidentPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-background">
      <Navbar />
      <ResidentForm />
      <h3 className="text-center text-2xl font-semibold mt-8">Your Previous Requests</h3>
      <ResidentSubmitedForms />
    </div>
  );
}

export default ResidentPage;
