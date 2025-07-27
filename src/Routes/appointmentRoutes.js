const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAllPatientsFromAppointments
} = require('../Controllers/appointmentController');

router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/patients', getAllPatientsFromAppointments);

module.exports = router;
