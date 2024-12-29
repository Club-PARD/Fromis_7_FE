import React from "react";
import styled from "styled-components";

const MainRightViewContainer = ({ width = "411px", height = "383px", style, users = [] }) => {
  return (
    <StyledCard style={{ width, height, ...style }}>
      <TextContainer>
        <TitleBox>
          <RightViewText>제목</RightViewText>
          <LinkTitle>{"Text_Input"}</LinkTitle>
        </TitleBox>
        <DateBox>
          <RightViewText>날짜</RightViewText>
          <LinkDate>{"Date_Input"}</LinkDate>
        </DateBox>
        <MemberBox>
          <RightViewText>멤버</RightViewText>
          <MemberCard>
            {users.map((user, index) => (
              <LinkMember key={index}>{`${user}`}</LinkMember>
            ))}
          </MemberCard>
        </MemberBox>
      </TextContainer>
    </StyledCard>
  );
};

const StyledCard = styled.div`
cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  opacity: 0.7;
  background: linear-gradient(149deg, #f0f8ff 0.77%, #f2f1f8 99.23%);
`;

const TextContainer = styled.div`
  position: relative;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 33px;
  left: 34px;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 109px;
  left: 34px;
`;

const MemberBox = styled.div`
  width: 287px;
  height: 136px;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 175px;
  left: 34px;
`;

const MemberCard = styled.div`
  margin-top: 4px;
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 가능하도록 설정 */
  gap: 12px; /* 카드 간격 설정 */
`;

const RightViewText = styled.div`
  color: #afb8c1;
  font-family: "Product Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
`;

const LinkTitle = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 100% */
  position: absolute;
  top: 16px;
`;

const LinkDate = styled.div`
  color: #040404;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  position: absolute;
  top: 16px;
`;

const LinkMember = styled.div`
  color: #040404;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  width: 77px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainRightViewContainer;
