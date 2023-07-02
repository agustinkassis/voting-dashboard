import type { IQuestion } from "~/types/question";
import type { User } from "~/types/user";
import Question from "./question";
import Button from "~/components/button";
import { useEffect, useState } from "react";
import type { IResponse, IResponseSet } from "~/types/response";
import { useBallot } from "contexts/Ballot";

interface BallotProps {
  currentUser: User;
  questions: IQuestion[];
  initialResponses: IResponseSet;
  lastUser?: boolean;
  onNextUser: (responses: IResponseSet) => void;
}

const Ballot = ({
  currentUser,
  questions,
  initialResponses,
  lastUser = false,
  onNextUser,
}: BallotProps) => {
  const [responses, setResponses] = useState<IResponseSet>(initialResponses);

  const ballot = useBallot();
  const createNullResponses = (): IResponseSet => {
    return {
      honestidad: null,
      humildad: null,
      innovacion: null,
      libertad: null,
      merito: null,
      racionalidad: null,
      sinergia: null,
    };
  };
  const clearResponses = () => {
    setResponses(createNullResponses());
  };

  const handleResponse = (response: IResponse) => {
    setResponses((responses) => ({
      ...responses,
      [response.id]: response.value,
    }));
  };

  const save = () => {
    // save
    onNextUser(responses);
  };

  useEffect(() => {
    clearResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!currentUser) {
    return <div>No user</div>;
  }

  if (!ballot) {
    return <div>No ballot</div>;
  }
  const prevResponses = ballot.responses[currentUser.pub] || {};

  console.dir(prevResponses);
  return (
    <div className="flex-1 border-2 border-solid border-white">
      {currentUser && currentUser !== null && (
        <>
          <h2 className="mb-6 border-b-2 border-white p-4 text-4xl">
            Votá a {currentUser.name}
          </h2>
          <div>
            <div className="flex flex-col gap-2">
              {questions &&
                questions.map((question) => {
                  return (
                    <Question
                      id={question.id}
                      key={`${currentUser.pub}_${question.id}`}
                      initialValue={
                        prevResponses[question.id] !== undefined
                          ? (prevResponses[question.id] as number | null)
                          : 50
                      }
                      label={question.label}
                      onChange={handleResponse}
                    />
                  );
                })}
            </div>
            <div className="">
              <Button className="block w-full" onClick={() => save()}>
                {lastUser ? (
                  <span>Votar finalmente</span>
                ) : (
                  <span>Siguiente</span>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ballot;
