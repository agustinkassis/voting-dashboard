import React, { useState } from "react";
import type { IResponseBundle, IResponseSet } from "~/types/response";

interface IBallotContext {
  election?: string;
  setElection: React.Dispatch<React.SetStateAction<string | undefined>>;
  responses?: IResponseBundle;
  setResponses: React.Dispatch<React.SetStateAction<IResponseBundle>>;
  saveResponses: (userPub: string, _responses: IResponseSet) => void;
}

const BallotContext = React.createContext<IBallotContext>({
  setElection: (_s: string) => undefined,
  setResponses: (_r: IResponseBundle) => undefined,
  saveResponses: (_userPub: string, _responses: IResponseSet) => undefined,
});

interface BallotProviderProps {
  children: React.ReactNode;
}

export const BallotProvider = ({ children }: BallotProviderProps) => {
  const [election, setElection] = useState<string | undefined>();
  const [responses, setResponses] = useState<IResponseBundle>({});

  const saveResponses = (userPub: string, _responses: IResponseSet) => {
    setResponses((responses) => {
      console.info("GIGANTEEEEEE: ");
      console.info(responses);
      return {
        ...responses,
        [userPub]: _responses,
      };
    });
  };

  return (
    <BallotContext.Provider
      value={{
        election,
        setElection,
        responses,
        setResponses,
        saveResponses,
      }}
    >
      {children}
    </BallotContext.Provider>
  );
};

export const useBallot = () => React.useContext(BallotContext);
