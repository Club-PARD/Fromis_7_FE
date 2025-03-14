import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Dropdown = ({ isButtonClicked, onSortClosest, onSortCreatedAt }) => {
  // alertActive를 외부에서 받아옴
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("선택");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // 선택 후 드롭다운 닫기

    // 특정 항목 선택 시 추가 동작
    if (item === "링크 가까운 순") {
      console.log("링크 가까운 순 정렬 실행");
      onSortClosest(); // 정렬 함수 실행
    } else if (item === "링크 생성순") {
      onSortCreatedAt(); // '링크 생성순' 정렬 실행
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest("#dropdown-menu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Container id="dropdown-menu" isButtonClicked={isButtonClicked}>
      {" "}
      {/* alertActive 값 전달 */}
      <DropdownMenu isOpen={isOpen} onClick={toggleDropdown}>
        <MenuItem>{selectedItem}</MenuItem> {/* 초기 값 '상태' 표시 */}
        <CategoryIcon isOpen={isOpen}>
          <CategoryImage width={20} height={20} />
        </CategoryIcon>
        <DropdownItems isOpen={isOpen}>
          <MenuList>
            <MenuItem onClick={() => handleItemClick("링크 생성순")}>
              링크 생성순
            </MenuItem>
            <MenuItem onClick={() => handleItemClick("링크 가까운 순")}>
              링크 가까운 순
            </MenuItem>
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
  width: 180px;
  position: absolute; /* 전체 화면에서의 위치 설정 */
  top: 62px; /* 화면 상단에서 82px 떨어짐 */
  left: 82px; /* 화면 왼쪽에서 82px 떨어짐 */
  font-family: "Product Sans", sans-serif;
  z-index: ${(props) =>
    props.isButtonClicked
      ? 100
      : 303}; /* alertActive일 때 z-index를 300보다 낮게 설정 */
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #afb8c1;
  border-radius: 20px;
  cursor: pointer;
  width: 180px;
  justify-content: space-between;
  &:hover {
    box-shadow: 2px 2px 4px rgba(217, 217, 217, 1),
      -2px -2px 4px rgba(217, 217, 217, 1);
  }
`;

const MenuItem = styled.li`
  font-size: 14px;
  height: 43px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 텍스트 왼쪽 정렬 */
  width: 180px;
  list-style-type: none;
  text-align: center;
  text-indent: 20px; /* 글씨 왼쪽 여백 추가 */
  &:hover {
    border: 0.5px solid #afb8c1; /* 호버 시 스타일 */
    border-radius: 20px;
  }
`;

const DropdownItems = styled.div`
  width: 180px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  margin-top: 5px;
  max-height: ${(props) => (props.isOpen ? "139px" : "0")};
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
  position: absolute; /* 아이콘을 절대 위치로 설정 */
  top: 8px;
  right: 10px;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  animation: ${(props) => (props.isOpen ? rotateIn : rotateOut)} 0.5s
    ease-in-out;
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
