import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import VisitList from "./VisitList.jsx"

export default function Layout() {
    return (
        <>
            <header>
                <Navbar />
                <VisitList />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}