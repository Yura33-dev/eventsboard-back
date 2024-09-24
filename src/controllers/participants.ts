import { NextFunction, Request, Response } from 'express';
import { createRegistration } from '../services/participants.js';
import createHttpError from 'http-errors';

export const createRegistrationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params;
  const result = await createRegistration(req.body, eventId);

  if (!result) {
    return next(
      createHttpError(400, 'Participant already registered on this event'),
    );
  }

  res.status(201).json({
    status: 201,
    message: 'Registration successfully created',
  });
};
