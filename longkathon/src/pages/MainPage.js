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
// axios import
import { getPieceAPI } from "../API/Piece.js"; // 적절한 경로로 수정

const MainPage = () => {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState([]); // 전체 데이터 저장 상태
  const [filteredPieces, setFilteredPieces] = useState([]); // 새로 생성된 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const userId = 1; // 예시로 1을 사용

  useEffect(() => {
    const fetchPieceData = async () => {
      try {
        setLoading(true);
        const response = await getPieceAPI(userId);
        const fetchedData = response.data;
        console.log("Fetched pieces:", fetchedData);

                fetchedData.forEach((item, index) => {
          console.log(`Piece #${index + 1}:`, item);
        });
        
        // 전체 데이터 저장
        setPieces(fetchedData);
        // 초기화: 모든 pieceId를 recentPieceIds에 추가
        if (fetchedData.length > 0) {
          // 최근 데이터를 filteredPieces에 저장 (배열의 마지막 인덱스)
          setFilteredPieces([fetchedData[fetchedData.length - 1]]);
        }
      } catch (error) {
        console.error("Error fetching piece data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPieceData(); // 데이터 fetch 실행
  }, [userId]);

  const handleConnectCategory = () => {
    navigate("/category");
  };

  // `StartDay`, `StartMonth`, `StartYear`로 `targetDate`를 포맷팅
  const formatDate = (day, month, year) => {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
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
            <MainRightViewContainer
              users={filteredPieces.map((piece) => ({
                title: piece.title || '제목 없음', // 제목이 없을 경우 "제목 없음"
                date: formatDate(
                  piece.startYear || 0,
                  piece.startMonth || 0,
                  piece.startDay || 0
                ),
                memberNames: piece.memberNames || [], // 멤버가 없을 경우 빈 배열
              }))}
            />
          </ViewContainer>
          <CategoryContainer>
            <CategoryText1>L:nk</CategoryText1>
            <CategoryText2>highlight</CategoryText2>
            {!loading &&
              filteredPieces.map((piece, index) => {
                const targetDate = formatDate(
                  piece.startDay,
                  piece.startMonth,
                  piece.startYear
                );
                return (
                  <React.Fragment key={index}>
                    <CategoryCard
                      category={piece.title}
                      colorKey={piece.color}
                    />

                    <DayCard targetDate={targetDate} />
                  </React.Fragment>
                );
              })}
          </CategoryContainer>
        </MainContainer>
      </BackGround>
    </Container>
  );
};

export const Container = styled.div`
  overflow-y: scroll;
  height: 110vh;
`;

export const MainBenner = styled.div`
z-index: 2000px;
`;

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
