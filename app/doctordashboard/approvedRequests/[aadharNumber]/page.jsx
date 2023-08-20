"use client";
import React, { useState, useEffect } from "react";
import useContract from "@/hooks/useBlock";

const UploadDocumentForm = ({params}) => {
  const [cardio, setCardio] = useState([]);
  const [ortho, setOthro] = useState([]);
  const [neuro, setNeuro] = useState([]);
  const [dermato, setDermato] = useState([]);
  const [ent, setEnt] = useState([]);
  const contractInstance = useContract();
  const diseaseOptions = [
    "Cardio",
    "Ortho",
    "Neuro",
    "Dermato",
    "ENT",
    "Others",
  ];

  const documentOptions = ["Doctor", "LabReport", "Bill", "Insurance", "Other"];
  const getDetails = async () => {
    if (contractInstance) {
      try {
        const response = await contractInstance.methods
          .getDiseasesByDoctor(params.aadharNumber)
          .call();
        setCardio(response[0]);
        setOthro(response[1]);
        setNeuro(response[2]);
        setDermato(response[3]);
        setEnt(response[4]);
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
    <div id="container" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Upload Document</h1>

        <div className="mt-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">Disease Type</th>
                <th className="py-2 px-4">Document Type</th>
                <th className="py-2 px-4">Document Link</th>
              </tr>
            </thead>
            <tbody>
              {cardio?.documents?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 text-center">Cardio</td>
                  <td className="py-2 px-4 text-center">
                    {documentOptions[row.documentType]}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      target="blank"
                      className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                      href={`https://ipfs.io/ipfs/${row.documentIPFSHash}`}
                    >
                      <span className="border-b border-blue-500 pb-1">
                        Preview
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
              {ortho?.documents?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 text-center">Ortho</td>
                  <td className="py-2 px-4 text-center">
                    {documentOptions[row.documentType]}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      target="blank"
                      className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                      href={`https://ipfs.io/ipfs/${row.documentIPFSHash}`}
                    >
                     <span className="border-b border-blue-500 pb-1">
                        Preview
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
              {dermato?.documents?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 text-center">Dermato</td>
                  <td className="py-2 px-4 text-center">
                    {documentOptions[row.documentType]}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      target="blank"
                      className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                      href={`https://ipfs.io/ipfs/${row.documentIPFSHash}`}
                    >
                     <span className="border-b border-blue-500 pb-1">
                        Preview
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
              {neuro?.documents?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 text-center">Neuro</td>
                  <td className="py-2 px-4 text-center">
                    {documentOptions[row.documentType]}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      target="blank"
                      className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                      href={`https://ipfs.io/ipfs/${row.documentIPFSHash}`}
                    >
                      <span className="border-b border-blue-500 pb-1">
                        Preview
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
              {ent?.documents?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 text-center">ENT</td>
                  <td className="py-2 px-4 text-center">
                    {documentOptions[row.documentType]}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      target="blank"
                       className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                      href={`https://ipfs.io/ipfs/${row.documentIPFSHash}`}
                    >
                     <span className="border-b border-blue-500 pb-1">
                        Preview
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentForm;
