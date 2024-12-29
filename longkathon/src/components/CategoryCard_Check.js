import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 키와 이미지 경로를 매핑하는 객체
const imageMap = {
  purple: require("../Image/CategoryPiece_Purple.png"),
  green: require("../Image/CategoryPiece_Green.png"),
  pink: require("../Image/CategoryPiece_Pink.png"),
  lightblue: require("../Image/CategoryPiece_LightBlue.png"),
  darkblue: require("../Image/CategoryPiece_DarkBlue.png"),
  black: require("../Image/CategoryPiece_Black.png"),
  orange: require("../Image/CategoryPiece_Orange.png"),
  red: require("../Image/CategoryPiece_Red.png"),
  white: require("../Image/CategoryPiece_White.png"),
};

const StyledCard = styled.div`
  width: 217px;
  height: 260px;
  background-image: url(${require("../Image/CategoryCard.png")});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  z-index: 0;
`;

export const BookMarkIcon = ({ onClick, isMarked, isDisabled }) => {
  return (
    <lord-icon
      onClick={(e) => {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 전파 방지
        if (!isDisabled) onClick(); // 상태 변경
      }}
      src="https://cdn.lordicon.com/oiiqgosg.json"
      trigger="click"
      state={isMarked ? "morph-marked" : "morph-unmarked"}
      colors={isMarked ? "primary:#5ba8fb" : "primary:#bcbcbc"}
      style={{
        width: "40px",
        height: "40px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        // zIndex:"0",
      }}
    ></lord-icon>
  );
};

export const DeleteIcon = ({ onClick }) => {
  return (
    <lord-icon
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      src="https://cdn.lordicon.com/nqtddedc.json"
      trigger="hover"
      state="hover-cross-3"
      style={{
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    ></lord-icon>
  );
};


const CategoryCard_Check = ({
  category,
  colorKey,
  onCountChange,
  isDisabled,
  isSelected,
  clicked,
  onDelete,
  activateAlert, // AlertManager 활성화를 위한 함수 전달
}) => {
  const [isMarked, setIsMarked] = useState(isSelected); // 초기 상태를 상위에서 전달받음

  // isSelected 변경 시 내부 상태 동기화
  useEffect(() => {
    setIsMarked(isSelected);
  }, [isSelected]);

  const color = colorKey || "purple"; // 기본 색상 설정
  const imageKey = color.toLowerCase();
  const image = imageMap[imageKey] || imageMap.purple;

  const toggleCountAndColor = () => {
    if (isDisabled && !isMarked) {
      return; // 비활성 상태에서 선택 불가
    }

    setIsMarked((prevState) => {
      const newMarkedState = !prevState;
      onCountChange(newMarkedState ? 1 : -1); // 새 상태에 따라 카운트 업데이트
      return newMarkedState; // 상태 반전
    });
  };

    const handleDelete = () => {
    onDelete(); // 삭제 함수 호출
    activateAlert(); // Alert 활성화 함수 호출
  };


  return (
    <CategoryBox clicked={clicked}>
      <StyledCard />
      <CategoryPiece $image={image} />
      <CategoryText>categories:</CategoryText>
      <DisplayedText>{category}</DisplayedText>
      <CategoryIcon>
        {clicked ? (
          <DeleteIcon onClick={handleDelete}/>) : (<BookMarkIcon onClick={toggleCountAndColor}isMarked={isMarked}
            isDisabled={isDisabled}/>)}
      </CategoryIcon>
    </CategoryBox>
  );
};

// Styled Components
const CategoryBox = styled.div`
/* border: 1px solid black; */
  position: relative;
  /* z-index: 300; */
  z-index: ${(props)=>(props.clicked? "310": "298")};
`;

const CategoryIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 200;
`;

const CategoryText = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  position: absolute;
  top: 24px;
  left: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DisplayedText = styled.div`
  width: auto;
  max-width: 150px;
  height: auto;
  border-radius: 20px;
  background: #fff;
  padding: 5px 10px;
  color: #040404;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  position: absolute;
  top: 48px;
  left: 21px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CategoryPiece = styled.div`
  width: 217px;
  height: 260px;
  background-image: ${(props) => `url(${props.$image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 1;
`;

export default CategoryCard_Check;
