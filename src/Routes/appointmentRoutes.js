const express = require('express');
const appointmentController = require('../Controllers/appointmentController');
const router = express.Router();

// POST /api/appointments — Create a new appointment
router.post('/', appointmentController.createAppointment);

// GET /api/appointments — List appointments by doctor or patient
router.get('/', appointmentController.getAppointments);

// PATCH /api/appointments/:id/status — Update status
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

// GET /api/appointments/patients — List all patients
router.get('/patients', appointmentController.getPatients);

// POST /api/appointments/patients — Create a new patient
router.post('/patients', appointmentController.createPatient);

module.exports = router;
