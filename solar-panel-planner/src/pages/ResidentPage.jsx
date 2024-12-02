import { useState, useEffect } from "react";
import ResidentForm from "../ui/ResidentForm";
import ResidentSubmitedForms from "../ui/ResidentSubmitedForms";
import Navbar from "../components/Navbar";

function ResidentPage() {
  const [request, setRequest] = useState("");

  useEffect(() => {
    const requestItems = JSON.parse(localStorage.getItem("request"));
    if (requestItems) setRequest(requestItems);
  }, []);

  return (
    <div className="w-full bg-background">
      <Navbar />
      <ResidentForm />
      <h3 className="mt-6 text-center text-3xl font-semibold">
        Your Previous Requests
      </h3>
      {request ? (
        <ResidentSubmitedForms request={request} />
      ) : (
        <div>No request yet</div>
      )}
    </div>
  );
}

export default ResidentPage;
