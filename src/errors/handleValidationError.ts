import { Prisma } from '@prisma/client';
import { IGenericErrorResponse } from '../interfaces/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const handleValidationError = (
  error: PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [{
    field: "",
    message: error.message,
  }]
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error occurred',
    errorDetails: errors,
  };
};

export default handleValidationError;
