import React, { useEffect, useState } from "react";
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@zendeskgarden/react-tables";
import { KEY_CODES } from "@zendeskgarden/container-utilities";
import { Field, Checkbox, Label } from "@zendeskgarden/react-forms";

export interface IUser {
  id: string;
  name: string;
  email: string;
}
interface IUserRow extends IUser {
  selected: boolean;
}

interface UsersTableProps {
  users: IUser[];
  onSelectedUsersChange: (selectedUsers: IUser[]) => void;
  disabled?: boolean;
}

const isSelectAllIndeterminate = (rows: IUserRow[]) => {
  const numSelectedRows = rows.reduce((accumulator, row) => {
    if (row.selected) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  return numSelectedRows > 0 && numSelectedRows < rows.length;
};

const isSelectAllChecked = (rows: IUserRow[]) =>
  rows.every((row) => row.selected);

const getSelectedUsers = (rows: IUserRow[]): IUser[] => {
  return rows
    .filter((row) => row.selected)
    .map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
    }));
};

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onSelectedUsersChange,
  disabled,
}) => {
  const [data, setData] = useState(
    users.map((user) => ({ ...user, selected: false }))
  );
  const [shiftEnabled, setShiftEnabled] = useState(false);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    setData(users.map((user) => ({ ...user, selected: false })));
  }, [users]);

  return (
    <Table style={{ minWidth: 500 }}>
      <Head>
        <HeaderRow>
          <HeaderCell isMinimum>
            <Field>
              <Checkbox
                indeterminate={isSelectAllIndeterminate(data)}
                checked={isSelectAllChecked(data)}
                disabled={disabled}
                onChange={(e) => {
                  const updatedRows = data.map((row) => ({
                    ...row,
                    selected: e.target.checked,
                  }));

                  setData(updatedRows);
                  const selectedUsers = getSelectedUsers(updatedRows);
                  onSelectedUsersChange(selectedUsers);
                }}
              >
                <Label hidden>Select all tickets</Label>
              </Checkbox>
            </Field>
          </HeaderCell>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Email</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {data.map((row, index) => (
          <Row key={row.id} isSelected={row.selected}>
            <Cell isMinimum>
              <Field>
                <Checkbox
                  checked={row.selected}
                  disabled={disabled}
                  onKeyDown={(e) => {
                    if (e.keyCode === KEY_CODES.SHIFT) {
                      setShiftEnabled(true);
                    }
                  }}
                  onKeyUp={() => {
                    setShiftEnabled(false);
                  }}
                  onChange={(e) => {
                    const updatedRows = [...data];

                    if (shiftEnabled && focusedRowIndex !== undefined) {
                      const startIndex = Math.min(focusedRowIndex, index);
                      const endIndex = Math.max(focusedRowIndex, index);

                      const isAllChecked = updatedRows
                        .slice(startIndex, endIndex + 1)
                        .every((slicedRow) => slicedRow.selected);

                      for (let x = startIndex; x <= endIndex; x++) {
                        if (x === index && isAllChecked) {
                          updatedRows[x].selected = true;
                          continue;
                        }

                        updatedRows[x].selected = !isAllChecked;
                      }
                    } else updatedRows[index].selected = !!e.target.checked;

                    setData(updatedRows);
                    setFocusedRowIndex(index);

                    const selectedUsers = getSelectedUsers(updatedRows);
                    onSelectedUsersChange(selectedUsers);
                  }}
                >
                  <Label hidden>Select ticket for {row.name}</Label>
                </Checkbox>
              </Field>
            </Cell>
            <Cell>{row.name}</Cell>
            <Cell>{row.email}</Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
};
