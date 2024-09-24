import Joi from 'joi';

export const createRegistrationSchema = Joi.object({
  fullName: Joi.string().min(2).max(25).required().messages({
    'string.base': 'Full Name should be a string type',
    'string.min': 'Full Name should have 2 letters at least',
    'string.max': 'Full Name should have 25 letters max',
    'any.required': 'Full Name is required field',
  }),
  email: Joi.string().email().min(5).max(30).required().messages({
    'string.base': 'Email should be a string type',
    'string.email': 'Email is invalid',
    'any.required': 'Email is required field',
  }),
  birthDate: Joi.date().required().messages({
    'date.base': 'Date should be match to "YYYY-MM-DD" pattern',
    'any.required': 'Date is required field',
  }),
  heardFrom: Joi.string().required().messages({
    'string.base': 'heardFrom should be a string type',
    'any.required': 'heardFrom is required field',
  }),
});
