"use client"
import React, { useState, useEffect } from 'react'
import { fetchApprovedRequestsByPatient } from '@/apis/address'
import useContract from '@/hooks/useBlock'

// ... (import statements)

const ViewRequests = () => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));
    const [requests, setRequests] = useState([]);


    const fetchRequests = async () => {
        const response = await fetchApprovedRequestsByPatient(userDetails?._id);
        setRequests(response);
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    const handleReject  = async () =>{
    
    }


    return (
        <div id="container" className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Approved Requests</h1>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Doctor Name</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{request.doctor.name}</td>
                                <td className="px-4 py-2 align-top text-center">
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewRequests;
