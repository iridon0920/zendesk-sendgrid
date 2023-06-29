import React, { useEffect, useState } from "react";
import { type IUser, UsersTable } from "./users_table";
import { GetEndUsers } from "../lib/get_end_users";
import { MailInput } from "./mail_input";
import { Button } from "@zendeskgarden/react-buttons";
import { sendEmailBySendGrid } from "../lib/sendgrid";
import { Loader } from "./loader";
import { Notifications } from "./notifications";

export const Container: React.FC<{ client: any }> = ({ client }) => {
  const [users, setUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);
  const [mailText, setMailText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    const fetchEndUsers = async () => {
      const users = await GetEndUsers(client);
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
  const isSendUiDisabled = isSending || selectedUsers.length === 0;

  return (
    <div className="container">
      <Notifications text={notificationText} />
      <div className="table-container">
        <UsersTable
          users={users}
          onSelectedUsersChange={handleSelectedUsersChange}
          disabled={isSending}
        />
      </div>
      <div className="textarea-container">
        {isSending && (
          <Loader
            style={{ position: "absolute", top: "7%", left: "50%", zIndex: 1 }}
          />
        )}
        <MailInput
          onInputChange={handleInputChange}
          disabled={isSendUiDisabled}
        />
        <Button
          onClick={() => {
            const sendEmail = async () => {
              setIsSending(true);
              await sendEmailBySendGrid(
                client,
                selectedUsers.map((user) => user.email),
                mailText
              );
              setIsSending(false);
              setNotificationText("メールを送信しました。");
            };
            sendEmail().catch((error) => {
              console.error("Failed to send email:", error);
            });
          }}
          disabled={isSendUiDisabled}
        >
          送信
        </Button>
      </div>
    </div>
  );
};
