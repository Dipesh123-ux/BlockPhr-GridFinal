const express = require("express");
const router = express.Router();
const {
  postDoctor,
  getDoctor,
  addDoctorsDetails,
  getPatientByAadhar,
} = require("../controllers/auth");

router.get("/getuser/:aadharNumber", getPatientByAadhar);
router.get("/getAddress/:id", getDoctor);
router.post("/addAddress", postDoctor);
router.post("/addDoctor", addDoctorsDetails);

module.exports = router;
