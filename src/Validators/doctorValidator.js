const Joi = require('joi');

const validateDoctorData = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    specialization: Joi.string().min(2).max(50).required(),
    timings: Joi.array().items(Joi.string()).min(1).required(),
    contactInfo: Joi.object({
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^[+]?[\d\s\-\(\)]+$/)
    }).optional()
  });

  return schema.validate(data);
};

module.exports = {
  validateDoctorData
};