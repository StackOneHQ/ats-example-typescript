import React from "react";
import { Routes, Route } from "react-router-dom";
import ManageATSContent from "./ManageJobs";
import CandidateView from "./CandidateView";

const MainPage: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-1/7"></div>
      <div className="flex-1 ml-1/7 bg-white">
        <Routes>
          <Route path="/" element={<ManageATSContent />} />
          <Route
            path="apply-jobs"
            element={
              <div
                className="p-6 rounded-lg shadow-md"
                style={{
                  borderTopLeftRadius: "2.5rem",
                  boxShadow:
                    "0 -4px 8px -1px rgba(0, 0, 0, 0.1), 0 -2px 1px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <CandidateView />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;