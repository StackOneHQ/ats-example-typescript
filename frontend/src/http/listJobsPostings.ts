import { getAtsApiUrl, errorHandler, handleResponse } from "./apiUtils";

export const listJobsPostings = async (accountId: string) => {
  try {
    const apiUrl = getAtsApiUrl();
    const response = await fetch(`${apiUrl}/jobs`, {
      method: 'GET',
      headers: {
        'x-account-id': accountId
      }
    });

    return await handleResponse(response);
  } catch (error) {
    errorHandler(error);
  }
};