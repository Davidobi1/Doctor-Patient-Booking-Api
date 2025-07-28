const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId
} = require('../controllers/appointmentController');

// Create a new appointment
router.post('/appointments', createAppointment);

// Get appointments by doctor ID
router.get('/appointments?doctorId={id}', getAppointmentsByDoctorId);

// Get appointments by patient ID
router.get('/appointments?patientId={id}', getAppointmentsByPatientId);

module.exports = router;
