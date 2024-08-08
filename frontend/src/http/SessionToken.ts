export const retrieveConnectSessionToken = async () => {

  try {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      throw new Error('API base URL is not defined in environment variables');
    }

    const connectSessionResponse = await fetch(`${apiUrl}/stackone/connect-session`, {
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
