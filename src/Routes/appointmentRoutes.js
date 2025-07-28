const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId
} = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', createAppointment);

// Get appointments by doctor ID
router.get('/by-doctor', getAppointmentsByDoctorId);

// Get appointments by patient ID
router.get('/by-patient', getAppointmentsByPatientId);

module.exports = router;
