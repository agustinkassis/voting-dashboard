import Button from "~/components/button";
interface QuestionProps {
  key: string;
  label: string;
  onChange: (event: { key: string; value: number }) => void;
}

const Question = ({ key, label, onChange }: QuestionProps) => {
  return (
    <div>
      <div>
        <h1>{label}</h1>
      </div>
      <div>1 ,2 ,3 ,4 ,5 ,6 ,7, 8, 9, 10</div>
      <Button
        onClick={() =>
          onChange({
            key,
            value: 1,
          })
        }
      >
        test
      </Button>
    </div>
  );
};

export default Question;
