const express = require('express');
const doctorController = require('../Controllers/doctorController');
const router = express.Router();

// GET /api/doctors — List doctors (pagination + filter)
router.get('/', doctorController.getAllDoctors);

// GET /api/doctors/:id — Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

// POST /api/doctors — Create new doctor
router.post('/', doctorController.createDoctor);

// PUT /api/doctors/:id — Update doctor
router.put('/:id', doctorController.updateDoctor);

// DELETE /api/doctors/:id — Delete doctor
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
