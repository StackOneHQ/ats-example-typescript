import express from 'express';
import { Request, Response } from 'express';
import { listAllAccounts } from '../service/accountsService';
import { handleErrorResponse } from './routesErrorHandler';

const router = express.Router();

router.get('/accounts', async (req: Request, res: Response) => {
    try {
        const accounts = await listAllAccounts();
        res.status(200).send(accounts);
    } catch (error: unknown) {
        handleErrorResponse(error, res); 
    }
});

export default router;