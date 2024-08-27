import { Request, Response, NextFunction } from 'express';
import config from '../config';
import axios from 'axios';
import { AxiosError } from '../http/errorHandler';

export const getAccountId = async (provider: string, originOwnerId: string) => {
    const baseUrl = `${config.STACKONE_BASE_URL}/accounts`;
    const queryParams = new URLSearchParams({
        page_size: '25',
        provider: provider,
        origin_owner_id: originOwnerId,
    }).toString();

    const url = `${baseUrl}?${queryParams}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });

        return response.data[0].id;
    } catch (error) {
        AxiosError(error);
    }
}

export const fetchAccountIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const provider = req.headers['x-provider'] as string;
    const originOwnerId = req.headers['x-origin-owner-id'] as string;

    try {
        const accountId = await getAccountId(provider, originOwnerId);

        if (!accountId) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.locals.accountId = accountId;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching accountId', error });
    }
};