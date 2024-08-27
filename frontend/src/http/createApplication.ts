import { getAtsApiUrl, handleResponse, errorHandler } from './apiUtils';

export const createApplication = async (provider: string, originOwnerId: string, applicationData: unknown) => {
    try {
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-provider': provider,
                'x-origin-owner-id': originOwnerId,
                accept: 'application/json',
            },
            body: JSON.stringify(applicationData),
        });

        const result = await handleResponse(response);
        return result.id;
    } catch (error) {
        errorHandler(error);
    }
};