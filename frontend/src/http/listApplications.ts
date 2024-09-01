import { getAtsApiUrl, errorHandler, handleResponse } from "./apiUtils";

export const listApplications = async (provider: string, originOwnerId: string) => {
    try {
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/applications`, {
            method: 'GET',
            headers: {
                'x-provider': provider,
                'x-origin-owner-id': originOwnerId,
            },
        });

        return await handleResponse(response);
    } catch (error) {
        errorHandler(error);
    }
};