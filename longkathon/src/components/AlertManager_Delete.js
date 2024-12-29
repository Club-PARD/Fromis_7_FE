import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryPiece } from "./CategoryCard_Check";
// import background from "../Image/X_purple.png";

const AlertManager_Delete = ({ triggerCondition, categoryToDelete, onTrigger, onDelete, onCancel, backgroundImage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (triggerCondition) {
      setTimeout(() => {
        setIsVisible(true); // 0.5초 후 알림창 표시
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
        <AlertMessage>   <span className="categoryName">"{categoryToDelete?.category}"</span> {/* 카테고리 이름 */}조각을 <span className="deleteText">삭제</span> {/* "삭제" 글씨 */}할까요?</AlertMessage>
        <AlertBackGround $image={backgroundImage} />
        <CloseButton onClick={() => { handleClose(); onDelete(); }}>삭제</CloseButton> {/* 삭제 버튼 클릭 시 onDelete 실행 */}
        <CancelButton onClick={() => { handleClose(); onCancel(); }}>취소</CancelButton> {/* 취소 버튼 추가 */}
      </AlertBox>
    </AlertOverlay>
  );
};

export default AlertManager_Delete;

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
top:102px;
color: #3597FF;
text-align: center;
font-family: "Product Sans";
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;

  .categoryName {
    color: #3597FF;
font-family: "Product Sans";
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px;
  }

  .deleteText {
    color: #3597FF;
font-family: "Product Sans";
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 24px;
  }
`;

const CloseButton = styled.button`
position: absolute;
top: 428px;
left:262px;
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

const AlertBackGround = styled(CategoryPiece)`
width: 294px;
height: 165px;
position: absolute;
top:169px;
left: 111px;
background-image: ${(props) => `url(${props.$image})`};
`;

const CancelButton = styled.button`
position: absolute;
top: 428px;
left:30px;
width: 224px;
height: 58px;
  cursor: pointer;
  border-radius: 20px;
background: #afb8c1;
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
    background-color: #040404;
  }
`;


