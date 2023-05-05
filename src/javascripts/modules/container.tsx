import React, { useEffect, useState } from "react";
import { type IUser, UsersTable } from "./users_table";
import { GetEndUsers } from "../lib/get_end_users";
import { MailInput } from "./mail_input";

export const Container: React.FC<{ client: any }> = ({ client }) => {
  const [users, setUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);
  const [mailText, setMailText] = useState("");
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
  const handleInputChange = (text: string) => {
    setMailText(text);
  };

  return (
    <div className="container">
      <div className="table-container">
        <UsersTable
          users={users}
          onSelectedUsersChange={handleSelectedUsersChange}
        />
      </div>
      <div className="textarea-container">
        <MailInput onInputChange={handleInputChange} />
      </div>
    </div>
  );
};
