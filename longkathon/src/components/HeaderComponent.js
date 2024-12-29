import React, { useState } from "react";
import logoImg from '../Image/Logo.png';
import styled from "styled-components";
import HamburgerIcon from "./HamburgerButton";

const HeaderComponent = ({ disabled }) => { // 외부에서 disabled 값을 받아옴
  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    console.log("Search clicked with text:", searchText);
    // 여기에 검색 처리 로직을 추가할 수 있습니다.
  };

  return (
    <HeaderContainer>
      <HamburgerContainer>
        <HamburgerIcon />
      </HamburgerContainer>

      <LogoGroup>
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
            <SearchIcon disabled={disabled}/>
          </SearchButton>
        </SearchBox>
        <UserBox>
          <User />
        </UserBox>
      </RightContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  /* border: 1px solid black; */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HamburgerContainer = styled.div`
  margin-left: 82px;
`;

const LogoGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  border:${(props) => (props.disabled ? "1px solid rgba(4, 4, 4, 0.3)" : "1px solid #afb8c1")};
  border-radius: 10px;
  width: 192px;
  height: 38px;
  padding-left: 12px;
  background: ${(props) => (props.disabled ? "rgba(104,104,104)" : "#fff")};  /* 외부에서 받은 disabled 값에 따라 배경색 변경 */
  
  &::placeholder {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: ${(props)=>(props.disabled? "rgba(4, 4, 4, 0.3)" : "#afb8c1")};
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
/* border: 1px solid black; */
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
