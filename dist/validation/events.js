import Joi from 'joi';
export const createEventSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Title should be a string type',
        'string.min': 'Title should have 3 letters at least',
        'string.max': 'Title should have 30 letters max',
        'any.required': 'Title is required field',
    }),
    imageUrl: Joi.string().messages({
        'string.base': 'imageUrl should be a string type',
    }),
    humanDate: Joi.string().messages({
        'string.base': 'humanDate should be a string type',
    }),
    type: Joi.string().messages({
        'string.base': 'type should be a string type',
    }),
    date: Joi.date().allow(null).messages({
        'date.base': 'Date should be match to "YYYY-MM-DD" pattern',
    }),
    promoter: Joi.string().max(30).messages({
        'string.base': 'Organizer should be a string type',
        'string.max': 'Organizer should have 30 letters max',
    }),
    city: Joi.string().messages({
        'string.base': 'city should be a string type',
    }),
    venue: Joi.string().messages({
        'string.base': 'venue should be a string type',
    }),
});
