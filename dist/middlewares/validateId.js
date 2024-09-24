import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
export const validateId = (req, response, next) => {
    const { eventId } = req.params;
    if (!isValidObjectId(eventId)) {
        next(createHttpError(400, 'Bad request (id)'));
        return;
    }
    next();
};
