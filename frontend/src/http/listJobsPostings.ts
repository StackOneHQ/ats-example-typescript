import { getAtsApiUrl, errorHandler, handleResponse } from "./apiUtils";

export const listJobsPostings = async (provider: string, originOwnerId: string) => {
    try {
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/jobs`, {
            method: 'GET',
            headers: {
                'x-provider': provider,
                'x-origin-owner-id': originOwnerId,
                accept: 'application/json',
            },
        });
        const data = await handleResponse(response);
        return data;
    } catch (error) {
        errorHandler(error);
    }
};