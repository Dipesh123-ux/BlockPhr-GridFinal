"use client"
import React, { useState, useEffect } from 'react'
import { fetchReceivedRequests, confirmRequest, rejectRequest } from '@/apis/address'
import useContract from '@/hooks/useBlock'
import { RotatingLines } from 'react-loader-spinner'
import CircularProgress from '@mui/material/CircularProgress';

// ... (import statements)

const ViewRequests = () => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const contractInstance = useContract();

    const fetchRequests = async () => {
        const response = await fetchReceivedRequests(userDetails?._id);
        setRequests(response);
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    const handleApprove = async (request) => {
        setLoading(true);
        const result = await contractInstance.methods.allowDoctor(request.doctor.address).send({ from: userDetails.address });
        if (result) {
            const response = await confirmRequest(request._id);
            console.log(response);
            setLoading(false);
            fetchRequests();
        }
    }

    const handleReject = (requestId) => {
        // Implement your logic to reject the request here.
        // For example:
        // rejectRequest(requestId);
    }

    return (
        <div id="container" className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Received Requests</h1>
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
                                        onClick={() => handleApprove(request)}
                                        className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                                    >
                                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Approve'}
                                    </button>
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
