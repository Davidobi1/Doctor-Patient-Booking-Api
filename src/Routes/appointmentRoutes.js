const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId
} = require('../controllers/appointmentController');

// CREATE APPOINTMENT
router.post('/', createAppointment);

// GET appointments by doctorId or patientId (using query)
router.get('/', (req, res, next) => {
  if (req.query.doctorId) {
    return getAppointmentsByDoctorId(req, res, next);
  }
  if (req.query.patientId) {
    return getAppointmentsByPatientId(req, res, next);
  }

  // If no query provided
  return res.status(400).json({
    success: false,
    message: 'Please provide doctorId or patientId'
  });
});

module.exports = router;