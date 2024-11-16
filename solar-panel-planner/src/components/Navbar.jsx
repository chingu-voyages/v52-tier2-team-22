import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between bg-primaryGreen py-4 px-8">
        <div className="flex flex-row">
            <p className="">Logo</p>
        </div>
        <ul className="flex flex-row">
            <Link to="."> <div className="text-sm pr-5 ">Send Request</div> </Link>
            <Link to="."><div className="text-sm pr-5">My Request</div></Link>
            <Link to="."><div className="text-sm pr-5">Admin</div></Link>
        </ul>
    </div>
  )
}
