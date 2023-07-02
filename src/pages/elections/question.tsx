import Range from "~/components/voting/range";
import { type IResponse } from "~/types/response";

interface QuestionProps {
  id: string;
  label: string;
  initialValue?: number;
  onChange: (response: IResponse) => void;
}

const Question = ({
  id,
  label,
  initialValue = 50,
  onChange,
}: QuestionProps) => {
  return (
    <div className="flex flex-col gap-1 border-b-2 border-white p-3 text-xl">
      <div>
        <h1>{label}</h1>
      </div>
      <div>
        <Range
          initialValue={initialValue}
          onChange={(value) => {
            onChange({ id, value });
          }}
        />
      </div>
    </div>
  );
};

export default Question;
