import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../../shared/sendResponse';

const createAdminIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdminIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admin created successfully',
    data: result,
  });
});
const createTrainerIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createTrainerIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Trainer created successfully',
    data: result,
  });
});
const createTraineeIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createTraineeIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Trainee created successfully',
    data: result,
  });
});
const getAllTrainersFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllTrainersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Trainee retrieved successfully',
    data: result,
  });
});
export const UserController = {
  createAdminIntoDB,
  createTrainerIntoDB,
  createTraineeIntoDB,
  getAllTrainersFromDB
};
