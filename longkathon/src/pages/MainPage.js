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
import { getCategoryAPI } from "../API/Category.js";

const MainPage = () => {
  const { pieceId } = useParams(); // URL 파라미터에서 pieceId를 받기

  const navigate = useNavigate();
  const [filteredPieces, setFilteredPieces] = useState([]); // 새로 생성된 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const userId = 2; // 예시로 1을 사용

  // pieceId 값에 따라 필터링된 데이터 요청
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
        const filteredData = response.filter(item => item.pieceId === parseInt(pieceId)); // pieceId 비교 시 숫자로 변환

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryAPI(pieceId);
        const filteredCategories = response.filter(category => category.isHighlighted);
        setCategoriesToRender(filteredCategories); // 상태 업데이트
        console.log('상태 업데이트 완료:', filteredCategories); // 상태로 설정된 데이터 확인
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };
    fetchCategories();
  }, []);


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



  const backgroundColor = filteredPieces.length > 0 ? filteredPieces[0].color : null;

  console.log("BackGround color:", backgroundColor);

  const [categoriesToRender, setCategoriesToRender] = useState([]); // 렌더링할 카테고리 상태

  // useEffect(() => {
  //   console.log('categoriesToRender 상태:', categoriesToRender); // 상태 업데이트 이후 값 확인
  // }, [categoriesToRender]);


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
              <PieceMap pieceId={pieceId} />
            </PieceMapWrapper>
            <ViewButton onClick={() => navigate(`/piece/${pieceId}/category`)}>
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
            {loading ? (
              <div>Loading...</div>
            ) : (
              // 부족한 부분을 null로 채운 확장된 배열 생성
              [...categoriesToRender, ...Array(4 - categoriesToRender.length).fill(null)].map((category, index) => {
                console.log(`렌더링되는 카테고리 ${index}:`, category); // 각 항목 확인
                if (category) {
                  // 실제 데이터가 있는 경우
                  return (
                    <CategoryCard
                      key={index}
                      category={category.name} // name 값을 전달
                      colorKey={category.color} // color 값을 전달
                    />
                  );
                } else {
                  // 데이터가 없는 경우
                  return (
                    <CategoryCard
                      key={index}
                      category={""} // 기본값으로 표시할 문자열
                      colorKey={""} // 기본 회색 색상
                    />
                  );
                }
              })
            )}
            {loading ? (
              <div>Loading...</div> // 로딩 중일 때 표시
            ) : (
              filteredPieces.map((piece, index) => {
                const targetDate = formatDate(
                  piece.startDay,
                  piece.startMonth,
                  piece.startYear
                );
                return (
                  <DayCard key={index} targetDate={targetDate} />
                );
              })
            )}
          </CategoryContainer>
        </MainContainer>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  top: 60px;
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
