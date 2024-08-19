import { getAtsApiUrl, errorHandler, handleResponse } from './apiUtils';

export const listAccounts = async () => {
  try {
    const apiUrl = getAtsApiUrl();
    const response = await fetch(`${apiUrl}/accounts`, {
      method: 'GET',
    });

    return await handleResponse(response);
  } catch (error) {
    errorHandler(error);
  }
};