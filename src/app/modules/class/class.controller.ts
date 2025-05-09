import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClassService } from './class.services';
import pick from '../../../helpers/pick';

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
  console.log(req.user);
  const result = await ClassService.getMyClassFromDB(user?.userId);
  console.log({ result });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Retrieved successfully',
    data: result,
  });
});
const getAllClassFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'status',
    'trainerId',
    'date',
    'startDate',
    'endDate',
    'availability',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await ClassService.getAllClassFromDB(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleClassFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassService.getSingleClassFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Retrieved successfully',
    data: result,
  });
});
const updateClassIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassService.updateClassIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Updated successfully',
    data: result,
  });
});
const deleteClassFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassService.deleteClassFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class Deleted successfully',
    data: result,
  });
});
const availableClassFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log('hello word');
  const result = await ClassService.availableClassFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Available Class retrieved successfully',
    data: result,
  });
});
export const ClassController = {
  createNewClassIntoDB,
  getMyClassFromDB,
  getAllClassFromDB,
  getSingleClassFromDB,
  updateClassIntoDB,
  deleteClassFromDB,
  availableClassFromDB,
};
