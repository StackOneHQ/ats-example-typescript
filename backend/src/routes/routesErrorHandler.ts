import { InvalidRequestError, ForbiddenRequestError, PreconditionFailedError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';
import { Response } from 'express';

export const isKnownError = (
  error: unknown
): error is InvalidRequestError | ForbiddenRequestError | PreconditionFailedError | TooManyRequestsError | ServerError | NotImplementedError | UnhandledError => {
  return (
    error instanceof InvalidRequestError ||
    error instanceof ForbiddenRequestError ||
    error instanceof PreconditionFailedError ||
    error instanceof TooManyRequestsError ||
    error instanceof ServerError ||
    error instanceof NotImplementedError ||
    error instanceof UnhandledError
  );
};

export const handleErrorResponse = (error: unknown, res: Response) => {
  if (isKnownError(error)) {
    res.status(error.status).json({ code: error.code, message: error.message });
  } else {
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};