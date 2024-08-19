import express from 'express';
import { Request, Response } from 'express';
import { connectStackOneSession } from '../service/sessionTokenService';
import { handleErrorResponse } from './routesErrorHandler';

const router = express.Router();

router.post('/connect-session', async (req: Request, res: Response) => {
    try {
        const sessionToken = await connectStackOneSession();
        res.status(200).send(sessionToken);
    } catch (error: unknown) {
        handleErrorResponse(error, res);
    }
});

export default router;