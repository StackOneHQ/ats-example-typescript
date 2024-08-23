import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createApplication } from "../http/createApplication";
import parse from "html-react-parser";
import correctIcon from "../resources/Icons/Correct1.svg";

interface JobLocation {
  id: string;
  name: string;
}

interface JobStatus {
  value: string;
}

interface JobDetails {
  id: string;
  title: string;
  locations: JobLocation[];
  status: JobStatus;
  content: {
    html: string;
  };
  updated_at: string;
  created_at: string;
}

const ViewJob: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jobId: jobId ?? "",
    locationId: "",
    candidateId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    title: "",
    resume: null as File | null,
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const { jobDetails, accountId } = location.state as {
    jobDetails: JobDetails;
    accountId: string;
  };

  const backClick = () => {
    navigate(-1);
  };

  const applyClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!accountId) {
        throw new Error("Account ID is missing");
      }

      const applicationData = {
        candidate: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          country: formData.country,
          phone_number: formData.phone,
          title: formData.title,
        },
        job_id: formData.jobId,
      };

      await createApplication(accountId, applicationData);
      setMessage({
        text: "Application submitted successfully",
        type: "success",
      });
      console.log("Application submitted successfully");
      closeForm();
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage({
        text: "Error submitting application. Please try again later.",
        type: "error",
      });
      closeForm();
    }
  };

  return (
  <div className="p-6">
    <button
      onClick={backClick}
      className="btn-back"
    >
      Back
    </button>
    <h1 className="job-title2">
      Job Details for {jobDetails?.title || jobId}
    </h1>
    <div className="job-info">
      <p>
        <strong>Title:</strong> {jobDetails?.title || "N/A"}
      </p>
      <p>
        <strong>Job ID:</strong> {jobDetails?.id || jobId}
      </p>
      <p>
        <strong>Location:</strong>{" "}
        {jobDetails?.locations
          .map((location: JobLocation) => location.name)
          .join(", ") || "N/A"}
      </p>
      <div className="job-description">
        <strong>Description:</strong>
        <div className="content-intro">
          {jobDetails?.content.html ? parse(jobDetails.content.html) : "N/A"}
        </div>
      </div>
      <div className="mt-10px">
        <p>
          <strong>Updated At:</strong> {jobDetails?.updated_at || "N/A"}
        </p>
        <p>
          <strong>Created At:</strong> {jobDetails?.created_at || "N/A"}
        </p>
      </div>
      <button
        onClick={applyClick}
        className="bg-[#05C168] text-white border-2 border-[#05C168] px-4 py-2 rounded-md mt-4"
      >
        Apply
      </button>
    </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-card">
            <button onClick={closeForm} className="form-close-button">
              &times;
            </button>
            <h2 className="form-title">Application Form</h2>
            <form onSubmit={submit}>
              <div className="form-group">
                <label
                  htmlFor="jobId"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Job ID
                </label>
                <input
                  type="text"
                  id="jobId"
                  name="jobId"
                  value={formData.jobId}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={inputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-[#05C168]"
                >
                  Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={fileChange}
                  className="form-input"
                />
              </div>
              <button
                type="submit"
                className="bg-[#05C168] text-white border-2 border-[#05C168] px-4 py-2 rounded-md mt-4"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {message && (
        <div
          className={message.type === "error" ? "error-card" : "success-card"}
        >
          <button
            onClick={() => setMessage(null)}
            className="card-close-button2"
          >
            &times;
          </button>
          {message.type === "success" && (
            <img src={correctIcon} alt="Success" className="success-icon" />
          )}
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ViewJob;