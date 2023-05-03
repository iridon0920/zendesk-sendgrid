import React from "react";
import { render } from "react-dom";
import { resizeContainer } from "../lib/helpers";
import { UsersTable } from "./users_table";

const MAX_HEIGHT = 1000;

class App {
  constructor(client, appData) {
    this._client = client;
    this._appData = appData;
    this.initializePromise = this.init();
  }

  rowData = Array.from(Array(10)).map((row, index) => ({
    id: `row-${index}`,
    name: `User #${index}`,
    email: "test@example.com",
    selected: false,
  }));

  handleSelectedUsersChange(users) {
    console.log(users);
  }

  async init() {
    const container = document.querySelector(".main");
    render(
      <UsersTable
        users={this.rowData}
        onSelectedUsersChange={this.handleSelectedUsersChange}
      />,
      container
    );
    return resizeContainer(this._client, MAX_HEIGHT);
  }
}

export default App;
