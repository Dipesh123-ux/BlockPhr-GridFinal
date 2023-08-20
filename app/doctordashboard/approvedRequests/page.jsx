"use client"
import React, {useEffect,useState} from 'react'
import { fetchApprovedRequests } from '@/apis/address'
import Link from 'next/link'

const ApprovedRequests = () => {
    const [requests, setRequests] = useState([]);
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));

    const fetchRequests = async () => {
        const response = await fetchApprovedRequests(userDetails?._id);
        setRequests(response);
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    const handlePreviewDocument = (requestId) => {
        // Implement your logic to preview the document here.
        // For example:
        // previewDocument(requestId);
    }

    const handleAddDocuments = (requestId) => {
        // Implement your logic to add documents here.
        // For example:
        // addDocuments(requestId);
    }

    return (
        <div id="container" className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Approved Requests</h1>
                {requests.length === 0 ? (
                    <p>No requests available.</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Patient Name</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center">{request.patient.name}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link href={`/doctordashboard/approvedRequests/${request.patient.aadharNumber}`}
                                            onClick={() => handlePreviewDocument(request._id)}
                                            className="bg-blue-500 text-white  text-center px-2 py-1 rounded-md mr-2"
                                        >
                                            Preview Document
                                        </Link>
                                        <Link href={`/doctordashboard/approvedRequests/${request.patient.aadharNumber}/adddocs`}
                                            className="bg-green-500 text-white px-2 py-1 text-center rounded-md"
                                        >
                                            Add Documents
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ApprovedRequests;
