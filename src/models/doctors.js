const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  timings: [String],
  contactInfo: {
    email: String,
    phone: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
