import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.services';

const createBookingIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.user;
  const { classId } = req.body;


  const result = await BookingService.createBookingIntoDB(classId, id?.userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Booking created successfully',
    data: result,
  });
});
export const BookingController = {
  createBookingIntoDB,
};
