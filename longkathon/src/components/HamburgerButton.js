import React, { useState } from "react";
import styled, { keyframes } from "styled-components";


export const HamburgerIcon = ({ color, width, height }) => {
  const [showBanners, setShowBanners] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 배너의 인덱스

  const handleIconClick = () => {
    setShowBanners(!showBanners);
  };

  const handleBannerClick = (index) => {
    setSelectedIndex(index); // 클릭된 배너의 인덱스를 저장
  };

  return (
    <Container>
      <LordIcon
        src="https://cdn.lordicon.com/lqxfrxad.json"
        trigger="hover"
        colors={color}
        width={width}
        height={height}
        onClick={handleIconClick}
      ></LordIcon>
      <BannersContainer show={showBanners}>
        {["마이 페이지", "진행 중 약속", "지난 약속", "설정"].map(
          (category, index) => (
            <Banner
              key={index}
              delay={index * 0.3}
              isSelected={selectedIndex === index} // 선택 상태 전달
              onClick={() => handleBannerClick(index)} // 클릭 이벤트 추가
            >
              {category}
            </Banner>
          )
        )}
      </BannersContainer>
    </Container>
  );
};

const Container = styled.div`
    z-index: 100; /* 다른 요소 위로 올라오게 설정 */
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: normal;
  margin-left: 183px;
  margin-top: 23px;
  gap: 26px;
  
`;

const LordIcon = styled.div.attrs((props) => ({
  as: "lord-icon",
  style: {
    width: `${props.width}px`,
    height: `${props.height}px`,
    cursor: "pointer",
  },
}))``;

const BannersContainer = styled.div`
  font-family: "Product Sans", sans-serif;
  font-size: 16px; /* 글자 크기 */
  width: 300px;
  margin-top:-4px;
  border: ${(props) => (props.show ? "1px solid #AFB8C1" : "none")};
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  max-height: ${(props) => (props.show ? "219px" : "0")};
  overflow: hidden;
  transition: max-height 1.2s ease-out;
    box-shadow: 2px 2px 4px 0px rgba(217, 217, 217, 1), -2px -2px 4px 0px rgba(217, 217, 217, 1);
`;


const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Banner = styled.div`
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  text-align: left;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${slideIn} 1s forwards ease-out;
  animation-delay: ${(props) => props.delay}s;
  cursor: pointer;
  

  /* 기본 테두리 */
border: none;

  &:hover {
    border: 1.5px solid #Afb8c1; /* 호버 시 스타일 */
   /* box-shadow: 2px 2px 4px 0px rgba(217, 217, 217, 1), -2px -2px 4px 0px rgba(217, 217, 217, 1);  */
/* hover시 쉐도우 처리 할건지 말건지 상의 */
  }
`;


export default HamburgerIcon;