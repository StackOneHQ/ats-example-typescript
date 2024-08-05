import React from "react";
import aeroDown from "../resources/Icons/arrowdown.svg";

interface SidebarProps {
  showManageATS: boolean;
  setShowManageATS: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonSidebar: React.FC<SidebarProps> = ({
  showManageATS,
  setShowManageATS,
}) => {
  return (
    <div className="rounded-sm text-gray-900 w-1/7 p-4 flex flex-col items-center mr-20px">
      <img
        src="logo.svg"
        alt="Logo"
        className="mb-4 h-16 "
        style={{ width: "9rem" }}
      />

      <div className="flex flex-col items-center space-y-4">
        <button
          className={`px-7 py-2 rounded ${
            showManageATS
              ? "bg-[#05C168] text-white"
              : "bg-[#E3FFF2] text-[#05C168]"
          } hover:bg-[#05C168] hover:text-white font-semibold transition-all duration-300 flex items-center space-x-2`}
          onClick={() => setShowManageATS(true)}
        >
          <img
            src={aeroDown}
            alt="Show less"
            className="icon-size rotate1-90"
          />
          <span>Manage Jobs</span>
        </button>
      </div>
    </div>
  );
};

export default CommonSidebar;
