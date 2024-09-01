import { listAccounts } from './listAccounts';
import { getAtsApiUrl, handleResponse, errorHandler } from './apiUtils';
import { JobPosting } from '../components/ListCandidateJobs';

export const fetchAccountIdentifiers = async (): Promise<{ provider: string; origin_owner_id: string }[]> => {
    try {
        const accountsData = await listAccounts();
        return accountsData;
    } catch (error) {
        errorHandler(error);
        return [];
    }
};

export const fetchJobsForAllAccounts = async (): Promise<JobPosting[]> => {
    try {
        const accountIdentifiers = await fetchAccountIdentifiers();
        const apiUrl = getAtsApiUrl();

        const jobPostingsPromises = accountIdentifiers.map(async ({ provider, origin_owner_id }) => {
            const response = await fetch(`${apiUrl}/job-postings`, {
                method: 'GET',
                headers: {
                    'x-provider': provider,
                    'x-origin-owner-id': origin_owner_id,
                },
            });
            const data = await handleResponse(response);

            return (data.data || []).map((job: JobPosting) => ({
                ...job,
                provider,
                origin_owner_id,
            }));
        });

        const jobPostingsData = await Promise.all(jobPostingsPromises);
        return jobPostingsData.flat();
    } catch (error) {
        errorHandler(error);
        return [];
    }
};