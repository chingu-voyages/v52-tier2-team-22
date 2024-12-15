import DownloadIcon from "../assets/download_icon.png";
import { exportListPDF } from "./exportingPDF";
import moment from "moment";
import { motion } from "framer-motion";

export default function VisitList({
  orderedList,
  isAlertVisible,
  selectedDay,
}) {
  const today = moment().format("YYYY-MM-DD");

  return (
    <motion.div className="text-center">
      {isAlertVisible ? (
        <motion.p
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className="text-red-500 font-semibold"
        >
          No requests for selected day
        </motion.p>
      ) : (
        <button
          onClick={() => exportListPDF(orderedList, selectedDay)}
          className="bg-primaryGreen text-white px-7 py-2 rounded hover:bg-secondaryGreen"
        >
          Export {selectedDay === today ? "today's" : selectedDay} route
          <img src={DownloadIcon} className="h-5 pl-2 inline mb-1" />
        </button>
      )}
    </motion.div>
  );
}
