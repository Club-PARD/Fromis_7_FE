import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateCategoryAPI } from "../API/Category";

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
  gray: require("../Image/CategoryPiece_White.png"),
};

// 색상 코드와 색상 이름을 매핑하는 객체
const colorCodeMap = {
  '#EA7E7A': 'red',
  '#FBA96F': 'orange',
  '#5BA8FB': 'lightblue',
  '#002ED1': 'darkblue',
  '#9ED4B6': 'green',
  '#927CFF': 'purple',
  '#D9A9ED': 'pink',
  '#BDBDBD': 'gray',
  '#424242': 'black',
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
  cateId,
}) => {
  const [isMarked, setIsMarked] = useState(isSelected); // 초기 상태를 상위에서 전달받음

  // isSelected 변경 시 내부 상태 동기화
  useEffect(() => {
    setIsMarked(isSelected);
  }, [isSelected]);

  // 색상 코드 변환: colorKey를 색상 코드로 매핑하여 imageMap에 적용
  const colorName = colorCodeMap[colorKey] || "purple"; // colorCodeMap을 사용하여 색상 코드 변환
  const backgroundImage = imageMap[colorName] || imageMap.purple; // 변환된 색상 이름으로 이미지 매핑

  const toggleCountAndColor = () => {
    if (isDisabled && !isMarked) {
      return; // 비활성 상태에서 선택 불가
    }
    setIsMarked((prevState) => {
      const newMarkedState = !prevState;
      onCountChange(newMarkedState ? 1 : -1);
      return newMarkedState;
    });
  };

  //   setIsMarked((prevState) => {
  //     const newMarkedState = !prevState;
  //     onCountChange(newMarkedState ? 1 : -1); // 새 상태에 따라 카운트 업데이트
  //     updateIsHighlighted(cateId, newMarkedState); // 서버에 isHighlighted 상태 업데이트
  //     return newMarkedState; // 상태 반전
  //   });
  // };

  const handleDelete = () => {
    onDelete(cateId); // cateId를 전달
    activateAlert();
  };

  // 서버로 상태를 변경할 때 호출하는 함수 (목 데이터 사용)
  // const updateIsHighlighted = async (cateId, isHighlighted) => {
  //   try {
  //     // 서버 호출 부분을 주석 처리하고 목 데이터 반환
  //     // const response = await updateCategoryAPI(cateId, isHighlighted); // 실제 서버 호출

  //     // 목 데이터 (가상의 응답을 반환)
  //     const response = { data: { cateId, isHighlighted } }; // 예시 응답
  //     console.log("목 데이터로 업데이트됨:", response);
  //     return response.data; // 서버의 응답 데이터 반환
  //   } catch (error) {
  //     console.error("Error updating highlighted status:", error);
  //     throw error; // 에러 처리
  //   }
  // };

  return (
    <CategoryBox clicked={clicked}>
      <StyledCard />
      <CategoryPiece background={backgroundImage} />
      <CategoryText>categories:</CategoryText>
      <DisplayedText>{category}</DisplayedText>
      <CategoryIcon>
        {clicked ? (
          <DeleteIcon onClick={handleDelete} />) : (<BookMarkIcon onClick={toggleCountAndColor} isMarked={isMarked}
            isDisabled={isDisabled} />)}
      </CategoryIcon>
    </CategoryBox>
  );
};

// Styled Components
const CategoryBox = styled.div`
/* border: 1px solid black; */
  position: relative;
  /* z-index: 300; */
  z-index: ${(props) => (props.clicked ? "310" : "298")};
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
  background-image: ${(props) => `url(${props.background})`};
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