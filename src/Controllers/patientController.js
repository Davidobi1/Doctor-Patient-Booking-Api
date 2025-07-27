const Patient = require('../models/patients');

exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender, contactInfo } = req.body;

    if (!name || !contactInfo?.email || !contactInfo?.phone || !gender) {
      return res.status(400).json({ success: false, message: 'Missing required patient details' });
    }

    const patient = new Patient({ name, age, gender, contactInfo });
    const savedPatient = await patient.save();

    res.status(201).json({ success: true, data: savedPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create patient', error: error.message });
  }
};
