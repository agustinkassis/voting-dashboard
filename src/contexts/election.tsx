import React, { useState } from "react";
import type IBallot from "~/types/ballot";
import type IElection from "~/types/election";

interface IElectionContext {
  election?: IElection;
  ballots: IBallot[];
  setElection: React.Dispatch<React.SetStateAction<IElection | undefined>>;
}

const ElectionContext = React.createContext<IElectionContext>({
  ballots: [],
  setElection: (_e: IElection) => undefined,
});

interface ElectionProviderProps {
  children: React.ReactNode;
}

export const ElectionProvider = ({ children }: ElectionProviderProps) => {
  const [election, setElection] = useState<IElection | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ballots, setBallots] = useState<IBallot[]>([]);

  // const addBallot = (ballot: IBallot) => {
  //   setBallots((_ballots) => {
  //     console.info("Current ballots: ");
  //     console.info(_ballots);
  //     return [...ballots, ballot]
  //   });
  // };

  return (
    <ElectionContext.Provider
      value={{
        election,
        ballots,
        setElection,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => React.useContext(ElectionContext);
