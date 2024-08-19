import axios from 'axios';
import { 
    InvalidRequestError, 
    ForbiddenRequestError, 
    PreconditionFailedError, 
    TooManyRequestsError, 
    ServerError, 
    NotImplementedError, 
    UnhandledError 
} from '../errors/stackoneErrors';

export const AxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        switch (error.response?.status) {
            case 400:
                throw new InvalidRequestError(errorMessage);
            case 403:
                throw new ForbiddenRequestError(errorMessage);
            case 412:
                throw new PreconditionFailedError(errorMessage);
            case 429:
                throw new TooManyRequestsError(errorMessage);
            case 500:
                throw new ServerError(errorMessage);
            case 501:
                throw new NotImplementedError(errorMessage);
            default:
                throw new UnhandledError(`Unexpected error: ${error.response?.status} - ${errorMessage}`);
        }
    } else {
        throw new UnhandledError(`Unexpected error: ${error}`);
    }
};