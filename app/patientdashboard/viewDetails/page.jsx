"use client";
import React, { useEffect, useState } from "react";
import useContract from "@/hooks/useBlock";
const ViewDetails = () => {
  const [userAllergies, setUserAllergies] = useState([]);
  const [bp,setBp] = useState(null);
  const [temp,setTemp] = useState("");
  const contractInstance = useContract();
  const user = JSON.parse(localStorage.getItem('user'));
  const getDetails = async () => {
    if (contractInstance) {
      console.log(contractInstance)
      try {
        const response = await contractInstance.methods
          .getAllergiesByPatient()
          .call();

        const resp = await contractInstance.methods
          .currentMedication(user,0)
          .call();
     
          console.log(resp,"check")
       

        setUserAllergies(response);
        console.log(response);
       
        const res = await contractInstance.methods
          .latestBloodPressure(user)
          .call();
          setBp(res);

          const te = await contractInstance.methods.latestBodyTemperature(user).call();
          setTemp(te.temperature)
          
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
          Your Allergies
        </h2>
        <div className="text-center">
          <div className="list-disc pl-6">
            {userAllergies.map((subArray, index) => (
              <li key={index} className="py-0.5 border-b border-black-300">{subArray[0]}</li>
            ))}
          </div>
        </div>
        <br />
        <br />
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Latest BloodPressure
        </h2>
        <div className="text-center">
          <div className="text-xl font-bold">High : {parseInt(bp?.systolic)}</div>
          <div className="text-xl font-bold">low : {parseInt(bp?.diastolic)}</div>
        </div>
        <br />
        <br />
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Latest Body Temperature
        </h2>
        <div className="text-center">
          <div className="text-xl font-bold">Temperature : {parseInt(temp)}℃</div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
