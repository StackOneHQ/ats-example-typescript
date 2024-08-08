import { getSessionToken } from '../http/stackOneSession';

export const connectStackOneSession = async () => {
  return await getSessionToken();
};