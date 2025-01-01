import React, { useEffect, useState } from "react";
import { Container, MainBenner } from "./MainPage";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import CategoryCard_Check from "../components/CategoryCard_Check";
import CategoryAddContainer from "../components/CategoryAddContainer";
import AlertManager from "../components/AlertManager";
import AlertManager_Delete from "../components/AlertManager_Delete";
import AddCategory from "../pages/AddCategory";
import { useMemo } from "react";

import { getCategoryAPI } from "../API/Category";

const AllCategoryPage = ({ Title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const openModal = () => setIsModalOpen(true);

  const closeModal = (newCategory) => {
    setIsModalOpen(false);
    if (newCategory) {
      setCategories((prevCategories) => [...prevCategories, newCategory]); // 새로운 카테고리 추가
    }
  };

  const [categoryCount, setCategoryCount] = useState(0); // 카테고리 카드 개수
  const [totalCount, setTotalCount] = useState(0); // 카운트의 총합
  const [selectedCategories, setSelectedCategories] = useState({}); // 선택된 카테고리 상태
  const [isButtonClicked, setIsButtonClicked] = useState(false); // New state for button click
  const [alertActive, setAlertActive] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // 삭제 경고 상태
  const [categoryToDelete, setCategoryToDelete] = useState(null); // 삭제할 카테고리

  useEffect(() => {
    if (totalCount === 4) {
      setAlertActive(true); // Alert 활성화...
    } else {
      setAlertActive(false); // Alert 비활성화...
    }
  }, [totalCount]);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const pieceId = 7; // pieceId를 실제 ID로 설정
        const data = await getCategoryAPI(pieceId);
        setCategories(data); // 서버에서 가져온 데이터를 상태로 설정
      } catch (error) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCategories();
  }, []);

  const activateAlert = () => {
    setAlertActive(true); // Alert 활성화
    setTimeout(() => setAlertActive(false), 300); // 3초 후 Alert 비활성화
  };

  // 이미지 매핑
  const colorNameMap = {
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

  const imageMap = {
    purple: require("../Image/CategoryPiece_Purple.png"),  // 이미지 경로 예시
    green: require("../Image/CategoryPiece_Green.png"),
    pink: require("../Image/CategoryPiece_Pink.png"),
    lightblue: require("../Image/CategoryPiece_LightBlue.png"),
    darkblue: require("../Image/CategoryPiece_DarkBlue.png"),
    black: require("../Image/CategoryPiece_Black.png"),
    orange: require("../Image/CategoryPiece_Orange.png"),
    red: require("../Image/CategoryPiece_Red.png"),
    white: require("../Image/CategoryPiece_White.png"),
  };

  const categoriesWithImages = useMemo(() => {
    return categories.map((item) => {
      const colorName = colorNameMap[item.color]; // 색상 이름으로 변환
      const backgroundImage = imageMap[colorName]; // 이미지 매핑
      return { ...item, backgroundImage }; // 새로운 데이터 구조 생성
    });
  }, [categories]); // `categories`가 변경될 때마다 재계산


  const handleDelete = (id) => {
    const category = categories.find((category) => category.id === id);
    setCategoryToDelete(category); // 삭제할 카테고리 저장
    setAlertActive(false); // "최대 4개 카테고리" 경고 비활성화
    setShowDeleteAlert(true); // 삭제 경고창 활성화
  };

  const confirmDelete = () => {
    // 삭제된 카테고리가 'isMarked' 상태인지 확인 후 'totalCount' 감소
    if (selectedCategories[categoryToDelete.id]) {
      setTotalCount((prevTotal) => prevTotal - 1); // 카운트 감소
    }
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryToDelete.id)
    );
    setShowDeleteAlert(false); // 경고창 닫기
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false); // 경고창 닫기
  };

  const handleCountChange = (change, id) => {
    setTotalCount((prevTotal) => prevTotal + change);
    setSelectedCategories((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (change > 0) {
        newSelected[id] = true; // 선택됨
      } else {
        delete newSelected[id]; // 선택 해제
      }
      return newSelected;
    });
  };

  const handleAddCard = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const getAddCardPosition = () => {
    // 카드가 4개씩 한 줄에 배치되므로, categoryCount에 맞춰 적절한 위치 계산
    const row = Math.floor(categoryCount / 4); // 한 줄에 4개의 카드
    const column = categoryCount % 4; // 4개씩 새 행에 추가되므로, 4로 나눈 나머지
    return { row, column };
  };

  const toggleButtonClick = () => {
    setIsButtonClicked((prev) => !prev); // Toggle button clicked state
  };

  // 페이지 스크롤 비활성화
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // 전체 페이지 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 전체 페이지 스크롤 활성화
    }
  }, [isModalOpen]);

  return (
    <AllPageContainer>
      {/* AddCategory 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <AddCategory buttons={categories} />
          </ModalContent>
        </ModalOverlay>
      )}
      {/* 삭제 경고창 */}
      <AlertManager_Delete
        triggerCondition={showDeleteAlert}
        onTrigger={() => setShowDeleteAlert(false)} // 경고창 닫을 때 초기화
        onDelete={confirmDelete} // 삭제 버튼 클릭 시 삭제 수행
        onCancel={cancelDelete} // onCancel 프롭을 전달
        backgroundImage={imageMap[categoryToDelete?.colorKey]}  // 해당 카테고리의 colorKey에 맞는 배경 이미지 전달
        message={`${categoryToDelete?.category} 카드를 삭제할까요?`} // 직접 전달된 메시지
        categoryToDelete={categoryToDelete} // 삭제할 카테고리 전달
      />
      {/* AlertManager: 최대 선택 개수 도달 시 경고 */}
      {!showDeleteAlert && (
        <AlertManager
          triggerCondition={alertActive}
          message="최대 4개 카테고리만 즐겨찾기 할 수 있습니다."
        />
      )}

      <MainBenner>
        <CategorySideBar />
        <HeaderComponent />
      </MainBenner>
      <AllCategoryContainer>
        <CategoryTitle>{Title}</CategoryTitle>
        <CustomCategoryText1>{totalCount}/4</CustomCategoryText1>
        <CustomCategoryText2>highlight</CustomCategoryText2>
        <CustomCategoryButton onClick={toggleButtonClick} clicked={isButtonClicked} alertActive={alertActive}>
          edit
        </CustomCategoryButton>
        <ContainerBox>
          <CategoryContainer>
            {categories.map((item) => (
              <CategoryCard_Check
                key={item.id}
                index={item.id}
                category={item.name} // AddCategory.js에서 입력한 이름
                colorKey={item.color} // AddCategory.js에서 선택한 색상
                backgroundImage={item.backgroundImage} // 이미지 전달
                totalCount={totalCount}
                isSelected={!!selectedCategories[item.id]}
                isDisabled={!selectedCategories[item.id] && totalCount >= 4}
                onCountChange={(change) => handleCountChange(change, item.id)}
                clicked={isButtonClicked}
                onDelete={() => handleDelete(item.id)}
                activateAlert={activateAlert}
              />
            ))}

            {/* </CategoryContainer> */}
            {/* AddContainer 렌더링: categoryCount가 8 미만일 때만 */}
            {categories.length < 8 && (
              <CategoryAddContainer_AddCard
                onClickHandler={handleAddCard} // 수정된 부분
                position={getAddCardPosition()}
                disabled={isButtonClicked}
              />
            )}
          </CategoryContainer>
        </ContainerBox>
      </AllCategoryContainer>
    </AllPageContainer>
  );
};

