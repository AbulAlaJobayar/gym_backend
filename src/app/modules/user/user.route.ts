import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();
router.post(
  '/create-admin',
  validateRequest(UserValidation.createUser),
  UserController.createAdminIntoDB,
);
router.post(
  '/create-trainer',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUser),
  UserController.createTrainerIntoDB,
);
router.post(
  '/create-trainee',
  validateRequest(UserValidation.createUser),
  UserController.createTraineeIntoDB,
);
router.get(
  '/trainers',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllTrainersFromDB,
);

export const UserRoutes = router;
