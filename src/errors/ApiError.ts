class ApiError extends Error {
  statusCode: number;
  errorDetails?: string | undefined;
  constructor(
    statusCode: number,
    message: string | undefined,
    errorDetails?: string | undefined,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
