import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ClassValidation } from './class.validation';
import { ClassController } from './class.controller';

const router = Router();
router.post(
  '/create-classes',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ClassValidation.createClassValidation),
  ClassController.createNewClassIntoDB,
);
router.get(
  '/my-classes',
  auth(ENUM_USER_ROLE.TRAINER),
  ClassController.getMyClassFromDB,
);
router.get(
  '/classes',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.TRAINEE),
  ClassController.getAllClassFromDB,
);
router.get(
  '/classes/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER),
  ClassController.getSingleClassFromDB,
);
router.put(
  '/classes/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ClassController.updateClassIntoDB,
);
router.delete(
  '/classes/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ClassController.deleteClassFromDB,
);
router.get(
  '/available-classes',
  auth(ENUM_USER_ROLE.TRAINEE),
  ClassController.availableClassFromDB,
);

export const ClassRoutes = router;
