import React, { useState } from 'react';
import { Allergies } from './data/Allergies'

const AllergySelector = ({ selectedAllergies, updateSelectedAllergies }) => {

  const toggleAllergy = (allergy) => {
    const foundIndex = selectedAllergies.findIndex(
      (selectedAllergy) => selectedAllergy[0] === allergy.name
    );

    let updatedAllergies = [...selectedAllergies];

    if (foundIndex !== -1) {
      updatedAllergies = selectedAllergies.filter(
        (selectedAllergy) => selectedAllergy[0] !== allergy.name
      );
    } else {
      updatedAllergies.push([allergy.name, '']);
    }
    updateSelectedAllergies(updatedAllergies);
  };


  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Allergies.map(allergy => (
        <button
          key={allergy.id}
          onClick={() => toggleAllergy(allergy)}
          className={`py-2 px-4 border ${selectedAllergies.some(
            (selectedAllergy) => selectedAllergy[0] === allergy.name
          )
              ? 'bg-blue-500 text-white'
              : 'border-blue-500 text-blue-500'
            } rounded-full hover:bg-blue-500 hover:text-white focus:outline-none transition-colors duration-300`}
          title={allergy.description}
        >
          {allergy.name}
        </button>
      ))}
    </div>
  );
};

export default AllergySelector;
