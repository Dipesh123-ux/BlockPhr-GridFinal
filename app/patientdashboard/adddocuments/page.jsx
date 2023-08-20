"use client"
import React, { useState } from 'react';
import UploadToIPFS from '@/components/PatientDashboard/UploadIpfs';
import useContract from '@/hooks/useBlock';
import CircularProgress from '@mui/material/CircularProgress';

const DocumentPage = () => {
  const [diseaseTypeIndex, setDiseaseTypeIndex] = useState(-1);
  const [documentTypeIndex, setDocumentTypeIndex] = useState(-1);
  const [documentProvider, setDocumentProvider] = useState('');
  const [cid, setCid] = useState("");
  const [loading,setLoading] = useState(false);

  const contractInstance = useContract();

  const diseaseOptions = [
    'Cardio', 'Ortho', 'Neuro', 'Dermato', 'ENT', 'Others'
  ];

  const documentOptions = [
    'Doctor', 'LabReport', 'Bill', 'Insurance', 'Other'
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      console.log(diseaseTypeIndex, [documentTypeIndex, documentProvider, cid])
      console.log(contractInstance)
      const res = await contractInstance.methods.addDiseaseDocsByPatient(diseaseTypeIndex, [documentTypeIndex, documentProvider, cid,1792402588]).send({from : user});
      setLoading(false);
      console.log(res,"check-response");
      setDiseaseTypeIndex(-1);
      setDocumentProvider("");
      setDocumentTypeIndex(-1);
    }
    catch (err) {

    }
  }

  return (
    <div id="container" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Upload Document</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Disease Type</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            value={diseaseTypeIndex}
            onChange={e => setDiseaseTypeIndex(parseInt(e.target.value))}
          >
            <option value={-1}>Select Disease Type</option>
            {diseaseOptions.map((option, index) => (
              <option key={option} value={index}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Document Type</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            value={documentTypeIndex}
            onChange={e => setDocumentTypeIndex(parseInt(e.target.value))}
          >
            <option value={-1}>Select Document Type</option>
            {documentOptions.map((option, index) => (
              <option key={option} value={index}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Document Provider</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            value={documentProvider}
            onChange={e => setDocumentProvider(e.target.value)}
          />
        </div>

        <UploadToIPFS cid={cid} setCid={setCid} />

        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default DocumentPage;
