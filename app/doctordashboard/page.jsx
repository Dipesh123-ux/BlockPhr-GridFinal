"use client"
"use client";
import React, { useEffect, useState ,useContext} from "react";
import useContract from "@/hooks/useBlock";
import Link from "next/link";
import { userExists } from "@/apis/address";
import AuthContext from "@/context/authContext";

const UserDashboard = () => {
  const contractInstance = useContract();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [userDetails, setUserDetails] = useState({
    name: "",
    gender: "",
    dob: "",
    aadharNumber: "",
  });

  const getDetails = async () => {

    try {
      var response = await userExists(user);
      console.log(response)
      response = response.user;
      setUserDetails({
        name: response.name,
        gender: response.gender,
        aadharNumber: response.aadharNumber,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
      getDetails();
  }, []);

  return (
    <div id="container" className="bg-gray-100 min-h-screen py-10 flex items-center ">
      <div className="max-w-xl mx-auto bg-white p-20 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Doctor Dashboard</h2>
        <div className="text-center" >
          <p className="mb-2">
            Name: {userDetails.name}
          </p>
          <p className="mb-2">Gender: {userDetails.gender}</p>
          <p className="mb-2">Aadhar Card Number: {userDetails.aadharNumber}</p>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/doctordashboard/requestDocuments" className="px-4 text-center py-2 w-52 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
            Request Documents
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/doctordashboard/approvedRequests" className="px-4 text-center py-2 w-52 bg-green-500 text-white rounded hover:bg-green-600 mr-4">
             Approved Requests
          </Link>
        </div>
      </div>
    </div>

  );
};

export default UserDashboard;
