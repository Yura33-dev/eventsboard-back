import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

export const validateBody =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        const error = createHttpError(400, 'Bad request', {
          errors: err.details,
        });
        next(error);
      }
    }
  };
