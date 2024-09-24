import { HttpError } from 'http-errors';
export const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.message,
            data: err,
        });
        return;
    }
    return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    });
};
