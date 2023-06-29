import React, { useEffect } from "react";
import {
  Notification,
  Close,
  ToastProvider,
  useToast,
} from "@zendeskgarden/react-notifications";

const Toast: React.FC<{ text: string }> = ({ text }) => {
  const { addToast } = useToast();
  useEffect(() => {
    addToast(
      ({ close }) => (
        <Notification type="info" style={{ maxWidth: 450 }}>
          {text}
          <Close aria-label="Close" onClick={close} />
        </Notification>
      ),
      { placement: "bottom-end" }
    );
  }, [text]);
  return <></>;
};
export const Notifications: React.FC<{ text: string }> = ({ text }) => {
  return (
    <ToastProvider zIndex={1}>
      <Toast text={text} />
    </ToastProvider>
  );
};
