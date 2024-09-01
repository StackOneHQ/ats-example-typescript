import React, { useCallback, useEffect } from "react";
import { useStackOneHub } from "@stackone/react-hub";
import { retrieveConnectSessionToken } from "../http/SessionToken";

interface LinkAccountButtonProps {

  setShowLinkAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkAccountButton: React.FC<LinkAccountButtonProps> = ({ setShowLinkAccount }) => {
  const { startConnect } = useStackOneHub();

  const startFlow = useCallback(async () => {
    try {
      const sessionToken = await retrieveConnectSessionToken();
      startConnect({
        sessionToken: sessionToken.token,
        onClose: () => {
          setShowLinkAccount(false);
        },
        onCancel: () => {
          setShowLinkAccount(false);
        },
      });
    } catch (error) {
      console.error("Error starting connect flow:", error);
    }
  }, [startConnect, setShowLinkAccount]);

  useEffect(() => {
    startFlow();
  }, [startFlow]);
  return null;
};

export default LinkAccountButton;