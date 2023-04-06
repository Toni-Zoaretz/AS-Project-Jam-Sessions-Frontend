import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GlobalContextProvider } from "./context/globalContext";
import { UserContextProvider } from "./context/userContext";
import { JamContextProvider } from "./context/jamContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <GlobalContextProvider>
    <UserContextProvider>
      <JamContextProvider>
        <App />
      </JamContextProvider>
    </UserContextProvider>
  </GlobalContextProvider>
  // </React.StrictMode>
);
