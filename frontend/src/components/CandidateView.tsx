import React from "react";
import Contact from "./Contact";
import ListCandidateJobsButton from "./ListCandidateJobs";
import mail from "../resources/Icons/mail.svg";
import notification from "../resources/Icons/notification.svg";
import user from "../resources/Icons/user.svg";

const CandidateView: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <img src={user} alt="User Icon" className="icon-size" />
          </div>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Manage Jobs
          </h1>
        </div>
        <div className="flex space-x-4">
          <img
            src={notification}
            alt="Notification Icon"
            className="icon-size"
          />
          <img src={mail} alt="Mail Icon" className="icon-size" />
        </div>
      </div>
      <hr />
      <ListCandidateJobsButton />

      <Contact />
    </div>
  );
};

export default CandidateView;