import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params;

  if (!isValidObjectId(eventId)) {
    next(createHttpError(400, 'Bad request (id)'));
    return;
  }

  next();
};
