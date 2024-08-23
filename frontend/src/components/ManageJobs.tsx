import React, { useState, useEffect } from "react";
import mail from "../resources/Icons/mail.svg";
import notification from "../resources/Icons/notification.svg";
import user from "../resources/Icons/user.svg";
import LinkAccountButton from "./LinkAccountButton";
import ListJobsPostingsButton from "./ListJobsPostingsButton";
import ListApplicationsButton from "./ListApplicationsButton";
import Contact from "./Contact";
import { listAccounts } from "../http/listAccounts";

interface Account {
  id: string;
  provider: string;
}

const ManageATSContent: React.FC = () => {
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [selectedAccountName, setSelectedAccountName] = useState<string>(
    "No account available"
  );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const manageATSClick = () => {
    setShowLinkAccount(!showLinkAccount);
  };

  const fetchAccounts = async () => {
    try {
      const accountsData = await listAccounts();
      if (Array.isArray(accountsData)) {
        setAccounts(accountsData);

        if (accountsData.length > 0) {
          setSelectedAccountId(accountsData[0].id);
          setSelectedAccountName(accountsData[0].provider);
        } else {
          setSelectedAccountId(null);
          setSelectedAccountName("No accounts available");
        }
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const accountClick = (id: string, name: string) => {
    setSelectedAccountId(id);
    setSelectedAccountName(name);
    setShowDropdown(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div
      className="p-6 shadow-lg bg-white relative"
      style={{
        borderTopLeftRadius: "2.5rem",
        boxShadow:
          "0 -4px 8px -1px rgba(0, 0, 0, 0.1), 0 -2px 1px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
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
      <div className="flex justify-between mb-6 mt-5">
        <button
          className="bg-[#FFFFFF] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
          onClick={manageATSClick}
        >
          Manage Jobs Portal
        </button>
        <button
          className="bg-[#E3FFF2] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
          onClick={toggleDropdown}
        >
          {selectedAccountName}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-[#05C168] rounded shadow-lg z-20">
            <ul>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <li
                    key={account.id}
                    className="px-4 py-2 hover:bg-[#E3FFF2] cursor-pointer text-[#05C168]"
                    onClick={() => accountClick(account.id, account.provider)}
                  >
                    {account.provider}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  No accounts available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {showLinkAccount && (
        <LinkAccountButton
        setShowLinkAccount={setShowLinkAccount} 
      />
      )}
      {selectedAccountId && (
        <ListJobsPostingsButton accountId={selectedAccountId} />
      )}
      {selectedAccountId && (
        <ListApplicationsButton accountId={selectedAccountId} />
      )}
      <Contact />
    </div>
  );
};

export default ManageATSContent;