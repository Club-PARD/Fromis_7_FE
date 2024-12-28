import React from "react";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import Dropdown from "../components/CategoryButton";
import styled from "styled-components";
import DayCard from "../components/DayCard";
import MainRightViewContainer from "../components/MainRightViewContainer";
import CategoryCard from "../components/CategoryCard";
import BackGround from "../components/BackGround";


const MainPage = () => {

  return (
    <Container>
      <MainBenner>
        <SideBar />
        <HeaderComponent />
        <Dropdown />
      </MainBenner>
      <BackGround>
        <MainContainer>
          <ViewContainer>
            <ViewButton>전체 조각 보러가기</ViewButton>
            <MainRightViewContainer users={["user1","user2","user3","user4","user5","user6","user7","user8"]}/>
          </ViewContainer>
          <CategoryContainer>
            <CategoryText1>L:nk</CategoryText1>
            <CategoryText2>highlight</CategoryText2>
            <CategoryCard category="카테고리1" colorKey="purple" />
            <CategoryCard category="카테고리2" colorKey="pink"/>
            <CategoryCard category="카테고리3" colorKey="red"/>
            <CategoryCard category="카테고리4" colorKey="black"/>
            <DayCard targetDate="2025-01-05"/>
          </CategoryContainer>
        </MainContainer>
      </BackGround>
    </Container>
  );
};

export const Container = styled.div`
width: 1440px;
position: relative;
/* height: 813.45px; */
/* border: 10px solid black; */
`;

export const MainBenner = styled.div`
`;

const MainContainer = styled.div`
top:82px;
margin-left: 82px;
margin-right: 82px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`;

const ViewContainer = styled.div`
width:100%;
height: 440px;
/* border: 1px solid black; */
display: flex;
align-items: center;
/* justify-content: space-between; */
text-align: center;
flex-direction: column;
position: relative; /* 자식의 절대 위치 기준을 설정 */
`;


const ViewButton = styled.div`
/* border: 1px solid black; */
display: flex;
align-items: center;
font-family: "Product Sans", sans-serif;
  font-size: 20px; /* 글자 크기 */
  text-align: center; /* 텍스트 정렬 */
  justify-content: center;
  align-items: center;   
color: #ffffff;
width: 217px;
height: 48px;
flex-shrink: 0;
border-radius: 20px;
background: #5BA8FB;
position: absolute;
top: 102px;
`;


const CategoryContainer = styled.div`
padding-bottom: 20px;
width:100%;
height: 332px;
/* border: 1px solid black; */
display: flex;
/* align-items: center; */
justify-content: space-between;
text-align: center;
display: flex;
  align-items: flex-end; /* 내용물을 하단에 정렬 */
  position: relative;
`;

export const CategoryText1 = styled.div`
color: #040404;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 100% */
  position: absolute;
  top:0px;
  left:0px;
  border-radius: 20px;
background: #FFF;
height: 50px;
flex-shrink: 0;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`;

export const CategoryText2 = styled.div`
color: #040404;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 100% */
  position: absolute;
  top:0px;
  left:52px;
  border-radius: 20px;
border: 1px solid #AFB8C1;
background: #FFF;
width: 127px;
height: 48px;
flex-shrink: 0;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`;

export default MainPage;