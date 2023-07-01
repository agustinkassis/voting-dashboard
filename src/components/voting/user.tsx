import type { User as IUser } from "../../types/user";
interface UserProps {
  selected?: boolean;
  data: IUser;
}

const User = ({ selected = false, data }: UserProps) => {
  const classes = [];

  if (selected) {
    classes.push("bg-green-500");
  }

  return (
    <div
      className={`flex flex-col justify-center p-7 hover:bg-gray-600 ${
        selected ? "bg-gray-700" : ""
      }`}
    >
      <a
        href={`https://iris.to/${data.pub}`}
        className="flex items-center justify-center"
      >
        <img
          alt={data.name}
          className="rounded-full"
          width={50}
          height={50}
          src={data.avatar}
        />
      </a>
      <div>
        <h1>{data.name}</h1>
      </div>
      <div>{data.handle}</div>
    </div>
  );
};

export default User;
