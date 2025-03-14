import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryPiece } from "./CategoryCard_Check";
import background from "../Image/X_purple.png";

const AlertManager = ({ message, totalCount, checkVisible, onClose }) => {
  //onConfirm
  const [isVisible, setIsVisible] = useState(checkVisible);
  // console.log("🔔 AlertManager 렌더링됨:", isVisible);
  useEffect(() => {
    if (totalCount >= 5) {
      setIsVisible(true);
    }
  }, [totalCount]); // totalCount가 변경될 때 실행

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    // console.log("🔔 AlertManager 닫기 버튼 클릭됨", totalCount);
    // onConfirm(); // 부모 컴포넌트에서 totalCount 감소 실행
  };

  if (!isVisible) return null;

  return (
    <AlertOverlay>
      <AlertBox>
        <AlertMessage>{message}</AlertMessage>
        <AlertBackGround $image={background} />
        <CloseButton onClick={handleClose}>확인</CloseButton>
      </AlertBox>
    </AlertOverlay>
  );
};

export default AlertManager;

// 스타일 컴포넌트 정의
const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(4, 4, 4, 0.6);
  z-index: 1200;
`;

const AlertBox = styled.div`
  background: #fff;
  position: absolute;
  top: 198px;
  left: 454px;
  width: 516px;
  height: 516px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
`;

const AlertMessage = styled.div`
  position: absolute;
  top: 110px;
  color: #3597ff;
  text-align: center;
  font-family: "Product Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 428px;
  width: 224px;
  height: 58px;
  cursor: pointer;
  border-radius: 20px;
  background: #5ba8fb;
  transition: background-color 0.2s;
  color: #fff;
  text-align: center;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  &:hover {
    background-color: #927cff;
  }
`;

const AlertBackGround = styled(CategoryPiece)`
  width: 294px;
  height: 165px;
  position: absolute;
  top: 175px;
  left: 111px;
  background-image: ${(props) => `url(${props.$image})`};
`;
