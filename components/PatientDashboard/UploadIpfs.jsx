import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { useDropzone } from 'react-dropzone';
import { PulseLoader } from 'react-spinners';

const UploadToIPFS = ({ cid, setCid }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFGOTc5Y0NCODQ2NGQyYTMyODU3ZjBEMjA2NDczNzZhNTQxQjEzMDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTE1OTkwMDE0NzgsIm5hbWUiOiJncmlkaXBmcyJ9.df-rtD8y3ttExBEPLarMq4bYWx2f9kDq922E6EeFtPI' });

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploading(true);

      try {
        const cid = await client.put([file]);

        setUploadedFile(file);
        setCid(cid);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className="mb-5">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select a file</p>
      </div>
      {uploading && (
        <div className="mt-2">
          <PulseLoader size={10} color="#4A90E2" />
          <p>Uploading...</p>
        </div>
      )}
      {uploadedFile && (
        <div className="mt-2">
          <p>File Uploaded:</p>
          <p>File Name: {uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default UploadToIPFS;
