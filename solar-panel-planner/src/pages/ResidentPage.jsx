import { useState, useEffect } from "react";
import ResidentForm from "../ui/ResidentForm";
import ResidentSubmitedForms from "../ui/ResidentSubmitedForms";
import { useDispatch } from "react-redux";
import { loadState } from "../utils/localStorageUtils";
import { deleteAppointment } from "../utils/appointmentsSlice";
import { toast, ToastContainer } from "react-toastify";

function ResidentPage() {
  const [request, setRequest] = useState("");
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    setRequest(loadState("myRequest"));
  }, [isRequested]);
  
  const dispatch = useDispatch();

  const handleCancelRequest = (id) => {
    toast.success("Request deleted");
    dispatch(deleteAppointment(id));
    setRequest("");
    setIsRequested(false);
  };

  

  return (
    <div className="w-full bg-background">
      <ToastContainer />
      <ResidentForm setIsRequested={setIsRequested} />
      <h3 className="text-center text-3xl font-semibold">
        Your Request
      </h3>
      {request ? (
        <ResidentSubmitedForms
          request={request}
          handleCancelRequest={handleCancelRequest}
        />
      ) : (
        <p className="text-center p-20">No request yet</p>
      )}
    </div>
  );
}

export default ResidentPage;
