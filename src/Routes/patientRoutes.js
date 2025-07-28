const express = require('express');
const router = express.Router();
const { 
    createPatient, 
    getAllPatients
} = require('../controllers/patientController');

// Create a new patient
router.post('/', createPatient);

// Get all patients
router.get('/', getAllPatients);

module.exports = router;
