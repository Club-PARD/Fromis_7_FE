import React from "react";
import menu from '../Image/Menu.png';
import logoImg from '../Image/Logo.png';
import logoText from '../Image/LogoText.png';
import search from '../Image/Search.png';
import User from '../Image/User.png';
import styled from "styled-components";

function UserIconHeader() {
  return (
    <HeaderContainer>
      <Hamberger src={menu} alt='Menu'/>
      <LogoGroup>
        <LogoImg src={logoImg} alt='LogoImg' />
        <LogoText src={logoText} alt='LogoText' />
      </LogoGroup>
      <SearchBox>
        <Search type="text" placeholder="Search" />
        <SearchIcon src={search} alt="search" />
      </SearchBox>
      <User src={User} alt="User" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 1440px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px; 
  box-sizing: border-box;
  overflow: hidden; 
`;

const Hamberger = styled.img`
  width: 40px;
  height: 40px;
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

const LogoText = styled.img`
  width: 83px;
  height: 40px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
`;

const Search = styled.input`
  width: 155px;
  height: 38px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
`;

const User = styled.button`
  width: 85px;
  height: 40px;
`;

export default UserIconHeader;
