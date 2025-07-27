const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contactInfo: {
    email: String,
    phone: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
