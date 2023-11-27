const DocumentRequest = require("../models/documentRequest");

exports.sendRequest = async (req, res, next) => {
  const { doctorId, patientId } = req.body;

  try {
    // Check if the request already exists
    const existingRequest = await DocumentRequest.findOne({
      doctor: doctorId,
      patient: patientId,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Create a new request
    const newRequest = new DocumentRequest({
      doctor: doctorId,
      patient: patientId,
      status: "pending",
    });

    await newRequest.save();
    res.json({ message: "Request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.confirmRequest = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await DocumentRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Request has already been processed" });
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.rejectRequest = async (req, res, next) => {
  const { requestId } = req.body;

  try {
    const request = await DocumentRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

   await DocumentRequest.findByIdAndRemove(requestId);

    res.json({ message: "rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};


//for patients

exports.getAllReceivedRequsts = async (req, res) => {
  const { patientId } = req.params;

  try {
    const requests = await DocumentRequest.find({
      patient: patientId,
      status : "pending"
    }).populate("doctor");
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getApprovedRequests = async (req, res) => {
  const { patientId } = req.params;

  try {
    const approvedRequests = await DocumentRequest.find({
      patient: patientId,
      status: "accepted",
    }).populate("doctor");
    res.json(approvedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// for doctors

exports.sentRequests = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const requestsSent = await DocumentRequest.find({
      doctor: doctorId,
      status: "pending",
    }).populate("patient");
    res.json(requestsSent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.approvedRequests = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const approvedRequestsDoctor = await DocumentRequest.find({
      doctor: doctorId,
      status: "accepted",
    }).populate("patient");
    res.json(approvedRequestsDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
