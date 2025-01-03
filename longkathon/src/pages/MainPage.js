import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import DayCard from "../components/DayCard";
import MainRightViewContainer from "../components/MainRightViewContainer";
import CategoryCard from "../components/CategoryCard";
import BackGround from "../components/BackGround";
import PieceMap from "../components/PieceMap";
// axios import
import { getPieceAPI } from "../API/Piece.js"; // 적절한 경로로 수정

const MainPage = () => {
  const { pieceId } = useParams(); // URL 파라미터에서 pieceId를 받기

  // 컴포넌트가 렌더링될 때 pieceId 값을 콘솔에 출력
  useEffect(() => {
    console.log("Received pieceId from URL:", pieceId);
  }, [pieceId]);  // pieceId가 변경될 때마다 출력

  // useEffect(() => {
  //   if (pieceData) {
  //     console.log("수신한 데이터:", pieceData);
  //   } else {
  //     console.warn("전달받은 데이터가 없습니다.");
  //   }
  // }, [pieceData]);

  const navigate = useNavigate();
  const [filteredPieces, setFilteredPieces] = useState([]); // 새로 생성된 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const userId = 2; // 예시로 1을 사용

  useEffect(() => {
    const fetchPieceData = async () => {
      if (!pieceId) {
        console.warn("pieceId가 없습니다.");
        return;
      }

      try {
        setLoading(true); // 로딩 시작
        const response = await getPieceAPI(userId); // API 요청

        console.log("API 응답:", response); // 응답 콘솔 출력

        // pieceId와 일치하는 데이터만 필터링
        console.log("Comparing pieceId:", pieceId); // pieceId 콘솔 출력

        const filteredData = response.filter(item => item.pieceId === parseInt(pieceId)); // pieceId 비교 시 숫자로 변환

        console.log("Filtered data:", filteredData); // 필터링된 데이터 콘솔 출력

        if (filteredData.length === 0) {
          console.warn("일치하는 pieceId가 없습니다.");
        } else {
          setFilteredPieces(filteredData); // 필터링된 데이터 상태 업데이트
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error); // 오류 처리
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchPieceData(); // 데이터 요청
  }, [userId, pieceId]); // userId와 pieceId가 변경될 때마다 실행


  const handleConnectCategory = () => {
    navigate(`/piece/${pieceId}/category`);
  };

  // `StartDay`, `StartMonth`, `StartYear`로 `targetDate`를 포맷팅
  const formatDate = (day, month, year) => {
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  // categories가 없으면 빈 배열로 처리하고, 4개의 CategoryCard를 항상 표시
  const categoriesToDisplay = filteredPieces.length > 0
    ? filteredPieces[0].categories || [] // filteredPieces가 있으면 그 첫 번째 항목의 categories 사용
    : [];

  // 기본 4개 항목, categories 데이터가 부족하면 기본값으로 채운다
  const defaultCategories = ["", "", "", ""]; // 기본 4개 항목

  // categories 데이터가 부족하면 defaultCategories로 채운다
  const categoriesToRender = [...categoriesToDisplay, ...defaultCategories].slice(0, 4); // 항상 4개만 표시

  const backgroundColor = filteredPieces.length > 0 ? filteredPieces[0].color : null;

  console.log("BackGround color:", backgroundColor);

  return (
    <PageContainer>
      <Container>
        <MainBenner>
          <SideBar />
          <HeaderComponent />
        </MainBenner>
        <BackGround color={backgroundColor} />
        <MainContainer>
          <ViewContainer>
            <PieceMapWrapper>
              <PieceMap pieceId={pieceId}/>
            </PieceMapWrapper>
            <ViewButton onClick={handleConnectCategory}>
              전체 조각 보러가기
            </ViewButton>
            <MainRightViewContainer
              users={
                filteredPieces.length > 0
                  ? filteredPieces.map((piece) => ({
                    title: piece.title || "제목 없음",
                    startYear: piece.startYear || "0000",
                    startMonth: piece.startMonth || "01",
                    startDay: piece.startDay || "01",
                    endYear: piece.endYear || "0000",
                    endMonth: piece.endMonth || "01",
                    endDay: piece.endDay || "01",
                    memberNames: piece.memberNames || [],
                  }))
                  : []
              }
            />
          </ViewContainer>
          <CategoryContainer>
            <CategoryText1>L:nk</CategoryText1>
            <CategoryText2>highlight</CategoryText2>
            {!loading &&
              categoriesToRender.map((category, index) => {
                return (
                  <React.Fragment key={index}>
                    <CategoryCard
                      category={category}
                      colorKey={"#5ba8fb"} // colorKey는 고정된 색상 또는 데이터에서 가져올 수 있음
                    />
                  </React.Fragment>
                );
              })}
            {!loading &&
              filteredPieces.map((piece, index) => {
                const targetDate = formatDate(
                  piece.startDay,
                  piece.startMonth,
                  piece.startYear
                );
                return (
                  <React.Fragment key={index}>
                    <DayCard targetDate={targetDate} />
                  </React.Fragment>
                );
              })}
          </CategoryContainer>
        </MainContainer>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
position: relative;
top:60px;
`;

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
/* border:1px solid black; */
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
  top: 140px;
  left: 0;
  transform: translate(0, -50%);
  margin-top: 20px;
`;

export default MainPage;