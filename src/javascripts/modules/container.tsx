import React, { useEffect, useState } from "react";
import { type IUser, UsersTable } from "./users_table";
import { GetEndUsers } from "../lib/get_end_users";

export const Container: React.FC<{ client: any }> = ({ client }) => {
  const [users, setUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);
  useEffect(() => {
    const fetchEndUsers = async () => {
      const users = await GetEndUsers(client);
      console.log(users);
      setUsers(users);
    };
    fetchEndUsers().catch(console.error);
  }, [client]);
  const handleSelectedUsersChange = (users: IUser[]) => {
    setSelectedUsers(users);
  };

  return (
    <div>
      <UsersTable
        users={users}
        onSelectedUsersChange={handleSelectedUsersChange}
      />
    </div>
  );
};
