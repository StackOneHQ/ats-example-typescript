import { listAccounts } from './listAccounts';
import { getAtsApiUrl, handleResponse, errorHandler } from './apiUtils'; 
import { JobPosting } from '../components/ListCandidateJobs';

export const fetchAccountIds = async (): Promise<string[]> => {
  try {
    const accountsData = await listAccounts();
    return accountsData.map((account: { id: string }) => account.id);
  } catch (error) {
    errorHandler(error); 
    return [];
  }
};

export const fetchJobsForAllAccounts = async (): Promise<JobPosting[]> => {
  try {
    const accountIds = await fetchAccountIds();
    const apiUrl = getAtsApiUrl();

    const jobPostingsPromises = accountIds.map(async (id) => {
      const response = await fetch(`${apiUrl}/job-postings`, {
        method: 'GET',
        headers: {
          'x-account-id': id,
        },
      });
      const data = await handleResponse(response); 

      return (data.data || []).map((job: JobPosting) => ({
        ...job,
        accountId: id,
      }));
    });

    const jobPostingsData = await Promise.all(jobPostingsPromises);
    return jobPostingsData.flat();
  } catch (error) {
    errorHandler(error); 
    return [];
  }
};