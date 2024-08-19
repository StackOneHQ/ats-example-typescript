import { getSessionApiUrl } from "./apiUtils";

export const retrieveConnectSessionToken = async () => {
  try {
    const apiUrl = getSessionApiUrl();

    const connectSessionResponse = await fetch(`${apiUrl}/connect-session`, {
      method: 'POST',
    });

    if (!connectSessionResponse.ok) {
      throw new Error(`HTTP error! status: ${connectSessionResponse.status}`);
    }
  
    const response = await connectSessionResponse.json();

    return { token: response.token };
  } catch (error) {
    console.error('Error fetching connect session token:', error);
    throw error;
  }
};