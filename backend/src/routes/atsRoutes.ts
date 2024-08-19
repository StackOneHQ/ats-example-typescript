import express from 'express';
import { listAllApplications, listAllJobs } from '../service/atsService';
import { Request, Response } from 'express';
import { handleErrorResponse } from './routesErrorHandler';

const router = express.Router();

router.get('/jobs', async (req: Request, res: Response) => {
    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const jobs = await listAllJobs(accountId, next);
        res.status(200).send(jobs);
    } catch (error: unknown) {
        handleErrorResponse(error, res); 
    }
});

router.get('/applications', async (req: Request, res: Response) => {
    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const applications = await listAllApplications(accountId, next);
        res.status(200).send(applications);
    } catch (error: unknown) {
        handleErrorResponse(error, res); 
    }
});

export default router;
