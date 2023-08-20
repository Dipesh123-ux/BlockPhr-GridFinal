const API = "https://drab-plum-monkey-wrap.cyclic.cloud/api";

export const userExists = async (address) => {
  const response = await fetch(`${API}/getAddress/${address}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const postAddress = async (name, address, isDoctor, aadhar) => {
  const response = await fetch(`${API}/addAddress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      address,
      isDoctor,
      aadharNumber: aadhar,
    }),
  });
  const result = await response.json();

  return result;
};
export const postDoctor = async (name, address, gender, aadharNumber) => {
  const response = await fetch(`${API}/addDoctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      address,
      gender,
      aadharNumber,
    }),
  });
  const result = await response.json();

  return result;
};

export const getUserByAadhar = async (aadhar) => {
  const response = await fetch(`${API}/getuser/${aadhar}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const sendRequest = async (patientId, doctorId) => {
  const response = await fetch(`${API}/sendrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      patientId,
      doctorId,
    }),
  });
  const result = await response.json();

  return result;
};

export const fetchRequests = async (doctorId) => {
  const response = await fetch(`${API}/doctor/sentrequests/${doctorId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};
export const fetchApprovedRequests = async (doctorId) => {
  const response = await fetch(`${API}/doctor/approvedrequests/${doctorId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const fetchReceivedRequests = async (patientId) => {
  const response = await fetch(`${API}/patient/receivedrequests/${patientId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};
export const fetchApprovedRequestsByPatient = async (patientId) => {
  const response = await fetch(`${API}/patient/approvedrequests/${patientId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};



export const confirmRequest = async (requestId) => {
  const response = await fetch(`${API}/confirmrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      requestId,
    }),
  });
  const result = await response.json();

  return result;
};
export const rejectRequest = async (requestId) => {
  const response = await fetch(`${API}/rejectrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      requestId,
    }),
  });
  const result = await response.json();
  return result;
};
