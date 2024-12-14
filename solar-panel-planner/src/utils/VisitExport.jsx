import DownloadIcon from "../assets/download_icon.png";
import { exportListPDF } from "./exportingPDF";
import moment from "moment";

export default function VisitList({
  orderedList,
  isAlertVisible,
  selectedDay,
}) {
  const today = moment().format("YYYY-MM-DD");
  
  return (
    <div className="text-center">
      {isAlertVisible ? (
        <div className="">
          <p>No requests for the selected day.</p>
        </div>
      ) : (
        <button
          onClick={() => exportListPDF(orderedList, selectedDay)}
          className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-secondaryGreen"
        >
          Export {selectedDay === today ? "today's" : selectedDay} route
          <img src={DownloadIcon} className="h-5 pl-2 inline mb-1" />
        </button>
      )}
    </div>
  );
}
