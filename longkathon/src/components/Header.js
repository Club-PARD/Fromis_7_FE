import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderContainer>
      <Hamberger src='/Menu.png' alt='Menu'/>
      <LogoImg src='/.png' alt='LogoImg' />
      <LogoText src='/Link.png' alt='LogoText' />
      <Search src='/Search.png' alt='Search' />
      <User src='/User.png' alt='User' />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 1440px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Hamberger = styled.img`
  width: 40px;
  height: 40px;
`;
const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;
const LogoText = styled.img`
  width: 83px;
  height: 40px;
`;
const Search = styled.img`
  width: 183px;
  height: 83px;
`;
const User = styled.img`
  width: 40px;
  height: 40px;
`;

export default Header;
