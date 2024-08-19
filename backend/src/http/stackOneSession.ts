import axios from "axios";
import config from "../config";
import { AxiosError } from "./errorHandler";

export const getSessionToken = async () => {

    const url: string = config.STACKONE_BASE_URL + "/connect_sessions";
    try {
        const origin_owner_id = config.ORIGIN_OWNER_ID;
        const origin_owner_name = config.ORIGIN_OWNER_NAME;
        const response = await axios.post(url, {
            expires_in: 1800,
            multiple: false,
            origin_owner_id: origin_owner_id,
            origin_owner_name: origin_owner_name
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        AxiosError(error);
    }
}