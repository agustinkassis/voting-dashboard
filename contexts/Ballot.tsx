import React, { useState } from "react";
import { IResponseBundle, IResponseSet } from "~/types/response";

interface IBallotContext {
  election?: string;
  setElection: React.Dispatch<React.SetStateAction<string | undefined>>;
  responses?: IResponseBundle;
  setResponses: React.Dispatch<
    React.SetStateAction<IResponseBundle | undefined>
  >;
  saveResponses: (userPub: string, _responses: IResponseSet) => void;
}

const BallotContext = React.createContext<IBallotContext>({
  setElection: (_s: string) => {},
  setResponses: (_r: IResponseBundle) => {},
  saveResponses: (userPub: string, _responses: IResponseSet) => {},
});

interface BallotProviderProps {
  children: React.ReactNode;
}

export const BallotProvider = ({ children }: BallotProviderProps) => {
  const [election, setElection] = useState<string | undefined>();
  const [responses, setResponses] = useState<IResponseBundle | undefined>();

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
