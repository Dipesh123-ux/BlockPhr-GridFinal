import React, { useState,useContext } from 'react';

const SearchBar = ({ onSearch }) => {
  const [aadharNumber, setAadharNumber] = useState('');

  
  const handleSearch = () => {
    onSearch(aadharNumber);
    setAadharNumber("");
  };

  return (
    <div className="relative space-x-2">
      <input
        type="text"
        placeholder="Search user by Aadhar card"
        className="border rounded px-2 py-1 w-60"
        value={aadharNumber}
        onChange={(e) => setAadharNumber(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
