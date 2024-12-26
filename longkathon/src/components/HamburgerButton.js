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
        colors="#040404"
        width="40px"
        height="40px"
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
  flex-direction: column;
  align-items: center; /* 아이콘을 중앙에 정렬 */
  position: relative; /* 드롭박스 위치 조정을 위한 기준 */
`;

const LordIcon = styled.div.attrs((props) => ({
  as: "lord-icon",
  style: {
    width: `${props.width}px`,
    height: `${props.height}px`,
    cursor: "pointer",
  },
}))`
  position: relative; /* 아이콘은 제자리 고정 */
  z-index: 10; /* 드롭박스보다 위에 표시되도록 설정 */
`;

const BannersContainer = styled.div`
  font-family: "Product Sans", sans-serif;
  font-size: 16px; /* 글자 크기 */
  width: 300px;
  height: 220px; /* 배너 높이를 고정 */
  border: ${(props) => (props.show ? "1px solid #AFB8C1" : "none")};
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  max-height: ${(props) => (props.show ? "220px" : "0")};
  overflow: hidden;
  transition: max-height 1.2s ease-out;
  box-shadow: 2px 2px 4px 0px rgba(217, 217, 217, 1),
    -2px -2px 4px 0px rgba(217, 217, 217, 1);
  position: absolute; /* 부모 기준으로 위치 설정 */
  top: 50px; /* 아이콘 바로 아래에 위치 */
  left: 0; /* 좌측 정렬 */
  z-index: 5; /* 아이콘 아래에 표시되도록 설정 */
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
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
  
  /* 배너 높이를 고정하고, 각 배너가 1/4씩 차지하도록 */
  height: 55px; /* 220px의 4분의 1 높이로 설정 */
  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid #Afb8c1; /* 호버 시 스타일 */
  }
`;

export default HamburgerIcon;
