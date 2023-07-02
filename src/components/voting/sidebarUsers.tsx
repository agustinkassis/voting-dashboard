import type { User as IUser } from "~/types/user";
import User from "./user";

interface SidebarUsersProps {
  users: IUser[];
  currentUser: IUser;
  setCurrentIndex?: (index: number) => void;
}

const SidebarUsers = ({
  users,
  currentUser,
  setCurrentIndex,
}: SidebarUsersProps) => {
  const selectUser = (k: number) => {
    console.info("selectUser");
    setCurrentIndex && setCurrentIndex(k);
  };

  return (
    <div className="flex flex-none flex-col gap-5 border-2 border-solid border-white">
      {users.map((user, k) => (
        <User
          data={user}
          key={k}
          selected={currentUser && currentUser.pub === user.pub}
          onClick={() => selectUser(k)}
        />
      ))}
    </div>
  );
};

export default SidebarUsers;
