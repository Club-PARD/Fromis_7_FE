import React, { useState } from "react";
import logoImg from '../Image/Logo.png';
import styled from "styled-components";
import HamburgerIcon from "./HamburgerButton";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ disabled, isButtonClicked }) => { // 외부에서 disabled 값을 받아옴
  const navigate = useNavigate();

  const handleConnectHome = () => {
    navigate("/piece");
  };

  const handleConnectMyInfo = () => {
    navigate("/mypage");
  };

  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    console.log("Search clicked with text:", searchText);
    // 여기에 검색 처리 로직을 추가할 수 있습니다.
  };

  return (
      <HeaderBackground isButtonClicked={isButtonClicked}>
        <HamburgerContainer>
          <HamburgerIcon />
        </HamburgerContainer>

        <LogoGroup onClick={handleConnectHome}>
          <LogoImg src={logoImg} alt='LogoImg' />
          <LogoText> L:nk</LogoText>
        </LogoGroup>

        <RightContainer>
          <SearchBox>
            <Search
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              disabled={disabled} // 외부에서 받은 disabled 값으로 배경색을 변경
            />
            <SearchButton onClick={handleSearchClick}>
              <SearchIcon disabled={disabled} />
            </SearchButton>
          </SearchBox>
          <UserBox onClick={handleConnectMyInfo}>
            <User />
          </UserBox>
        </RightContainer>
      </HeaderBackground>
  );
};

const HeaderBackground = styled.div`
position: fixed;
width: 100%;
height: 60px;
background-color: white;
top: 0;
  left: 0;
  right: 0;
  z-index: ${(props) => (props.isButtonClicked ? 200 : 900)};  
  padding: 0 20px;  /* 좌우 여백 추가 */
   align-items: center;
  justify-content: space-between;
  display: flex;
`;

const HamburgerContainer = styled.div`
  margin-left: 82px;
  width: 40px;
`;

const LogoGroup = styled.div`
position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const LogoText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 0%;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.71vw;
  height: 2.64vw;
  margin-right: 46px;
`;

const Search = styled.input`
  border: ${(props) => (props.disabled ? "1px solid rgba(4, 4, 4, 0.3)" : "1px solid #afb8c1")};
  border-radius: 10px;
  width: 192px;
  height: 38px;
  padding-left: 12px;
  background: ${(props) => (props.disabled ? "rgba(104,104,104)" : "#fff")};  /* 외부에서 받은 disabled 값에 따라 배경색 변경 */
  
  &::placeholder {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: ${(props) => (props.disabled ? "rgba(4, 4, 4, 0.3)" : "#afb8c1")};
  }
`;

const SearchButton = styled.button`
  background: transparent;
  padding: 0;
  cursor: pointer;
  margin-left: -32px;
  border: none;
`;

const SearchIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/kkvxgpti.json"
      trigger="hover"
      colors="primary:#afb8c1"
      style={{ width: "20px", height: "20px" }}
    ></lord-icon>
  );
};

const UserBox = styled.div` 
  margin-right: 103px;
`;

const User = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/kthelypq.json"
      trigger="hover"
      style={{ width: "40px", height: "40px" }}
    ></lord-icon>
  );
};

export default HeaderComponent;
