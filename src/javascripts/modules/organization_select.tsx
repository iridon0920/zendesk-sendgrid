import React, { useState } from "react";
import { Field, Label, Select } from "@zendeskgarden/react-forms";
import { Row, Col } from "@zendeskgarden/react-grid";

export interface IOrganization {
  id: string;
  name: string;
}

interface OrganizationSelectProps {
  organizations: IOrganization[];
  onSelectedOrganizationIdChange: (selectedOrganizationId: string) => void;
  disabled?: boolean;
}

export const OrganizationSelect: React.FC<OrganizationSelectProps> = ({
  organizations,
  onSelectedOrganizationIdChange,
}) => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");

  const onSelect = (organizationId: string) => {
    setSelectedOrganizationId(organizationId);
    onSelectedOrganizationIdChange(organizationId);
  };

  return (
    <Row justifyContent="center">
      <Col sm={5}>
        <Field>
          <Label>組織</Label>
          <Select
            value={selectedOrganizationId}
            onChange={(event) => {
              onSelect(event.target.value);
            }}
          >
            <option></option>
            {organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))}
          </Select>
        </Field>
      </Col>
    </Row>
  );
};
