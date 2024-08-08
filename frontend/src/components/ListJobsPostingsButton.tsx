import React, { useState, useEffect } from "react";
import { listJobsPostings } from "../http/listJobsPostings";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../resources/Content.css";
import aeroDown from "../resources/Icons/arrowdown.svg";


interface JobStatus {
  value: string;
  source_value: string;
}

interface HiringTeamMember {
  user_id: string;
  first_name: string;
  last_name: string;
  role: string;
  remote_user_id: string;
}

interface Job {
  id: string;
  title: string;
  job_status: JobStatus;
  department_ids: string[];
  location_ids: string[];
  hiring_team: HiringTeamMember[];
  confidential: string;
  created_at: string;
  updated_at: string;
  remote_id: string;
}

const ListJobsPostingsButton: React.FC<{ accountId: string }> = ({
  accountId,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<number>(2);

  const handleFetchJobs = async () => {
    try {
      const jobsData = await listJobsPostings(accountId);
      if (Array.isArray(jobsData.data)) {
        setJobs(jobsData.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleShowMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 2, jobs.length));
  };

  const handleShowLess = () => {
    setVisibleJobs((prev) => Math.max(prev - 2, 2));
  };

  useEffect(() => {
    handleFetchJobs();
  }, [accountId]);

  return (
    <div className="relative z-1">
      {jobs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px] bg-[#E3FFF2] border-2 border-[#05C168] rounded-lg p-4 text-[#A8D5BA]">
          <h2 className="text-xl font-bold">Jobs data is not available</h2>
        </div>
      ) : (
        <TransitionGroup className="sliding-content">
          {jobs.slice(0, visibleJobs).map((job, index) => (
            <CSSTransition key={job.id} timeout={300} classNames="slide">
              <div id={`job-card-${index}`} className="job-card">
                <h2 className="job-title">{job.title}</h2>
                <p>
                  <strong>Job ID:</strong>{" "}
                  <span
                    id={`truncated-text-${index}`}
                    className="truncated-text"
                  >
                    {job.remote_id}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong> {job.job_status.value}
                </p>
                <div
                  id={`job-badge-container-${index}`}
                  className="job-badge-container"
                >
                  <p>Created at</p>
                  <span className="job-badge">
                    {new Date(job.created_at).toLocaleString()}
                  </span>
                  <p>Updated at</p>
                  <span className="job-badge">
                    {new Date(job.updated_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
      <div className="flex justify-between mt-4">
        {jobs.length > 0 && visibleJobs < jobs.length && (
          <button className="show-more-button" onClick={handleShowMore}>
            <img src={aeroDown} alt="Show more" className="icon-size" />
          </button>
        )}
        {jobs.length > 0 && visibleJobs > 2 && (
          <button className="show-more-button" onClick={handleShowLess}>
            <img src={aeroDown} alt="Show less" className="icon-size rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListJobsPostingsButton;
