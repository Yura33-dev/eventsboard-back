import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routes/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
const PORT = Number(env('PORT', '3001'));
export const startServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world',
        });
    });
    app.use(router);
    app.use('*', notFoundHandler);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
