import React, { useState } from "react";
import styled from "styled-components";
import AddLinkImage from "../image/SideBarImage.png";
// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  right: 400px;
  top: 76px;
  width: 85px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #afb8c1;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 21px;
  cursor: pointer;
  position: relative; /* 상대 위치로 설정 */
`;

const HoverImage = styled.div`
width: 243px;
height: 59px;
background-color: #5BA8FB;
color: #ffffff;
  position: absolute;
  right: 40px; /* 아이콘 옆으로 이동 */
  transform: translateY(-35%);
  transition: opacity 0.3s ease; /* 부드러운 전환 */
  border-radius: 20px 0 20px 20px;
  justify-content: center;
  align-items: center;   
  display: ${(props) => (props.isVisible ? "flex" : "none")}; /* 가시성 제어 */
`;

// Sidebar Component
const SideBar = () => {
  return (
    <SidebarContainer>
      <MenuList>
        <HoverableMenuItem
          icon={SideAddButton}
          imageSrc={AddLinkImage}
          color="primary:#5ba8fb"
          width={40}
          height={40}
        />
        <MenuItem>
          <SideHomeButton color="primary:#040404" width={40} height={40} />
        </MenuItem>
        <MenuItem>
          <SideAlramButton color="primary:#040404" width={40} height={40} />
        </MenuItem>
        <MenuItem>
          <SideShareButton color="primary:#040404" width={40} height={40} />
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

// HoverableMenuItem Component
const HoverableMenuItem = ({ icon: Icon, imageSrc, ...iconProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <MenuItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon {...iconProps} />
      <HoverImage isVisible={isHovered}>
        <CenteredText>약속 생성하기</CenteredText>
      </HoverImage>
    </MenuItem>
  );
};

// Icon Components
export const SideAddButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/hqymfzvj.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideHomeButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/cnpvyndp.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideAlramButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/vspbqszr.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideShareButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/ercyvufy.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

const CenteredText = styled.div`
/* border: 1px solid black; */
  font-family: "Product Sans", sans-serif;
  font-size: 20px; /* 글자 크기 */
  text-align: center; /* 텍스트 정렬 */
`;

export default SideBar;
