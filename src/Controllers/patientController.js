const Patient = require('../models/patients');
const { validatePatientData } = require('../validators/patientValidator');

const createPatient = async (req, res) => {
  try {
    const { error } = validatePatientData(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const patient = new Patient(req.body);
    const savedPatient = await patient.save();

    res.status(201).json({ success: true, data: savedPatient });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create patient',
      error: error.message,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch patients', details: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients
};
