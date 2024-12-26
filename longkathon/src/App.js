import React from "react";
import styled from "styled-components";
import EmptyMainPage from "./pages/EmptyMain";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Div className="App">
      <LoginPage />
    </Div>
  );
}


const Div = styled.div`
 /* border: 1px solid black; */
`;

export default App;
