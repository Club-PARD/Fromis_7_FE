import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import Dropdown from "../components/CategoryButton";
import DayCard from "../components/DayCard";
import MainRightViewContainer from "../components/MainRightViewContainer";
import CategoryCard from "../components/CategoryCard";
import BackGround from "../components/BackGround";
import PieceMap from "../components/PieceMap";

const generateRandomData = () => {
  const colors = ["purple", "pink", "red", "black", "blue", "green"];
  const users = Array.from({ length: 8 }, (_, i) => `user${Math.ceil(Math.random() * 100)}`);
  const categories = Array.from({ length: 4 }, (_, i) => ({
    category: `카테고리${i + 1}`,
    colorKey: colors[Math.floor(Math.random() * colors.length)],
  }));

  return { users, categories };
};

const MainPage = () => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(generateRandomData());
  const [pastData, setPastData] = useState([]);
  const [futureData, setFutureData] = useState([]);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(false);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에서 추가 스크롤
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }

    if (scrollTop === 0) {
      // 페이지 시작에서 추가 스크롤
      setIsAtStart(true);
    } else {
      setIsAtStart(false);
    }
  };

  useEffect(() => {
    const updateData = (direction) => {
      if (direction === "down" && isAtEnd) {
        // 아래 스크롤: 다음 데이터 표시
        if (futureData.length > 0) {
          const nextFuture = futureData.shift();
          setPastData([...pastData, currentData]);
          setCurrentData(nextFuture);
          setFutureData([...futureData]);
        } else {
          const newData = generateRandomData();
          setPastData([...pastData, currentData]);
          setCurrentData(newData);
        }
      }

      if (direction === "up" && isAtStart) {
        // 위 스크롤: 이전 데이터 표시
        if (pastData.length > 0) {
          const lastPast = pastData.pop();
          setFutureData([currentData, ...futureData]);
          setCurrentData(lastPast);
          setPastData([...pastData]);
        }
      }
    };

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        updateData("down");
      } else if (event.deltaY < 0) {
        updateData("up");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isAtEnd, isAtStart, currentData, pastData, futureData]);

  const handleConnectCategory = () => {
    navigate("/category");
  };

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
            <PieceMapWrapper>
              <PieceMap />
            </PieceMapWrapper>
            <ViewButton onClick={handleConnectCategory}>
              전체 조각 보러가기
            </ViewButton>
            <MainRightViewContainer users={currentData.users} />
          </ViewContainer>
          <CategoryContainer>
            <CategoryText1>L:nk</CategoryText1>
            <CategoryText2>highlight</CategoryText2>
            {currentData.categories.map((cat, index) => (
              <CategoryCard key={index} category={cat.category} colorKey={cat.colorKey} />
            ))}
            <DayCard targetDate="2025-01-05" />
          </CategoryContainer>
        </MainContainer>
      </BackGround>
    </Container>
  );
};

export const Container = styled.div`
/* border:10px solid black; */
  overflow-y: scroll;
  height: 110vh;
`;

export const MainBenner = styled.div``;

const MainContainer = styled.div`
  top: 82px;
  margin-left: 82px;
  margin-right: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ViewContainer = styled.div`
  width: 100%;
  height: 440px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;
`;

const ViewButton = styled.div`
  display: flex;
  align-items: center;
  font-family: "Product Sans", sans-serif;
  font-size: 20px;
  text-align: center;
  justify-content: center;
  color: #ffffff;
  width: 217px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #5ba8fb;
  position: absolute;
  top: 102px;
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const CategoryContainer = styled.div`
  padding-bottom: 20px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  align-items: flex-end;
  position: relative;
`;

export const CategoryText1 = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 20px;
  background: #fff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CategoryText2 = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 0px;
  left: 52px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  width: 127px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PieceMapWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  margin-top: 20px;
`;

export default MainPage;
