import React from "react";

import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import queryClient from "utils/queryClient";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// eslint-disable-next-line import/order
import initializeAxios from "apis/axios";
// eslint-disable-next-line import/order
import { ToastContainer } from "react-toastify";

initializeAxios();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
