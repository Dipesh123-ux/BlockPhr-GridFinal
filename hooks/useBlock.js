"use client";
import { useEffect, useState } from "react";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x8e085319e24119272Da57BD55Be91f58a7463F30";
const ABI =[
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_systolic",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_diastolic",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "addBloodPressure",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_temperature",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "addBodyTemperature",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientAadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_diseaseIndex",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "enum BlockPHR.DocumentType",
						"name": "documentType",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "documentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "documentIPFSHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Document",
				"name": "_doc",
				"type": "tuple"
			}
		],
		"name": "addDiseaseDocsByDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_diseaseIndex",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "enum BlockPHR.DocumentType",
						"name": "documentType",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "documentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "documentIPFSHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Document",
				"name": "_doc",
				"type": "tuple"
			}
		],
		"name": "addDiseaseDocsByPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_medicineName",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "_quantityInMg",
				"type": "uint16"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "allowDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "disallowDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			},
			{
				"internalType": "uint128",
				"name": "_dob",
				"type": "uint128"
			},
			{
				"internalType": "string",
				"name": "_aadharNumber",
				"type": "string"
			},
			{
				"internalType": "enum BlockPHR.Gender",
				"name": "_gender",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_weight",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Description",
						"type": "string"
					}
				],
				"internalType": "struct BlockPHR.Allergy[]",
				"name": "_allergies",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint16",
						"name": "quantity",
						"type": "uint16"
					}
				],
				"internalType": "struct BlockPHR.Medicine[]",
				"name": "_currentMedication",
				"type": "tuple[]"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_medicineName",
				"type": "string"
			}
		],
		"name": "removeMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "aadharMapping",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allergies",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Description",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowedDoctors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "currentMedication",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint16",
				"name": "quantity",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "diseases",
		"outputs": [
			{
				"internalType": "enum BlockPHR.DiseaseType",
				"name": "diseaseType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "currentStatus",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lastUpdated",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllergiesByPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Description",
						"type": "string"
					}
				],
				"internalType": "struct BlockPHR.Allergy[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientAadharNumber",
				"type": "string"
			}
		],
		"name": "getDiseasesByDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum BlockPHR.DiseaseType",
						"name": "diseaseType",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "enum BlockPHR.DocumentType",
								"name": "documentType",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "documentName",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "documentIPFSHash",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct BlockPHR.Document[]",
						"name": "documents",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "currentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "lastUpdated",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Disease[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDiseasesByPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum BlockPHR.DiseaseType",
						"name": "diseaseType",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "enum BlockPHR.DocumentType",
								"name": "documentType",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "documentName",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "documentIPFSHash",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							}
						],
						"internalType": "struct BlockPHR.Document[]",
						"name": "documents",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "currentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "lastUpdated",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Disease[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientAadharNumber",
				"type": "string"
			}
		],
		"name": "getPatientDetailsByDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "uint128",
						"name": "dob",
						"type": "uint128"
					},
					{
						"internalType": "string",
						"name": "aadharNumber",
						"type": "string"
					},
					{
						"internalType": "enum BlockPHR.Gender",
						"name": "gender",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "weight",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lastUpdated",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Patient",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatientDetailsByPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "uint128",
						"name": "dob",
						"type": "uint128"
					},
					{
						"internalType": "string",
						"name": "aadharNumber",
						"type": "string"
					},
					{
						"internalType": "enum BlockPHR.Gender",
						"name": "gender",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "weight",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lastUpdated",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockPHR.Patient",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "latestBloodPressure",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "systolic",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "diastolic",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "latestBodyTemperature",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "temperature",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "patients",
		"outputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lastName",
				"type": "string"
			},
			{
				"internalType": "uint128",
				"name": "dob",
				"type": "uint128"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "enum BlockPHR.Gender",
				"name": "gender",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "weight",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lastUpdated",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const useContract = () => {
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    async function initializeContract() {
      try {
        if (window.ethereum) {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
            from: accounts[0], // Use the selected MetaMask account as the default account
          });

          setContractInstance(contract);
        } else {
          console.log(
            "Please install MetaMask or another Ethereum-compatible browser extension."
          );
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    }

    initializeContract();
  }, []);

  return contractInstance;
};

export default useContract;
