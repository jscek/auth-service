import { Request, Response, NextFunction } from 'express';

//! Todo: Create custom errors and improve handling
const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    return response.status(500).json({ message: error.message });
  }

  response.status(500).json({ message: 'Something went wrong' });
};

export { errorHandler };
