import React from "react";
import menu from '../Image/Menu.png';
import logoImg from '../Image/Logo.png';
import logoText from '../Image/LogoText.png';
import search from '../Image/Search.png';
import user from '../Image/User.png';
import styled from "styled-components";

function HeaderComponent() {
  return (
    <HeaderContainer>
      <Hamberger src={menu} alt='Menu'/>
      <LogoGroup>
        <LogoImg src={logoImg} alt='LogoImg' />
        <LogoText src={logoText} alt='LogoText' />
      </LogoGroup>
      <SearchBox>
      <Search type="text" placeholder="Search"/>
      <SearchIcon src={search} alt="search" />
      </SearchBox>
    
      <User src={user} alt='User' />
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
  margin-left: 7.64vw;
  margin-right: 640px;
  width: 40px;
  height: 40px;
`;

const LogoGroup = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

const LogoText = styled.img`
  width: 83px;
  height: 40px;
  margin-left: 0.5555vw; 
  margin-right: 500px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.71vw;
  height: 2.64vw;
  margin-right: 30px;
`;

const Search = styled.input`
  width: 155px;
  height: 38px;
`;

const SearchIcon = styled.img`
  margin-left: 0px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const User = styled.img`
  width: 40px;
  height: 40px;
`;

export default HeaderComponent;
