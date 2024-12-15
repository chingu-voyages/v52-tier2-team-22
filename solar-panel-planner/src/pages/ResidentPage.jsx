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
    <div className="w-full  h-[calc(100vh-72px)] bg-background ">
      <ToastContainer />
      
      {request ? (
        <>
        <h3 className="text-center text-3xl font-semibold pt-6">Your Request</h3>
        <ResidentSubmitedForms
          request={request}
          handleCancelRequest={handleCancelRequest}
        /></>
      ) : (
        <ResidentForm setIsRequested={setIsRequested} />
      )}
    </div>
  );
}

export default ResidentPage;
