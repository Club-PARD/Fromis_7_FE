import React from "react";
import SideBar from "./components/SideBar";
import { HamburgerIcon } from "./components/HamburgerButton";
import CategoryButton from "./components/CategoryButton";
import LenderPage from "./pages/Lender";
import HeaderComponent from "./components/HeaderComponent";
import LikeButton from "./components/LikeButton";
import LoginbuttonHeader from "./components/LoginbuttonHeader";
import styled from "styled-components";

function App() {
  return (
    <Div className="App">
      {/* <LikeButton /> */}
      {/* <LoginbuttonHeader /> */}
      <HeaderComponent />
      {/* <HeaderComponent /> */}
            {/* <LenderPage/> */}
        <SideBar />
        {/* <HamburgerIcon /> */}
        {/* <CategoryButton></CategoryButton> */}

    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;
// const Div = styled.div`
// border: 1px solid black;
// `;

// const Div2 = styled.div`
// border: 1px solid black;
// top:300px;
// `;
export default App;
