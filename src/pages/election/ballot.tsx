import type { IQuestion } from "~/types/question";
import type { User } from "~/types/user";
import Question from "./question";
import Button from "~/components/button";
import { useEffect, useState } from "react";
import type { IResponse, IResponseSet } from "~/types/response";

interface BallotProps {
  currentUser: User;
  questions: IQuestion[];
  onNextUser: (responses: IResponseSet) => void;
}

const Ballot = ({ currentUser, questions, onNextUser }: BallotProps) => {
  const [responses, setResponses] = useState<IResponseSet>({
    honestidad: null,
    humildad: null,
    innovacion: null,
    libertad: null,
    merito: null,
    racionalidad: null,
    sinergia: null,
  });

  const clearResponses = () => {
    // setResponses(createNullResponses());
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

  return (
    <div className="flex-1 border-2 border-solid border-white">
      <h2 className="mb-6 border-b-2 border-white p-4 text-4xl">
        {/* Votá a {currentUser.name} */}
      </h2>
      <div>
        <div className="flex flex-col gap-2">
          {questions &&
            questions.map((question, k) => (
              <Question
                id={question.id}
                key={k}
                label={question.label}
                onChange={handleResponse}
              />
            ))}
        </div>
        <div className="">
          <Button className="block w-full" onClick={() => save()}>
            Votar finalmente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ballot;
