import { useNavigate } from "react-router-dom"

function ResidentPage() {
const navigate = useNavigate()

    return (
        <div>
            ResidentPage
            <button onClick={()=> navigate("/")} className="bg-primaryGreen text-white text-xl font-semibold px-9 py-5 rounded-lg shadow-md hover:bg-secondaryGreen">
        Back
      </button>
        </div>
    )
}

export default ResidentPage
