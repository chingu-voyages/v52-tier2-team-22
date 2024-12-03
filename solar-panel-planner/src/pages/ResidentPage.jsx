import { useState, useEffect } from "react";
import ResidentForm from "../ui/ResidentForm";
import ResidentSubmitedForms from "../ui/ResidentSubmitedForms";
import { useDispatch } from "react-redux";
import { loadState } from "../utils/localStorageUtils";
import { deleteAppointment } from "../utils/appointmentsSlice";
import { toast } from "react-toastify";

function ResidentPage() {
  const [request, setRequest] = useState("");
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    setRequest(loadState());
  }, [isRequested]);
  console.log(request);

  const dispatch = useDispatch();

  const handleCancelRequest = (id) => {
    toast.success("Request deleted");
    dispatch(deleteAppointment(id));
    setRequest("");
    setIsRequested(false);
  };

  return (
    <div className="w-full bg-background">
      <ResidentForm setIsRequested={setIsRequested} />
      <h3 className="mt-6 text-center text-3xl font-semibold">
        Your Previous Requests
      </h3>
      {request ? (
        <ResidentSubmitedForms
          request={request}
          handleCancelRequest={handleCancelRequest}
        />
      ) : (
        <div>No request yet</div>
      )}
    </div>
  );
}

export default ResidentPage;
