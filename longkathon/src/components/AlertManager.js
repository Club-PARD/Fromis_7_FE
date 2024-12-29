// {/* AlertManager: 최대 선택 개수 도달 시 경고 */}
// <AlertManager
//   triggerCondition={totalCount === 4}
//   message="최대 선택 개수에 도달했습니다!"
// />

// {/* AlertManager: 삭제 버튼 누른 후 경고 */}
// <AlertManager
//   triggerCondition={showDeleteAlert}
//   message="카드가 삭제되었습니다."
//   onTrigger={() => setShowDeleteAlert(false)} // 경고 후 상태 초기화
// />

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryPiece } from "./CategoryCard_Check";
import backgroundImage from "../Image/X_purple.png";

const AlertManager = ({ triggerCondition, message, onTrigger }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (triggerCondition) {
      setTimeout(() => {
        setIsVisible(true); // 0.5초 딜레이 후 알림창 표시
        if (onTrigger) onTrigger(); // 추가 동작 실행 (선택사항)
      }, 500);
    }
  }, [triggerCondition, onTrigger]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AlertOverlay>
      <AlertBox>
        <AlertMessage>{message}</AlertMessage>
        <AlertBackGround $image={backgroundImage}/>
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
  z-index: 1000;
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
color: #3597FF;
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
background: #5BA8FB;
  transition: background-color 0.2s;
  color: #FFF;
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

const AlertBackGround=styled(CategoryPiece)`
width: 294px;
height: 165px;
position: absolute;
top:175px;
left: 111px;
`;

