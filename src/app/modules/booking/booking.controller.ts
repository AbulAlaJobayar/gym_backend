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
const getBookingFromTrainee = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user;

    const result = await BookingService.getBookingFromTrainee(id?.userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'All Booking From Trainee ',
      data: result,
    });
  },
);

const cancelBookingFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.user;
  const { bookingId } = req.body;
  const result = await BookingService.cancelBookingFromDB(
    bookingId,
    id?.userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'cancel booking From Trainee ',
    data: result,
  });
});
export const BookingController = {
  createBookingIntoDB,
  getBookingFromTrainee,
  cancelBookingFromDB,
};
