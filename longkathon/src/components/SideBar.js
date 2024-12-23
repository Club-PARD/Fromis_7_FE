import React from "react";
import styled from "styled-components";

// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 200px;
  width: 85px;
  height:265px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #AFB8C1;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// const CreateButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 8px 12px;
//   font-size: 14px;
//   cursor: pointer;
//   margin-bottom: 20px;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 22px;
`;

const MenuItem = styled.li`
  margin :21px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// Sidebar Component
const SideBar = () => {
  return (
    <SidebarContainer>
      <MenuList>
        <MenuItem>
          <AddPromiseButton color="primary:#5ba8fb" width={40} height={40} />
        </MenuItem>
        <MenuItem>
          <SideHomeButton color="primary:#040404" width={40} height={40} />
        </MenuItem>
        <MenuItem>
          <MenuIcon src="/icons/notifications.svg" alt="알림" />
        </MenuItem>
        <MenuItem>
          <MenuIcon src="/icons/share.svg" alt="공유" />
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default SideBar;


export const AddPromiseButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/hqymfzvj.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }} // 문자열 템플릿 사용
    ></lord-icon>
  );
};

export const SideHomeButton = ({ color, width, height }) => {
  return (<lord-icon
    src="https://cdn.lordicon.com/cnpvyndp.json"
    trigger="hover"
    colors={color}
    style={{ width: `${width}px`, height: `${height}px` }}>
  </lord-icon>);
};

{/* <AddPromiseButton color="primary:#5ba8fb" width={150} height={150} /> */ }