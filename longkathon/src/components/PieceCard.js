import React from "react";
import styled from "styled-components";
import PieceBackground from "../Image/PieceBackground.png";

// const colorMap = {
//   "#9ED4B6": "green", // '#9ED4B6'는 green에 매핑
// };

// 키와 이미지 경로를 매핑하는 객체
const imageMap = {
  purple: require("../Image/CategoryPiece_Purple.png"),  // 이미지 경로 예시
  green: require("../Image/CategoryPiece_Green.png"),
  pink: require("../Image/CategoryPiece_Pink.png"),
  lightblue: require("../Image/CategoryPiece_LightBlue.png"),
  darkblue: require("../Image/CategoryPiece_DarkBlue.png"),
  black: require("../Image/CategoryPiece_Black.png"),
  orange: require("../Image/CategoryPiece_Orange.png"),
  red: require("../Image/CategoryPiece_Red.png"),
  gray: require("../Image/CategoryPiece_White.png"),
};

const StyledCard = styled.div`
  width: 484px;
  height: 260px;
  background-image: url(${PieceBackground});  // 기본 배경 이미지 설정
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;  // z-index가 작동하려면 부모 요소에 position이 필요
  z-index: 0;  // StyledCard는 제일 뒤에 위치하도록 설정
`;


const PieceCard = ({
  colorkey,
  clicked,
  onDelete,
  activateAlert,
  title,
  date,
  members
}) => {
  const backgroundImage = imageMap[colorkey] || imageMap.purple;

  const handleDelete = () => {
    onDelete(); // 삭제 함수 호출
    activateAlert(); // Alert 활성화 함수 호출
  };

  return (
    <CategoryBox clicked={clicked}>
      <StyledCard>
        <BodyContainer>
          <LeftContainer>
            <LeftBox1>
              <Text1>
                제목
              </Text1>
              <PieceTitle>{title || "제목 없음"}</PieceTitle>
            </LeftBox1>
            <LeftBox2>
              <Text1>
                날짜
              </Text1>
              <PieceDate>{date || "날짜 정보 없음"}</PieceDate>

            </LeftBox2>
            <LeftBox3>
              <Text1>
                멤버
              </Text1>
              <PieceMemberBox>
                {members && members.length > 0
                  ? members.map((member, index) => (
                    <PieceMember key={index}>{member}</PieceMember>
                  ))
                  : <PieceMember>멤버 없음</PieceMember>}
              </PieceMemberBox>
            </LeftBox3>
          </LeftContainer>
          <RightContainer backgroundImage={backgroundImage } />
        </BodyContainer>
      </StyledCard>
      <CategoryIcon>
        {clicked ? (
          <DeleteIcon onClick={handleDelete} />) : null}
      </CategoryIcon>
    </CategoryBox>
  );
};

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

const LeftBox1 = styled.div`
height: 38px;
display: flex;
text-align: left;
flex-direction: column;
margin-top:20px;
margin-left:20px;
margin-right: 20px;
`;

const PieceTitle = styled.div`
color: #040404;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 130% */
`;

const LeftBox2 = styled.div`
height: 38px;
display: flex;
text-align: left;
flex-direction: column;
margin-top:18px;
margin-left:20px;
margin-right: 20px;
`;

const PieceDate = styled.div`
color: #040404;
font-family: "Product Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 16px;
`;

const LeftBox3 = styled.div`
display: flex;
text-align: left;
flex-direction: column;
margin-top:18px;
margin-left:20px;
margin-right: 20px;
`;

const PieceMemberBox = styled.div`
height: max-content;
  margin-top: 7px;
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 가능하도록 설정 */
  gap: 10px; /* 카드 간격 설정 */
`;

const PieceMember = styled.div`
  color: #040404;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  width: 64px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text1 = styled.div`
color: #AFB8C1;
font-family: "Product Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 12px; /* 100% */
`;

const BodyContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
`;

const LeftContainer = styled.div`
display: flex;
flex-direction: column;
width:267px;
`;

const RightContainer = styled.div`
  width: 217px;
  height: 260px;
  background-image: ${(props) => {
    return `url(${props.backgroundImage})`;
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  z-index: 1;  // CategoryPiece는 StyledCard 위에 겹치도록 설정
`;

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

export default PieceCard;
