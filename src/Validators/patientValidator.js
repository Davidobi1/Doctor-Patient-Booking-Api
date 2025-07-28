const Joi = require('joi');

const validatePatientData = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    age: Joi.number().integer().min(0).max(150).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[+]?[\d\s\-()]{7,20}$/)
        .required()
    }).required()
  });

  return schema.validate(data);
};

module.exports = {
  validatePatientData
};
