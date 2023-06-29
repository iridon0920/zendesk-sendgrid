import React, { useEffect, useState } from "react";
import { type IUser, UsersTable } from "./users_table";
import { GetEndUsers } from "../lib/get_end_users";
import { MailInput } from "./mail_input";
import { Button } from "@zendeskgarden/react-buttons";
import { sendEmailBySendGrid } from "../lib/sendgrid";
import { Loader } from "./loader";
import { Notifications } from "./notifications";
import { type IOrganization, OrganizationSelect } from "./organization_select";
import { GetOrganizations } from "../lib/get_organizations";

export const Container: React.FC<{ client: any }> = ({ client }) => {
  const [users, setUsers] = useState([] as IUser[]);
  const [organizations, setOrganizations] = useState([] as IOrganization[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [mailText, setMailText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    const fetchEndUsers = async () => {
      const users = await GetEndUsers(client, selectedOrganizationId);
      setUsers(users);
    };
    fetchEndUsers().catch(console.error);
    const fetchOrganizations = async () => {
      const organizations = await GetOrganizations(client);
      setOrganizations(organizations);
    };
    fetchOrganizations().catch(console.error);
  }, [client, selectedOrganizationId]);
  const handleSelectedUsersChange = (users: IUser[]) => {
    setSelectedUsers(users);
  };
  const handleSelectedOrganizationChange = (organizationId: string) => {
    setSelectedOrganizationId(organizationId);
  };
  const handleInputChange = (text: string) => {
    setMailText(text);
  };
  const isSendUiDisabled = isSending || selectedUsers.length === 0;

  return (
    <div className="container">
      <Notifications text={notificationText} />
      <div className="table-container">
        <OrganizationSelect
          organizations={organizations}
          onSelectedOrganizationIdChange={handleSelectedOrganizationChange}
        />
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
