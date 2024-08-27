import { getAtsApiUrl, errorHandler, handleResponse } from './apiUtils';

export const listAccounts = async () => {
    try {
        const apiUrl = getAtsApiUrl();
        const response = await fetch(`${apiUrl}/accounts`, {
            method: 'GET',
        });

        const accountsData = await handleResponse(response);
        return accountsData;
    } catch (error) {

        errorHandler(error);
        return [];
    }
};