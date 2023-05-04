import React from "react";
import { render } from "react-dom";
import { resizeContainer } from "../lib/helpers";
import { Container } from "./container";

const MAX_HEIGHT = 1000;

class App {
  constructor(client, appData) {
    this._client = client;
    this._appData = appData;
    this.initializePromise = this.init();
  }

  async init() {
    const container = document.querySelector(".main");
    render(<Container client={this._client} />, container);
    return resizeContainer(this._client, MAX_HEIGHT);
  }
}

export default App;
