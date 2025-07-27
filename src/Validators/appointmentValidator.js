const Joi = require('joi');

const validateAppointmentData = (data) => {
  const schema = Joi.object({
    doctorId: Joi.string().required(),
    patientId: Joi.string().required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    notes: Joi.string().max(500).optional().allow('')
  });

  return schema.validate(data);
};

module.exports = {
  validateAppointmentData
};