import type { User as IUser } from "~/types/user";
import User from "./user";

interface SidebarUsersProps {
  users: IUser[];
  currentUser: IUser;
}

const SidebarUsers = ({ users, currentUser }: SidebarUsersProps) => {
  return (
    <div className="flex flex-none flex-col gap-5 border-2 border-solid border-white">
      {users.map((user, k) => (
        <User data={user} key={k} selected={currentUser.pub === user.pub} />
      ))}
    </div>
  );
};

export default SidebarUsers;
