import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from "./context/context";
ReactDOM.render(
  <SpeechProvider appId="83be0859-9c87-4226-96a3-3cdebfa41f5f" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
