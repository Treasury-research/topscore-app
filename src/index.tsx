import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "material-react-toastify";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <ConfigProvider>
      <App />
      <ToastContainer position="top-right" />
    </ConfigProvider>
  </RecoilRoot>
);
