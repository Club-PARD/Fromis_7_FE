import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const HamburgerIcon = () => {
  const [showBanners, setShowBanners] = useState(false);

  const navigate = useNavigate();

  const handleConnectMyInfo = () => {
    navigate("/mypage");
  };

  const handleNavigateMain = () => {
    navigate("/main/{userId}");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleIconClick = () => {
    setShowBanners(!showBanners);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest("#hamburger-menu")) {
      setShowBanners(false);
    }
  };

  useEffect(() => {
    if (showBanners) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showBanners]);

  return (
    <Container id="hamburger-menu">
      <LordIcon
        src="https://cdn.lordicon.com/lqxfrxad.json"
        trigger="hover"
        colors="#040404"
        width="40px"
        height="40px"
        onClick={handleIconClick}
      ></LordIcon>
      <BannersContainer show={showBanners}>
        {["마이 페이지", "진행 중 링크", "로그아웃"].map((category, index) => (
          <Banner
            key={index}
            onClick={
              index === 0
                ? handleConnectMyInfo // 마이 페이지로 이동
                : index === 1
                ? handleNavigateMain // 진행 중 링크 -> main 페이지 이동
                : index === 2
                ? handleLogout // 로그아웃 시 login 페이지로 이동
                : undefined
            }
          >
            {category}
          </Banner>
        ))}
      </BannersContainer>
    </Container>
  );
};

const Container = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LordIcon = styled.div.attrs((props) => ({
  as: "lord-icon",
  style: {
    width: `${props.width}px`,
    height: `${props.height}px`,
    cursor: "pointer",
  },
}))`
  position: relative;
  z-index: 10;
`;

const BannersContainer = styled.div`
  font-family: "Product Sans", sans-serif;
  font-size: 16px;
  width: 300px;
  height: 162px;
  border: ${(props) => (props.show ? "1px solid #AFB8C1" : "none")};
  border-radius: 20px;
  background-color: #ffffff;
  display: ${(props) =>
    props.show ? "flex" : "none"}; /* 드롭박스 표시 여부 */
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 2px 4px 0px rgba(217, 217, 217, 1),
    -2px -2px 4px 0px rgba(217, 217, 217, 1);
  position: absolute;
  top: 45px;
  left: 0px;
  z-index: 999;
`;

const Banner = styled.div`
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  text-align: left;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 0.5px solid #afb8c1;
  }
`;

export default HamburgerIcon;
