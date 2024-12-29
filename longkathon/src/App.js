import React from "react";
import styled from "styled-components";
import AllCategoryPage from "./pages/AllCategoryPage";
import EmptyMainPage from "./pages/EmptyMain";

function App() {
  return (
    <Div className="App">
      {/* <MainPage /> */}
      <AllCategoryPage Title="category_Title"/>
      {/* <EmptyMainPage /> */}
    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;

export default App;
