import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { UserContextProvider } from "./context/userContext";
import { JamContextProvider } from "./context/jamContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <JamContextProvider>
      <App />
    </JamContextProvider>
  </UserContextProvider>
);
