import React, { useState } from 'react';

const MedicineTracker = ({ currentMedication, updateCurrentMedication }) => {
  const [medicines, setMedicines] = useState(currentMedication);
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddMedicine = () => {
    if (medicineName && quantity !== '') {
      const newMedicine = [medicineName, parseInt(quantity)];
      const updatedMedicines = [...medicines, newMedicine];
      setMedicines(updatedMedicines);
      updateCurrentMedication(updatedMedicines);
      setMedicineName('');
      setQuantity('');
    }
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    updateCurrentMedication(updatedMedicines);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity (mg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleAddMedicine} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      {medicines.map((medicine, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <button className="border p-2 rounded">{`${medicine[0]} (${medicine[1]} mg)`}</button>
          <button onClick={() => handleRemoveMedicine(index)} className="bg-red-500 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicineTracker;
