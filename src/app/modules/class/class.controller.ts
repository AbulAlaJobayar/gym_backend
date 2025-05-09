import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClassService } from './class.services';

const createNewClassIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.createNewClassIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Class Created successfully',
    data: result,
  });
});
const getMyClassFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(req.user)
  const result = await ClassService.getMyClassFromDB(user?.userId);
console.log({result})
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Retrieved successfully',
    data: result,
  });
});
export const ClassController = {
  createNewClassIntoDB,
  getMyClassFromDB,
};