const CategorySideBar = styled(SideBar)``;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  pointer-events: auto; /* 모달 배경 클릭 가능 */
  z-index: 300;
`;

const ModalContent = styled.div`
  max-height: 95%; /* 모달 내용의 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  background: red; /* 모달 배경색 */
  border-radius: 20px; /* 모달 모서리 둥글게 */
`;

const AllPageContainer = styled(Container)`
  background: ${(props) => (props.$highlight ? "rgba(4, 4, 4, 0.6)" : "transparent")};
  pointer-events: ${(props) => (props.$highlight ? "none" : "auto")};
`;

const CategoryAddContainer_AddCard = styled(CategoryAddContainer)`
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  border-radius: 8px;
  position: absolute;
  top: 1000px;
  left: ${(props) => props.position.column * 265 + "px"};
`;

const CustomCategoryText1 = styled.div`
  position: absolute;
  top: 124px;
  left: 0px;
  font-size: 20px;
  font-weight: 700;
  color: #040404;
`;

const CustomCategoryText2 = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  position: absolute;
  top: 114px;
  left: 52px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
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
  z-index: 200;

  &:hover {
    background: #5ba8fb;
    border: solid 1px #afb8c1;
  }
`;

const AllCategoryContainer = styled.div`
  position: relative;
  top: 0px;
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
  color: rgba(4, 4, 4, 1);
  background: linear-gradient(149deg, rgba(240, 248, 255, 0.7) 0.77%, rgba(242, 241, 248, 0.7) 99.23%);
  position: absolute;
  top: 36px;
  font-family: Inter;
  font-size: 26px;
  font-weight: 700;
  line-height: 26px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
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

const CategoryCard = styled.div`
`;
const ContainerBox = styled.div`
  position: relative;
  width: 100%;
  top: 188px;
  height: 614px;
`;

export default AllCategoryPage;
