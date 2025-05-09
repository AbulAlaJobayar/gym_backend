import { Booking } from './../../../../generated/prisma/index.d';
import { z } from 'zod';
const createBookingValidation = z.object({
  classId: z.string({ message: 'Class ID is required' }),
});
export const BookingValidation = {
  createBookingValidation,
};
