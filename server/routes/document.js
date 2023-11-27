const express = require('express');
const router = express.Router();
const {sendRequest,confirmRequest, getAllReceivedRequsts, getApprovedRequests,sentRequests, approvedRequests,rejectRequest} = require('../controllers/document')

router.post('/sendrequest',sendRequest);
router.post('/confirmrequest',confirmRequest);
router.post('/rejectrequest',rejectRequest);

// for patients

router.get('/patient/receivedrequests/:patientId',getAllReceivedRequsts);
router.get('/patient/approvedrequests/:patientId',getApprovedRequests);

//for doctors

router.get('/doctor/sentrequests/:doctorId',sentRequests);
router.get('/doctor/approvedrequests/:doctorId',approvedRequests)

module.exports = router;