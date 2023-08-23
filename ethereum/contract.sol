// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockPHR {

    enum DiseaseType {Cardio, Ortho, Neuro, Dermato, ENT, Others}
    enum DocumentType {Doctor, LabReport, Bill, Insurance, Other}
    enum Gender {M, F, Others}
    enum AllergyLevel {Extreme, Moderate, Insignificant}

    struct Document {
        DocumentType documentType; // Type of Document
        string documentName; // Name of the Document provider. In case of Prescription this is going to be doctor name.
        string documentIPFSHash; // Hash of the Document uploaded on IPFS
        uint256 timestamp; // Time of upload in UNIX time
    }

    struct Disease {
        DiseaseType diseaseType; // Type of Disease
        Document[] documents; // All the documents related to this Disease
        string currentStatus; // Doctor's or Patient's latest remark
        uint256 lastUpdated; // Last update related to this Disease
    }

    struct Allergy {
        string name; // Description of the Allergy
        string Description; // Description of the Allergy
    }

    struct Medicine {
        string name; // Name of the Medicine
        uint16 quantity; // Total mg consumed in a day
    }

    struct BloodPressure {
        uint8 systolic; // Patient's Systolic value (mmHg)
        uint8 diastolic; // Patient's Diastolic value (mmHg)
        string note; // Any retated note
        uint256 time; // UNIX time for the reading
    }

    struct BodyTemperature {
        uint8 temperature; // In F
        string note; // Any related note
        uint256 time; // UNIX time for the reading
    }

    // Define the struct for Patient
    struct Patient {
        address patientAddress; // Ethereum address of the patient
        string firstName; // Patient's First name
        string lastName; // Patient's Last name
        uint128 dob; // Patient's DOB in UNIX time
        string aadharNumber; // Patient's 12 digit Aadhar Number
        Gender gender; // Patient's gender
        uint8 weight; // Patient's current weight
        uint256 lastUpdated; // Timestamp of the last update in UNIX time
    }

    mapping(address => Patient) public patients; // Map patient addresses to their respective Patient struct
    mapping(string => address) public aadharMapping; // Aadhar -> Eth address
    mapping(address => mapping(address => bool)) public allowedDoctors; // Map of allowed Doctors by a Patient

    // Medical mappings for each Patient
    mapping(address => Allergy[]) public allergies;
    mapping(address => Medicine[]) public currentMedication;
    mapping(address => Disease[]) public diseases;
    mapping(address => BloodPressure[]) public bloodPressures;
    mapping(address => BodyTemperature[]) public temperatures;


    // Event to be emitted on successful patient data update
    event PatientDataUpdated(address indexed patientAddress, string patientAadhar, string change, uint256 timestamp);

    // Modifier to check if the caller is the patient themselves
    modifier onlyPatient() {
        require(msg.sender == patients[msg.sender].patientAddress, "Access denied. You are not the patient.");
        _;
    }

    // Modifier to check if the caller is an allowed doctor for a specific patient
    modifier onlyAllowedDoctors(string memory _patientAadharNumber) {
        require(aadharMapping[_patientAadharNumber] != address(0), "Patient does not exist");
        address patientAddress = aadharMapping[_patientAadharNumber];
        require(allowedDoctors[patientAddress][msg.sender], "Access denied. You are not an allowed doctor.");
        _;
    }

    // Function for a patient to allow a doctor to upload documents
    function allowDoctor(address _doctorAddress) external onlyPatient {
        allowedDoctors[msg.sender][_doctorAddress] = true;
    }

    // Function for a patient to disallow a doctor from uploading documents
    function disallowDoctor(address _doctorAddress) external onlyPatient {
        allowedDoctors[msg.sender][_doctorAddress] = false;
    }

    function registerPatient(
        string memory _firstName,
        string memory _lastName,
        uint128 _dob,
        string memory _aadharNumber,
        Gender _gender,
        uint8 _weight,
        Allergy[] memory _allergies,
        Medicine[] memory _currentMedication
    ) external {
        //Ensure that patient with the given address does not already exist
        require(patients[msg.sender].patientAddress == address(0), "Patient already registered");

        // Create a new patient object with the provided details
        Patient storage newPatient = patients[msg.sender];
        newPatient.patientAddress = msg.sender;
        newPatient.firstName = _firstName;
        newPatient.lastName = _lastName;
        newPatient.dob = _dob;
        newPatient.aadharNumber = _aadharNumber;
        newPatient.gender = _gender;
        newPatient.weight = _weight;
        newPatient.lastUpdated = block.timestamp; // Set the current block timestamp as the last updated time

        // Add allergies for the patient
        for (uint256 i = 0; i < _allergies.length; i++) {
            allergies[msg.sender].push(_allergies[i]);
        }

        // Add current medications for the patient
        for (uint256 i = 0; i < _currentMedication.length; i++) {
            currentMedication[msg.sender].push(_currentMedication[i]);
        }

        Disease[] storage _d = diseases[msg.sender];
        // Add an empty Disease of each type for the patient
        for (uint8 j = 0; j < uint8(DiseaseType.Others); j++) {
            Disease storage thisDisease;
            thisDisease.diseaseType = DiseaseType(j);
            thisDisease.currentStatus = "";
            thisDisease.lastUpdated = block.timestamp;
            _d.push(thisDisease);
        }
        
        patients[msg.sender] = newPatient;
        aadharMapping[_aadharNumber] = msg.sender;

        // Trigger an event for the web app
        emit PatientDataUpdated(msg.sender, _aadharNumber, "Patient Registered!", block.timestamp);
    }

    // Function to add or update Medicine for a particular Patient
    function addMedicine(string memory _medicineName, uint16 _quantityInMg) external onlyPatient {
        Patient storage patient = patients[msg.sender];

        // Check if the medicine already exists in the currentMedication array
        bool medicineExists = false;
        for (uint256 i = 0; i < currentMedication[msg.sender].length; i++) {
            Medicine storage medicine = currentMedication[msg.sender][i];
            if (keccak256(bytes(medicine.name)) == keccak256(bytes(_medicineName))) {
                // Medicine already exists, update the quantity if it's different
                if (medicine.quantity != _quantityInMg) {
                    medicine.quantity = _quantityInMg;
                    patient.lastUpdated = block.timestamp;
                    emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Current Medication Updated!", block.timestamp);
                }
                medicineExists = true;
                break;
            }
        }

        // If medicine doesn't exist, add it to the currentMedication array
        if (!medicineExists) {
            Medicine memory newMedicine = Medicine(_medicineName, _quantityInMg);
            currentMedication[msg.sender].push(newMedicine);
            patient.lastUpdated = block.timestamp;
            emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Current Medication Updated!", block.timestamp);
        }
    }

    // Function to remove Medicine for a particular Patient
    function removeMedicine(string memory _medicineName) external onlyPatient {
        Patient storage patient = patients[msg.sender];

        // Find the index of the medicine in the currentMedication array
        uint256 indexToRemove = type(uint256).max;
        for (uint256 i = 0; i < currentMedication[msg.sender].length; i++) {
            Medicine storage medicine = currentMedication[msg.sender][i];
            if (keccak256(bytes(medicine.name)) == keccak256(bytes(_medicineName))) {
                indexToRemove = i;
                break;
            }
        }

        // Check if the medicine was found in the currentMedication array
        require(indexToRemove != type(uint256).max, "Medicine not found");

        // Remove the medicine from the currentMedication array by shifting elements
        for (uint256 i = indexToRemove; i < currentMedication[msg.sender].length - 1; i++) {
            currentMedication[msg.sender][i] = currentMedication[msg.sender][i + 1];
        }
        currentMedication[msg.sender].pop();

        patient.lastUpdated = block.timestamp;
        emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Medicine Removed!", block.timestamp);
    }

    // Function to add Blood Pressure for a particular Patient
    function addBloodPressure(uint8 _systolic, uint8 _diastolic, string memory _note, uint256 _time) external onlyPatient {
        Patient storage patient = patients[msg.sender];
        BloodPressure memory newBloodPressure = BloodPressure(_systolic, _diastolic, _note, _time);

        // Add the new Blood Pressure to the bloodPressures array
        bloodPressures[msg.sender].push(newBloodPressure);

        // // Sort the bloodPressures array based on the timestamp (using insertion sort, because for a prototype size is going to be less)
        // for (uint256 i = 1; i < bloodPressures[msg.sender].length; i++) {
        //     BloodPressure memory current = bloodPressures[msg.sender][i];
        //     uint256 j = i;
        //     while (j > 0 && bloodPressures[msg.sender][j - 1].time > current.time) {
        //         bloodPressures[msg.sender][j] = bloodPressures[msg.sender][j - 1];
        //         j--;
        //     }
        //     bloodPressures[msg.sender][j] = current;
        // }

        patient.lastUpdated = block.timestamp;
        emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Blood Pressure Added!", block.timestamp);
    }

    // Function to add Body Temperature for a particular Patient
    function addBodyTemperature(uint8 _temperature, string memory _note, uint256 _time) external onlyPatient {
        Patient storage patient = patients[msg.sender];
        BodyTemperature memory newBodyTemperature = BodyTemperature(_temperature, _note, _time);

        // Add the new Body Temperature to the temperatures array
        temperatures[msg.sender].push(newBodyTemperature);

        patient.lastUpdated = block.timestamp;
        emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Body Temperature Added!", block.timestamp);
    }

    // Function to add documents for a specific disease for a particular Patient (0-based indexing of _diseaseIndex, as per the Disease enum)
    function addDiseaseDocsByPatient(uint8 _diseaseIndex, Document memory _doc) external onlyPatient {
        require(_diseaseIndex < uint8(DiseaseType.Others), "Invalid disease index");
        Patient storage patient = patients[msg.sender];
        Disease storage disease = diseases[msg.sender][_diseaseIndex];
        disease.documents.push(_doc);
        patient.lastUpdated = block.timestamp;
        emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Disease Document updated!", block.timestamp);
    }

    // Function to add documents for a specific disease for a particular Doctor
    function addDiseaseDocsByDoctor(string memory _patientAadharNumber, uint8 _diseaseIndex, Document memory _doc) external onlyAllowedDoctors(_patientAadharNumber) {
        require(_diseaseIndex < uint8(DiseaseType.Others), "Invalid disease index");
        Patient storage patient = patients[aadharMapping[_patientAadharNumber]];
        Disease storage disease = diseases[msg.sender][_diseaseIndex];
        disease.documents.push(_doc);
        patient.lastUpdated = block.timestamp;
        emit PatientDataUpdated(msg.sender, patient.aadharNumber, "Disease Document updated!", block.timestamp);
    }

    // Function to fetch the patient's details
    function getPatientDetailsByPatient() external view onlyPatient returns (Patient memory) {
        Patient storage patient = patients[msg.sender];
        return patient;
    }

    function getPatientDetailsByDoctor(string memory _patientAadharNumber) external view onlyAllowedDoctors(_patientAadharNumber) returns (Patient memory) {
        Patient storage patient = patients[aadharMapping[_patientAadharNumber]];
        return patient;
    }

    function getAllergiesByPatient() external view onlyPatient returns (Allergy[] memory) {
        return allergies[msg.sender];
    }

    function getDiseasesByPatient() ex
}