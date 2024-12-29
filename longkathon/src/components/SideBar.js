import React, { useState } from "react";
import styled from "styled-components";
import AddLinkImage from "../Image/SideBarImage.png";
import { useNavigate } from "react-router-dom";
import ModalAdd from "./ModalAdd";


// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  right: 80px;
  top: 62px;
  width: 85px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #afb8c1;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

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
  display: ${(props) => (props.$isVisible ? "flex" : "none")}; /* 가시성 제어 */
`;

// Sidebar Component
const SideBar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectHome = () => {
    navigate("/main");
  };

  const handleConnectMakeTitle = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (payload) => {
    // Implement save logic here
    console.log("Payload saved:", payload);
    closeModal();
  };

  return (
    <>
      <SidebarContainer>
        <MenuList>
          <AddContainer onClick={handleConnectMakeTitle}>
            <HoverableMenuItem
              icon={SideAddButton}
              imageSrc={AddLinkImage}
              color="primary:#5ba8fb"
              width={40}
              height={40}
            />
          </AddContainer>
          <MenuItem>
            <HomeContainer onClick={handleConnectHome}>
              <SideHomeButton color="primary:#040404" width={40} height={40} />
            </HomeContainer>
          </MenuItem>
          <MenuItem>
            <SideAlramButton color="primary:#040404" width={40} height={40} />
          </MenuItem>
          <MenuItem>
            <SideShareButton color="primary:#040404" width={40} height={40} />
          </MenuItem>
        </MenuList>
      </SidebarContainer>

      <ModalAdd
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </>
  );
};

// HoverableMenuItem Component
const HoverableMenuItem = ({ icon: Icon, color, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MenuItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon color={color} width={width} height={height} />
      <HoverImage $isVisible={isHovered}>
        <CenteredText>함께 링크하기</CenteredText>
      </HoverImage>
    </MenuItem>
  );
};

// Icon Components
const AddContainer = styled.div`

`;

const HomeContainer = styled.div`

`;

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
