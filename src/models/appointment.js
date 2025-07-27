const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
