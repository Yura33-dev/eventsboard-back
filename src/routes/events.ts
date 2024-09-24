import { Router } from 'express';
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  getEventParticipantsController,
} from '../controllers/events.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createEventSchema } from '../validation/events.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();

router.get('/', controllerWrapper(getAllEventsController));
router.get('/:eventId', validateId, controllerWrapper(getEventByIdController));
router.get(
  '/:eventId/participants',
  validateId,
  controllerWrapper(getEventParticipantsController),
);
router.post(
  '/',
  validateBody(createEventSchema),
  controllerWrapper(createEventController),
);
router.delete(
  '/:eventId',
  validateId,
  controllerWrapper(deleteEventController),
);

export default router;
