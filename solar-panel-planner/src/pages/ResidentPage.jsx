import React from 'react'
import Navbar from "../components/Navbar"
import ResidentForm from "../ResidentForm"

export default function ResidentPage() {
  
  const fakeRequests = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1 (555) 789-1234",
      address: "456 Greenway Blvd., Los Angeles, CA",
      preferredDate: "Dec 15, 2024",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 987-6543",
      address: "789 Solar Lane, Los Angeles, CA",
      preferredDate: "Dec 20, 2024",
    },
    {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1 (555) 123-4567",
      address: "321 Sunshine Rd., Los Angeles, CA",
      preferredDate: "Dec 25, 2024",
    },
  ];
  return (
    <main className="w-full bg-background">
      <Navbar />
      <ResidentForm />
            <h3 className="text-center text-2xl font-semibold mt-8">Your Previous Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-8">
              {fakeRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-primaryGreen">Request #{request.id}</h4>
                  </div>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <span className="font-semibold">Name:</span> {request.name}
                    </li>
                    <li>
                      <span className="font-semibold">Email:</span> {request.email}
                    </li>
                    <li>
                      <span className="font-semibold">Phone:</span> {request.phone}
                    </li>
                    <li>
                      <span className="font-semibold">Address:</span> {request.address}
                    </li>
                    <li>
                      <span className="font-semibold">Preferred Date:</span> {request.preferredDate}
                    </li>
                  </ul>
                  <button
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
                  >
                    Cancel Request
                  </button>
                </div>
              ))}
            </div>
      </main>
  )
}
