import React from "react";
import { Field, Label, Textarea } from "@zendeskgarden/react-forms";

export const MailInput: React.FC<{
  onInputChange: (text: string) => void;
  disabled?: boolean;
}> = ({ onInputChange, disabled }) => {
  return (
    <Field>
      <Label>メール本文</Label>
      <Textarea
        isResizable
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        disabled={disabled}
      />
    </Field>
  );
};
