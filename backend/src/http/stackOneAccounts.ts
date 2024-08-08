import axios from "axios";
import config from "../config";
import { InvalidRequestError, ForbiddenRequestError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';

export const getAllAccounts = async () => {

    const url: string = config.STACKONE_BASE_URL + "/accounts";
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            switch (error.response?.status) {
                case 400:
                    throw new InvalidRequestError(errorMessage);
                case 403:
                    throw new ForbiddenRequestError(errorMessage);
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
    }
}