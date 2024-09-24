import { Router } from 'express';
import eventsRouter from './events.js';
import participantsRouter from './participants.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/participants', participantsRouter);

export default router;
