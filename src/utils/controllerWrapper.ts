import { NextFunction, Request, Response } from 'express';

type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const controllerWrapper = (controller: controllerType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
