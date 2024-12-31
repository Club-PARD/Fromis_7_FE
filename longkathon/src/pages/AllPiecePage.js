import React, { useEffect, useState } from "react";
import { Container } from "./MainPage";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import AlertManager_Delete from "../components/AlertManager_Delete";
import Dropdown from "../components/CategoryButton";
import PieceCard from "../components/PieceCard";
import { deletePieceAPI, getPieceAPI } from "../API/Piece";


const AllPiecePage = () => {
  const [categories, setCategories] = useState([]); // 카테고리 상태
  const [selectedCategories, setSelectedCategories] = useState({}); // 선택된 카테고리 상태
  const [isButtonClicked, setIsButtonClicked] = useState(false); // New state for button click
  const [alertActive, setAlertActive] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // 삭제 경고 상태
  const [titleToDelete, setitlegoryToDelete] = useState(null); // 삭제할 카테고리

  const activateAlert = () => {
    setAlertActive(true); // Alert 활성화
    setTimeout(() => setAlertActive(false), 300); // 3초 후 Alert 비활성화
  };

  // 색상 코드와 이미지 키 매핑
  const colorNameMap = {
    '#EA7E7A': 'red',
    '#FBA96F': 'orange',
    '#5BA8FB': 'ligtblue',
    '#002ED1': 'darkblue',
    '#9ED4B6': 'green',
    "#927CFF": "purple",
    "#D9A9ED": "pink",
    "#FBA96F": "orange",
    '#BDBDBD': 'gray',
    '#424242':'black',
  };

  //이미지 매핑
  const imageMap = {
    purple: require('../Image/X_purple.png'),
    green: require('../Image/X_green.png'),
    pink: require('../Image/X_pink.png'),
    orange: require('../Image/X_orange.png'),
    lightblue: require('../Image/X_skyblue.png'),
    darkblue: require('../Image/X_blue.png'),
    black: require('../Image/X_black.png'),
    red: require('../Image/X_red.png'),
    gray: require('../Image/X_gray.png'),
  };

  const getColorKey = (colorCode) => {
    const colorName = colorNameMap[colorCode];

    return colorName || "purple"; // 기본값으로 purple
  };

  const handleDelete = (pieceId, pieceData) => {
    setAlertActive(false); // Alert 비활성화
    setitlegoryToDelete(pieceData); // 삭제할 데이터 설정
    setShowDeleteAlert(true); //
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false); // 경고창 닫기
  };

  const BackgroundImage = require('../Image/MainIcon.png'); // 배경 이미지 추가

  const toggleButtonClick = () => {
    setIsButtonClicked((prev) => !prev); // Toggle button clicked state
  };

  //get기능
  const fetchCategories = async () => {
    try {
      const response = await getPieceAPI(1); // 서버 API 엔드포인트

      if (response && Array.isArray(response)) {
        setCategories([...response]); // 새로운 배열로 상태 업데이트
      } else {
        console.error("Fetched data is not in expected format.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // 컴포넌트가 마운트되면 서버에서 데이터 가져옴
  }, []);


  useEffect(() => {
  }, [categories]); // categories가 변경될 때마다 실행되는 useEffect

  //delete기능
  const confirmDelete = async () => {
    if (titleToDelete && titleToDelete.pieceId) {
      try {
        // Call the API to delete the piece
        await deletePieceAPI(titleToDelete.pieceId);

        // Remove the deleted category from the state
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.pieceId !== titleToDelete.pieceId)
        );
      } catch (error) {
        console.error("Error deleting piece from the server:", error);
      }

      setShowDeleteAlert(false); // Close the delete alert
    } else {
      console.error("titleToDelete is undefined or has no pieceId");
      setShowDeleteAlert(false); // Ensure the alert is closed even if there's an error
    }
  };

  return (
    <AllPageContainer >
      {/* 삭제 경고창 */}
      <AlertManager_Delete
        triggerCondition={showDeleteAlert}
        onTrigger={() => setShowDeleteAlert(false)} // 경고창 닫을 때 초기화
        onDelete={confirmDelete}
        onCancel={cancelDelete} // onCancel 프롭을 전달
        backgroundImage={imageMap[getColorKey(titleToDelete?.color)]}  // 해당 카테고리의 colorKey에 맞는 배경 이미지 전달
        message={`${titleToDelete?.title} 카드를 삭제할까요?`} // 직접 전달된 메시지
        titleToDelete={titleToDelete} // 삭제할 카테고리 전달
      />
      {/* 배경 이미지: categories.length가 0일 때만 표시 */}
      {categories.length === 0 && (
        <>
          <PageBackgroundImage src={BackgroundImage} alt="배경 이미지" />
          <BackgroundTitle>여행의 시작, 함께 소통의 조각을 생성해요!</BackgroundTitle>
        </>
      )}
      <CategorySideBar isButtonClicked={isButtonClicked} />
      <HeaderComponent isButtonClicked={isButtonClicked} />
      <Dropdown isButtonClicked={isButtonClicked} />
      <AllCategoryContainer>
        <CategoryTitle>다가올 <span className="Link">&nbsp;링크</span>를 확인 해보세요!</CategoryTitle>
        <CustomCategoryText1>L:nk</CustomCategoryText1>
        <CustomCategoryText2>pages</CustomCategoryText2>
        <CustomCategoryButton onClick={toggleButtonClick} clicked={isButtonClicked} alertActive={alertActive} >
          delete
        </CustomCategoryButton>
        <ContainerBox>
          {isButtonClicked && <ModalOverlayComponent toggleButtonClick={toggleButtonClick} />} {/* ModalOverlay가 활성화되었을 때만 보임 */}
          <CategoryContainer>
            {categories.map((item) => (
              <PieceCard
                key={item.pieceId}
                colorkey={getColorKey(item.color)}// 색상 전달
                clicked={isButtonClicked}
                onDelete={() => handleDelete(item.pieceId, item)}
                activateAlert={activateAlert}
                title={item.title}
                date={`${item.startYear}-${item.startMonth}-${item.startDay} - ${item.endYear}-${item.endMonth}-${item.endDay}`}
                members={item.memberNames}
              />
            ))}
          </CategoryContainer>
        </ContainerBox>
      </AllCategoryContainer>
    </AllPageContainer>
  );
};

