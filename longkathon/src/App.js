import React from "react";
import styled from "styled-components";
import EmptyMainPage from "./pages/EmptyMain";
import LoginPage from "./pages/Login";
import ColorPalette from "./components/ColorPalette";

function App() {
  return (
    <Div className="App">
      <EmptyMainPage />

    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;

export default App;
