import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createRegistrationSchema } from '../validation/participants.js';
import { createRegistrationController } from '../controllers/participants.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();

router.post(
  '/:eventId',
  validateId,
  validateBody(createRegistrationSchema),
  controllerWrapper(createRegistrationController),
);
export default router;
