import React from "react";
import SideBar from "./components/SideBar";
import { HamburgerIcon } from "./components/HamburgerButton";
import CategoryButton from "./components/CategoryButton";
import LenderPage from "./pages/Lender";
import HeaderComponent from "./components/HeaderComponent";
import LikeButton from "./components/LikeButton";
import LoginbuttonHeader from "./components/LoginbuttonHeader";
import styled from "styled-components";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Div className="App">
      <MainPage />
    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;

export default App;
