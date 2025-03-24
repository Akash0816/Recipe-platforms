import React from "react";
import ReactDOM from "react-dom/client";
import "./Style/login.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import RouterComponent from "./router"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterComponent /> 
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
