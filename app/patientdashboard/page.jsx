"use client";
import React, { useEffect, useState } from "react";
import useContract from "@/hooks/useBlock";
import Link from "next/link";

const UserDashboard = () => {
  const contractInstance = useContract();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    aadharNumber: "",
  });

  const convertUnixToNormalDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();

    return `${day}-${month}-${year}`;
  };

  const getGender = (g) => {
    if (g == 0) {
      return "Male";
    } else if (g == 1) {
      return "Female";
    } else return "Other";
  };

  const getDetails = async () => {
    if (contractInstance) {
      try {
        const response = await contractInstance.methods
          .getPatientDetailsByPatient()
          .call();
  
        setUserDetails({
          firstName: response.firstName,
          lastName: response.lastName,
          gender: getGender(response.gender),
          dob: convertUnixToNormalDate(parseInt(response.dob)),
          aadharNumber: response.aadharNumber,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    if (contractInstance) {
      getDetails();
    }
  }, [contractInstance]);

  return (
    <div
      id="container"
      className="bg-gray-100 min-h-screen py-10 flex items-center "
    >
      <div className="max-w-xl mx-auto bg-white p-20 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Patient Dashboard
        </h2>
        <div className="text-center">
          <p className="mb-2">
            Name: {userDetails.firstName} {userDetails.lastName}
          </p>
          <p className="mb-2">Gender: {userDetails.gender}</p>
          <p className="mb-2">Date of Birth: {userDetails.dob}</p>
          <p className="mb-2">Aadhar Card Number: {userDetails.aadharNumber}</p>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="/patientdashboard/updateDetails"
            className="px-4 text-center py-2 w-52 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
          >
            Update Details
          </Link>
          <Link href={'/patientdashboard/viewDetails'} className="px-4 text-center py-2 w-52 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
            View Details
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="/patientdashboard/adddocuments"
            className="px-4 text-center py-2 w-52 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
          >
            Add Documents
          </Link>
          <Link
            href="/patientdashboard/viewDocument"
            className="px-4 text-center py-2 w-52 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
          >
            View Document
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Link href={'/patientdashboard/viewRequests'} className="px-4 text-center py-2 w-52 bg-purple-500 text-white rounded hover:bg-purple-600 mr-4">
            View Requests
          </Link>
          <Link href={'/patientdashboard/approvedrequests'} className="px-4 text-center py-2 w-52 bg-purple-500 text-white rounded hover:bg-purple-600 mr-4">
            Approved Requests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
