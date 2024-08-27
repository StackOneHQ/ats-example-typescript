import express from 'express';
import { createApplication, listAllApplications, listAllJobs, listPostedJobs } from '../service/atsService';
import { Request, Response } from 'express';
import { handleErrorResponse } from './routesErrorHandler';
import { fetchAccountIdMiddleware } from '../middleware/accountMiddleware';

const router = express.Router();

router.get('/jobs', fetchAccountIdMiddleware, async (req: Request, res: Response) => {
  const { query } = req;
  const next: string = query.next as string;
  const accountId: string = res.locals.accountId;

  try {
    const jobs = await listAllJobs(accountId, next);
    res.status(200).send(jobs);
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
});

router.get('/applications', fetchAccountIdMiddleware, async (req: Request, res: Response) => {
  const { query } = req;
  const next: string = query.next as string;
  const accountId: string = res.locals.accountId;

  try {
    const applications = await listAllApplications(accountId, next);
    res.status(200).send(applications);
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
});

router.get('/job-postings', fetchAccountIdMiddleware, async (req: Request, res: Response) => {
  const { query } = req;
  const next: string = query.next as string;
  const accountId: string = res.locals.accountId;

  try {
    const postedJobs = await listPostedJobs(accountId, next);
    res.status(200).send(postedJobs);
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
});

router.post('/applications', fetchAccountIdMiddleware, async (req: Request, res: Response) => {
  const { body } = req;
  const accountId: string = res.locals.accountId;
  const applicationData = body;

  try {
    const newApplication = await createApplication(accountId, applicationData);
    res.status(201).send(newApplication);
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
});

export default router;
