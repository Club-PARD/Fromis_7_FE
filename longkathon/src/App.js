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
import AllCategoryPage from "./pages/AllCategoryPage";

function App() {
  return (
    <Div className="App">
      {/* <MainPage /> */}
      <AllCategoryPage Title="category_Title"/>
    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;

export default App;
