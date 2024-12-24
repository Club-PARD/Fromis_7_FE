import React from "react";
import SideBar from "./components/SideBar";
import { HamburgerIcon } from "./components/HamburgerButton";
import CategoryButton from "./components/CategoryButton";
import LenderPage from "./pages/Lender";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
            {/* <LenderPage/> */}
        {/* <SideBar />
        <HamburgerIcon />
        <CategoryButton></CategoryButton> */}
    </div>
  );
}

// const Div = styled.div`
// border: 1px solid black;
// `;

// const Div2 = styled.div`
// border: 1px solid black;
// top:300px;
// `;
export default App;
