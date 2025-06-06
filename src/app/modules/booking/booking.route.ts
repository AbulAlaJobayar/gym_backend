import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();
router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.TRAINEE),
  validateRequest(BookingValidation.createBookingValidation),
  BookingController.createBookingIntoDB,
);
router.get(
  '/all-booking',
  auth(ENUM_USER_ROLE.TRAINEE),
  BookingController.getBookingFromTrainee,
);
router.post(
  '/cancel-booking',
  auth(ENUM_USER_ROLE.TRAINEE),
  BookingController.cancelBookingFromDB,
);

export const BookingRoutes = router;
