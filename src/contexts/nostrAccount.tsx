import React, { useEffect } from "react";
import useWebLN from "~/hooks/useWebLN";
import type NostrExtensionProvider from "~/types/nostr";

const timeoutCheck = parseInt(
  process.env.NEXT_PUBLIC_NOSTR_BOOT_TIMEOUT_CHECK || "2000"
);
// Global window.nostr
declare global {
  interface Window {
    nostr: NostrExtensionProvider;
  }
}

// NostrAccountContext props
export interface NostrAccountContextProps {
  pubKey?: string;
  nostr?: NostrExtensionProvider;
  isLoading: boolean;
  login: () => Promise<string | null>;
}

// NostrAccountProvider props
export interface NostrAccountProviderProps {
  children: React.ReactNode;
}

// NostrAccountContext component
export const NostrAccountContext =
  React.createContext<NostrAccountContextProps>({
    isLoading: false,
    login: () => Promise.resolve(null),
  });

// NostrAccountProvider component
export const NostrAccountProvider = ({
  children,
}: NostrAccountProviderProps) => {
  const { connect } = useWebLN();

  const [pubKey, setPubKey] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [nostr, setNostr] = React.useState<NostrExtensionProvider | undefined>(
    undefined
  );

  // console.info("process.env: ");
  // console.dir(process.env);
  useEffect(() => {
    if (!nostr) {
      setTimeout(() => {
        if (window.nostr) {
          setNostr(window.nostr);
        }
        setIsLoading(false);
      }, timeoutCheck);
      return;
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login with Alby extension
  const login = async (): Promise<string | null> => {
    if (!nostr) {
      return null;
    }

    setIsLoading(true);

    try {
      // Enable webln
      await connect();

      // Enable nostr
      await nostr.enable();

      // Get public key
      const _pubKey = await nostr.getPublicKey();

      // Set state variables
      setPubKey(_pubKey);

      // Returns user public key
      return _pubKey;
    } catch (e: unknown) {
      alert("Please approve Alby request");
      console.error("Error while login: ", (e as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Alby extension
  const loadNostr = () => {
    setNostr(window.nostr);
  };

  // Load nostr on mount
  useEffect(() => {
    loadNostr();
  }, []);

  return (
    <NostrAccountContext.Provider
      value={{
        pubKey: pubKey,
        nostr,
        isLoading,
        login,
      }}
    >
      {children}
    </NostrAccountContext.Provider>
  );
};
