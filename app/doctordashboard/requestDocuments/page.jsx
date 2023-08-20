"use client"
import React, { useState, useEffect, useContext } from 'react'
import SearchBar from '@/components/doctorDashboard/searchbar'
import { getUserByAadhar, sendRequest, fetchRequests } from '@/apis/address'
import AuthContext from '@/context/authContext';

const RequestDocuments = () => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo'))
    const [user, setUser] = useState();
    const [requests, setRequests] = useState([]);

    const fetchRequest = async () => {
        const response = await fetchRequests(userDetails?._id);
        console.log(response[0])
        setRequests(response)
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    const handleSearch = async (aadhar) => {
        const res = await getUserByAadhar(aadhar);
        setUser(res.user);
        
    }

    const isPatientAlreadyRequested = () => {
        return requests.some(request => request.patient.aadharNumber === user.aadharNumber);
    }

    const handleSendRequest = async () => {
        const res = await sendRequest(user?._id, userDetails?._id);
        fetchRequest();
    }

    return (
        <div id="container" className='text-center fixed'>
            <div className="mt-36">
                <SearchBar onSearch={handleSearch} />
            </div>
            {user && (
                <div className="mt-8 p-4 w-1/2 mx-auto bg-white text-gray-800 rounded-md shadow-md">
                    <p className="font-bold">User Details:</p>
                    <p>Name: {user.name}</p>
                    <p>Aadhar: {user.aadharNumber}</p>
                    {isPatientAlreadyRequested() ? (
                        <button className="mt-4 bg-gray-300 text-gray-600 px-4 py-2 rounded-md" disabled>
                            Pending
                        </button>
                    ) : (
                        <button
                            onClick={handleSendRequest}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Send Request
                        </button>
                    )}
                </div>
            )}

            <div className="mt-8 p-4 w-1/2 mx-auto bg-white text-gray-800 rounded-md shadow-md">
                <p className="font-bold">Requests:</p>
                {requests.length === 0 ? (
                    <p>No requests available.</p>
                ) : (
                    <table className="mt-4 w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Patient Name</th>
                                <th className="px-4 py-2">Aadhar Number</th>
                                <th className="px-4 py-2">Request Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{request.patient.name}</td>
                                    <td className="px-4 py-2">{request.patient.aadharNumber}</td>
                                    <td className="px-4 py-2">{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    )
}

export default RequestDocuments;
