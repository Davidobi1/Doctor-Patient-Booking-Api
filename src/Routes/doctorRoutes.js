const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
} = require('../controllers/doctorController');

// Create a new doctor
router.post('/', createDoctor);

// Get all doctors with pagination and optional specialization filter
router.get('/', getDoctors);

// Get a specific doctor by ID
router.get('/:id', getDoctorById);

module.exports = router;
