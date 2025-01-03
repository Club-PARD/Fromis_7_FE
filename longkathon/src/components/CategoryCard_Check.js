import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateCategoryAPI } from "../API/Category";

const CategoryCard_Check = ({
  category,
  colorKey,
  isDisabled,
  isMarked, //bookMark
  clicked,
  onDelete,
  activateAlert, // AlertManager 활성화를 위한 함수 전달
  cateId,
  onCountChange, // 상위 컴포넌트로 상태를 변경할 때 호출되는 함수
  onIsMarkedChange,
}) => {

  const [isMarkedLocal, setIsMarkedLocal] = useState(isMarked);

   // isMarked 상태가 변경되었을 때, 상위 컴포넌트에 상태를 전달하는 함수
   const handleBookMarkClick = () => {
    console.log("북마크 클릭됨, 상태 변경 중...");
    // isMarked 상태 토글
    const newMarkedState = !isMarkedLocal;
    console.log("새로운 북마크 상태: ", newMarkedState);
    setIsMarkedLocal(newMarkedState);

    // 상위 컴포넌트로 상태 변경을 전달
    onIsMarkedChange(newMarkedState);

    // 상태 토글에 따른 totalCount 변화
    if (newMarkedState) {
      console.log("북마크 추가됨, count 증가");
      onCountChange(1); // 증가
    } else {
      console.log("북마크 제거됨, count 감소");
      onCountChange(-1); // 감소
    }
  };

  useEffect(() => {
    // isMarked가 변경될 때마다 서버에 PATCH 요청 보내기
    if (isMarkedLocal !== isMarked) {
      console.log(`isMarked 상태 변경됨: ${isMarkedLocal} (서버에 반영 중...)`);

      // 서버에 요청을 보내는 함수 (예시로 axios 사용)
      const updateIsHighlighted = async () => {
        try {
          const response = updateCategoryAPI(cateId, isMarkedLocal);
          console.log("서버 응답: ", response.isHightlighted); // 서버 응답 확인
          console.log("서버에 성공적으로 업데이트됨");
        } catch (error) {
          console.error("서버 업데이트 실패: ", error); // 오류 발생 시 로그
        }
      };

      updateIsHighlighted(); // 요청 실행
    }
  }, [isMarkedLocal, cateId]); // isMarkedLocal이 변경될 때마다 실행

  // 색상 코드 변환: colorKey를 색상 코드로 매핑하여 imageMap에 적용
  const colorName = colorCodeMap[colorKey] || "purple"; // colorCodeMap을 사용하여 색상 코드 변환
  const backgroundImage = imageMap[colorName] || imageMap.purple; // 변환된 색상 이름으로 이미지 매핑

  const handleDelete = () => {
    onDelete(cateId); // cateId를 전달
    activateAlert();
  };


  return (
    <CategoryBox clicked={clicked}>
      <StyledCard />
      <CategoryPiece background={backgroundImage} />
      <CategoryText>categories:</CategoryText>
      <DisplayedText>{category}</DisplayedText>
      <CategoryIcon>
        {clicked ? (
          <DeleteIcon onClick={handleDelete} />) : (<BookMarkIcon onClick={handleBookMarkClick} isMarked={isMarkedLocal}
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
    // key로 강제 리렌더링
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

export default CategoryCard_Check;