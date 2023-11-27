const User = require("../models/user");

exports.getDoctor = async (req, res, next) => {
  try {
    const address = req.params.id;

    const user = await User.findOne({ address: address });

    if (user) {
      return res.status(200).json({
        message: "exist",
        isDoctor: user.isDoctor,
        user: user,
      });
    }

    return res.status(200).json({
      message: "not exist",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postDoctor = async (req, res, next) => {
  try {
    const { address, isDoctor, name, aadharNumber } = req.body;

    const user = await User.findOne({ address: address });

    if (user) {
      return res.status(200).json({
        message: "success",
        isDoctor: user.isDoctor,
        user: user,
      });
    }

    const newUser = await User.create({
      address: address,
      isDoctor: isDoctor,
      name: name,
      aadharNumber,
    });

    return res.status(200).json({
      message: "success",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addDoctorsDetails = async (req, res) => {
  try {
   
    const { address, name, aadharNumber, gender } = req.body;

    const user = await User.findOne({ address: address, isDoctor: true });

    if (user) {
      return res.status(200).json({
        message: "success",
        isDoctor: user.isDoctor,
        user: user,
      });
    }

    const newUser = await User.create({
      address: address,
      isDoctor: true,
      name: name,
      aadharNumber,
      gender,
    });

    return res.status(200).json({
      message: "success",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPatientByAadhar = async (req, res) => {
  try {
    const aadharNumber = req.params.aadharNumber;
    const patient = await User.findOne({ aadharNumber: aadharNumber });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      message: "success",
      user: patient,
    });
  } catch (err) {
    console.log(err);
  }
};