const CategorySideBar = styled(SideBar)`

`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  pointer-events: auto; /* 모달 배경 클릭 가능 */
  z-index: 300;
`;

const ModalOverlayComponent = ({ toggleButtonClick }) => {
  return <ModalOverlay onClick={toggleButtonClick} />;
};

const AllPageContainer = styled(Container)`
  
`;

const CustomCategoryText1 = styled.div`
  position: absolute;
  top: 126px;
  left: 0px;
  font-size: 20px;
  font-weight: 700;
  color: #040404;
`;

const CustomCategoryText2 = styled.div`
  border-radius: 20px;
  background: linear-gradient(149deg, #F0F8FF 0.77%, #F2F1F8 99.23%);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  position: absolute;
  top: 114px;
  left: 52px;
  border: none;
  width: 127px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CustomCategoryButton = styled.button`
  color: ${(props) => (props.clicked ? "#fff" : "#040404")};
  background: ${(props) => (props.clicked ? "#5ba8fb" : "#fff")};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  border-radius: 20px;
  border: ${(props) => (props.clicked ? "none" : "1px solid #afb8c1")};
  width: 127px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 114px;
  left: 887px;
  cursor: pointer; /* 항상 클릭 가능 */
  transition: background-color 0.2s, color 0.2s;
  z-index: ${(props) => (props.clicked ? "330" : "100")};
  

  &:hover {
    background:#5ba8fb;
    border: solid 1px #afb8c1;
  }
`;



const AllCategoryContainer = styled.div`
  position: relative;
  top: 60px;
  margin-left: 210px;
  margin-right: 212px;
  height: 804px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CategoryTitle = styled.div`
  width: 412px;
  height: 88px;
  border-radius: 20px;
  background: linear-gradient(149deg, rgba(240, 248, 255, 0.7) 0.77%, rgba(242, 241, 248, 0.7) 99.23%);
  position: absolute;
  top: 36px;
  color: #3597FF;
text-align: center;
font-family: "Product Sans";
font-size: 26px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 100% */
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center; 
  
  .Link {
    color: #3597FF;
font-family: "Product Sans";
font-size: 26px;
font-style: normal;
font-weight: 700;
line-height: 26px;
}
`;

const CategoryContainer = styled.div`
  width: 100%;
  position: relative;
  height: 614px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-content: flex-start;
`;

const ContainerBox = styled.div`
  position: relative;
  width: 100%;
  top: 188px;
  height: 614px;
`;

const PageBackgroundImage = styled.img`
  position: absolute;
  top:263px;
  left:469px;
  width: 467px;
  height: auto;
  display: flex;
    justify-content: center;
    align-items: center;
  z-index: -1; /* 컨텐츠 뒤에 배경이 오도록 설정 */
  border-radius: 12px;
`;

const BackgroundTitle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #3597ff;
    font-family: "Product Sans Thin";
    font-size: 40px;
    font-style: normal;
    font-weight: 350;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 300;

    /* 반응형 스타일 */
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export default AllPiecePage;

