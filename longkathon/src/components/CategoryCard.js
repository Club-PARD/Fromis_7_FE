import React from "react";
import styled from "styled-components";
import CategoryCardImage from "../Image/CategoryCard.png";

// 키와 이미지 경로를 매핑하는 객체
const imageMap = {
  purple: require("../Image/CategoryPiece_Purple.png"),  // 이미지 경로 예시
  // green: require("../Image/GreenPiece.png"),
  // 추가적으로 다른 키와 이미지 경로를 설정할 수 있습니다.
};

const StyledCard = styled.div`
  width: 217px;
  height: 260px;
  background-image: url(${CategoryCardImage});  // 기본 배경 이미지 설정
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;  // z-index가 작동하려면 부모 요소에 position이 필요
  z-index: 0;  // StyledCard는 제일 뒤에 위치하도록 설정
`;

export const BookMarkIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/oiiqgosg.json"
      trigger="hover"
      colors="primary:#5ba8fb"
      style={{ width: "40px", height: "40px" }}
    ></lord-icon>
  );
};

const CategoryBox = styled.div`
  position: relative;  // 내부 요소들이 z-index를 사용할 수 있도록
`;

const CategoryIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const CategoryCard = ({ category, key }) => {
  // key에 맞는 이미지를 imageMap에서 가져오기
  const imageKey = key ? key.toLowerCase() : "purple";
  const image = imageMap[imageKey] || imageMap.purple;  // 기본값을 purple로 설정

  return (
    <CategoryBox>
      <StyledCard />  {/* StyledCard는 배경 이미지로 설정됨 */}
      <CategoryPiece image={image} />  {/* CategoryPiece에 배경 이미지 전달 */}
      <CategoryText>categories:</CategoryText>
      <DisplayedText>{category}</DisplayedText>
      <CategoryIcon>
        <BookMarkIcon />
      </CategoryIcon>
    </CategoryBox>
  );
};

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

const CategoryPiece = styled.div`
  /* border: 1px solid black; */
  width: 217px;
  height: 260px;
  background-image: ${(props) => `url(${props.image})`};  // image prop을 사용하여 배경 이미지 설정
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: absolute;  // 다른 요소들과 겹치지 않도록 위치를 절대 위치로 설정
  top: 0;
  left: 0;
  z-index: 1;  // CategoryPiece는 StyledCard 위에 겹치도록 설정
`;

export default CategoryCard;
