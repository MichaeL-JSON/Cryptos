import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
