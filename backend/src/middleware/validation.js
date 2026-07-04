const Joi = require('joi');

const leadSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 255 characters'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format'
    }),
  phone: Joi.string()
    .optional()
    .allow('')
    .pattern(/^[\d\s\-\+\(\)]*$/)
    .messages({
      'string.pattern.base': 'Invalid phone number format'
    }),
  source: Joi.string()
    .optional()
    .max(100)
    .default('landing_page')
});

exports.validateLead = (data) => {
  return leadSchema.validate(data, { abortEarly: false });
};