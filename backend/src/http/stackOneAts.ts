import axios from "axios";
import config from '../config';
import { InvalidRequestError, ForbiddenRequestError, PreconditionFailedError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';

export const getJobs = async (accountId: string, next: string) => {

    let url: string = config.STACKONE_ATS_URL + "/jobs?page_size=25";

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
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
    }
}

export const getApplications = async (accountId: string, next: string) => {

    let url: string = config.STACKONE_ATS_URL + "/applications?page_size=25";

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
    }
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
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
    }
}