import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("상태");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);  // 선택 후 드롭다운 닫기
  };

  return (
    <Container>
      <DropdownMenu isOpen={isOpen} onClick={toggleDropdown}>
        <MenuItem>
          {selectedItem}
        </MenuItem>  {/* 초기 값 '상태' 표시 */}
        <CategoryIcon isOpen={isOpen}>
          <CategoryImage width={20} height={20} />
        </CategoryIcon>
        <DropdownItems isOpen={isOpen}>
          <MenuList>
            <MenuItem onClick={() => handleItemClick("등록순")}>등록순</MenuItem>
            <MenuItem onClick={() => handleItemClick("근접순")}>근접순</MenuItem>
          </MenuList>
        </DropdownItems>
      </DropdownMenu>
    </Container>
  );
};


const rotateIn = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateOut = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

// Styled Components

const Container = styled.div`
top:76px;
  position: relative;
  display: inline-block;
  font-family: "Product Sans", sans-serif;
  margin-left: 183px;
  z-index: 1; /* 기본적으로 낮은 z-index */

`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #afb8c1;
  border-radius: 20px;
  cursor: pointer;
  width: 136px;
  justify-content: space-between;
  box-shadow: 2px 2px 4px rgba(217, 217, 217, 1), -2px -2px 4px rgba(217, 217, 217, 1);
`;

const MenuItem = styled.li`
  font-size: 14px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 114px;
  list-style-type: none;
  padding-left: 20px; /* 글씨 옆의 간격 20px 설정 */
  text-align: center;
  &:hover {
    border: 1.5px solid #Afb8c1; /* 호버 시 스타일 */
    border-radius: 20px;
  }
`;

const DropdownItems = styled.div`
  width: 136px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  margin-top: 5px;
  max-height: ${(props) => (props.isOpen ? "200px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: max-height 1.2s ease-in-out, opacity 1.2s ease-in-out;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const CategoryIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;  /* 아이콘을 절대 위치로 설정 */
  top: 8px;  
  right: 10px;  /* 오른쪽에 고정 */
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  animation: ${(props) => (props.isOpen ? rotateIn : rotateOut)} 0.5s ease-in-out;
`;

export const CategoryImage = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/rmkahxvq.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Dropdown;
