import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// React 18에서 createRoot를 사용하여 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));

// RecoilRoot로 감싸서 애플리케이션에 Recoil 상태 관리 제공
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
