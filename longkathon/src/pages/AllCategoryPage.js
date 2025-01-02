import React, { useEffect, useState } from "react";
import { Container } from "./MainPage";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import CategoryCard_Check from "../components/CategoryCard_Check";
import CategoryAddContainer from "../components/CategoryAddContainer";
import AlertManager from "../components/AlertManager";
import AlertManagerDelete from "../components/AlertManagerDelete";
import AddCategory from "../pages/AddCategory";
import { useMemo } from "react";

import { deleteCategoryAPI, getCategoryAPI } from "../API/Category";
import AlertManagerDeleteCategory from "../components/AlertManagerDeleteCategory";
import { getPieceAPI } from "../API/Piece";
import { useParams } from "react-router-dom";



const AllCategoryPage = () => {
  const { pieceIdCategory } = useParams(); // URL 파라미터에서 pieceId를 받기
  const [pieceTitle, setPieceTitle] = useState(""); // pieceTitle 상태 추가

    // pieceTitle을 가져오는 함수
    const fetchPieceTitle = async (pieceIdCategory) => {
      try {
        const categoryData = await getCategoryAPI(pieceIdCategory);
        const pieceTitle = categoryData.pieceTitle; // pieceTitle 추출
        setPieceTitle(pieceTitle); // pieceTitle 상태 업데이트
        console.log("Piece Title:", pieceTitle); // 로그로 출력
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

  // useEffect(() => {
  //   console.log("URL에서 가져온 ID:", pieceIdCategory);
  //   // 이 ID를 이용해 데이터를 가져오는 API 호출
  //   // 예: getPieceAPI(id);
  // }, [pieceIdCategory]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryPieces, setCategoryPieces] = useState([]); // 카테고리 상태
  const [categories, setCategories] = useState([]);
  const openModal = () => setIsModalOpen(true);

  const closeModal = (newCategory) => {
    console.log("모달 닫기");
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
        // const pieceId = 7; 

        const data = await getCategoryAPI(pieceIdCategory); //pieceId
        console.log("category",data);
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

  const categoriesWithImages = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    return categories.map((item) => {
      const colorName = colorNameMap[item.color] || "default"; // 기본값 설정
      const DeleteBackgroundColor = colorName; // 매핑된 색상 이름 사용
      const updatedItem = { ...item, DeleteBackgroundColor }; // 새로운 속성 추가
      return updatedItem;
    });
  }, [categories]);


  useEffect(() => { }, [categoriesWithImages]);


  const handleDelete = async (cateId) => {
    const categoryToBeDeleted = categoriesWithImages.find((category) => category.cateId === cateId);

    if (categoryToBeDeleted) {
      console.log("삭제하려는 카테고리:", categoryToBeDeleted);
      setCategoryToDelete(categoryToBeDeleted); // 삭제할 카테고리 상태에 저장
      setShowDeleteAlert(true); // 삭제 경고창 표시
    } else {
      console.error("삭제하려는 카테고리를 찾을 수 없습니다. cateId:", cateId);
    }
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      console.log("삭제를 확인한 카테고리:", categoryToDelete);

      try {
        await deleteCategoryAPI(categoryToDelete.cateId);
        console.log("서버에서 카테고리 삭제 성공:");

        // 상태 업데이트: 삭제된 카테고리 제거
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.cateId !== categoryToDelete.cateId)
        );
        console.log("카테고리 삭제 후 남은 목록:", categories); // 삭제 후 상태 확인
        // 상태 초기화
        setCategoryToDelete(null);
        console.log("categoryToDelete 상태 초기화:", null);
      } catch (error) {
        console.error("서버 삭제 요청 실패:", error);
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      console.error("삭제를 확인하려는 카테고리가 존재하지 않습니다.");
    }

    // 경고창 닫기
    setShowDeleteAlert(false);
    console.log("showDeleteAlert 상태:", false);
  };


  const cancelDelete = () => {
    console.log("삭제 취소된 카테고리:", categoryToDelete); // 삭제 취소 로그
    setCategoryToDelete(null); // 상태 초기화
    setShowDeleteAlert(false); // 경고창 닫기
    console.log("categoryToDelete 상태 초기화:", null);
    console.log("showDeleteAlert 상태:", false); // 상태 업데이트 확인
  };

  // const handleCountChange = async (change, id) => {
  //   setTotalCount((prevTotal) => prevTotal + change);
  //   setSelectedCategories((prevSelected) => {
  //     const newSelected = { ...prevSelected };
  //     if (change > 0) {
  //       newSelected[id] = true; // 선택됨
  //     } else {
  //       delete newSelected[id]; // 선택 해제
  //     }
  
  //     // 서버에 업데이트 요청 (isSelected와 isHighlighted 상태를 동기화)
  //     const categoryToUpdate = categories.find((category) => category.id === id);
  //     if (categoryToUpdate) {
  //       try {
  //         // 서버에 isHighlighted 상태 업데이트
  //         // await axios.put(`/api/categories/${categoryToUpdate.cateId}`, {
  //         //   isHighlighted: change > 0, // 선택되었으면 true, 아니면 false
  //         // });
  //         const response = { data: { cateId, isHighlighted } };
  //         console.log(`카테고리 ${categoryToUpdate.name}의 isHighlighted 상태가 변경되었습니다.`);
  //       } catch (error) {
  //         console.error("카테고리 상태 업데이트 실패:", error);
  //       }
  //     }
  
  //     return newSelected;
  //   });
  // };

  const handleCountChange = (change, id) => {
    setTotalCount((prevTotal) => prevTotal + change);
    setSelectedCategories((prevSelected) => {
      const newSelected = { ...prevSelected };
  
      // 카테고리 선택 상태 변경
      if (change > 0) {
        newSelected[id] = true; // 선택됨
      } else {
        delete newSelected[id]; // 선택 해제
      }
  
      // 카테고리 업데이트 (목데이터 처리)
      const categoryToUpdate = categories.find((category) => category.id === id);
      if (categoryToUpdate) {
        categoryToUpdate.isHighlighted = change > 0; // isHighlighted 상태 업데이트
        console.log(`카테고리 ${categoryToUpdate.name}의 isHighlighted 상태가 변경되었습니다.`);
      }
  
      return newSelected;
    });
  };
  
  
  const backgroundImage = require('../Image/MainIcon.png'); // 배경 이미지 추가

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


  useEffect(() => {
    console.log("showDeleteAlert 상태 변경:", showDeleteAlert);
    console.log("현재 categoryToDelete:", categoryToDelete);
  }, [showDeleteAlert, categoryToDelete]);

  const handleCardClick = () => {
    if (isButtonClicked) {
      // 카테고리 클릭 시 모달 활성화
      setIsModalOpen(true); // 모달 열기
    }
  };

  // const [pieceId, setPieceId] = useState(2); // pieceId 상태로 관리
  // // 2로 설정함

  const getPiece = async () => {
    try {

      const response = await getPieceAPI(2); // 서버 API 엔드포인트

      if (response && Array.isArray(response)) {

        response.forEach((item, index) => {
          console.log(`카테고리 ${index + 1}:`, item);
        });

        setCategoryPieces([...response]); // 새로운 배열로 상태 업데이트
      } else {
        console.error("Fetched data is not in expected format.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    console.log("컴포넌트 로드: 데이터 fetch 시작");
    getPiece(); // 컴포넌트가 마운트되면 서버에서 데이터 가져옴
  }, [pieceIdCategory]);

  useEffect(() => {
  }, [categories]); // categories가 변경될 때마다 실행되는 useEffect

  return (
    <AllPageContainer>
      {/* 삭제 경고창 */}
      {showDeleteAlert && (
        <AlertManagerDeleteCategory
          triggerCondition={showDeleteAlert}
          onDelete={confirmDelete} // 삭제 버튼 클릭 시 삭제 수행
          onCancel={cancelDelete} // 취소 버튼 클릭 시 경고창 닫기
          DeleteBackgroundColor={categoryToDelete ? categoryToDelete.DeleteBackgroundColor : ""}  // 삭제할 카테고리의 이미지 전달
          message={categoryToDelete ? `${categoryToDelete.name}` : ""}  // 삭제할 카테고리의 이름 전달
          categoryToDelete={categoryToDelete} // 삭제할 카테고리 전달
          clicked={isButtonClicked} // 카드를 클릭할 수 있는지 여부 설정
          onClick={() => handleCardClick()} // 카드 클릭 시 모달 열기
        />
      )}
      {/* AlertManager: 최대 선택 개수 도달 시 경고 */}
      {/* 최대 선택 개수 초과 경고 */}
      {!showDeleteAlert && alertActive && (
        <AlertManager
          triggerCondition={alertActive}
          message="최대 4개 카테고리만 즐겨찾기 할 수 있습니다."
        />
      )}

      {/* 배경 이미지: categories.length가 0일 때만 표시 */}
      {categories.length === 0 && (
        <>
          <BackgroundImage src={backgroundImage} alt="배경 이미지" />
          <BackgroundTitle>카테고리가 생성될 때마다 조각을 링크해요!</BackgroundTitle>
        </>
      )}
      <FixContainer>
        <CategorySideBar />
        <HeaderComponent isButtonClicked={isButtonClicked} />
      </FixContainer>
      <AllCategoryContainer>
        <CategoryTitle clicked={isModalOpen}>{pieceTitle}</CategoryTitle>
        <CustomCategoryText1>{totalCount}/4</CustomCategoryText1>
        <CustomCategoryText2>highlight</CustomCategoryText2>
        <CustomCategoryButton onClick={toggleButtonClick} clicked={isButtonClicked} alertActive={alertActive}>
          edit
        </CustomCategoryButton>
        <ContainerBox>
          {isButtonClicked && <ModalOverlayComponent toggleButtonClick={toggleButtonClick} />} {/* ModalOverlay가 활성화되었을 때만 보임 */}
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
                onDelete={handleDelete}
                activateAlert={activateAlert}
                cateId={item.cateId}
              />
            ))}

            {/* </CategoryContainer> */}
            <CategoryAddContainer_AddCard
              onClickHandler={handleAddCard} // 수정된 부분
              position={getAddCardPosition()}
            />
          </CategoryContainer>
        </ContainerBox>
      </AllCategoryContainer>
      {/* AddCategory 모달 */}
      {isModalOpen && (
        <ModalContainer>
          <ModalOverlay >
            <ModalContent>
              <AddCategory pieceTitle={pieceTitle} onClose={closeModal} />
            </ModalContent>
          </ModalOverlay>
        </ModalContainer>
      )}
    </AllPageContainer>
  );
};

const FixContainer = styled.div`
  `;

const CategorySideBar = styled(SideBar)`

`;

const ModalContainer = styled.div`
position: fixed;
width: 100%;
height: 2000px;
z-index: 900;
`;



const ModalOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  pointer-events: auto; /* 모달 배경 클릭 가능 */
  z-index: 200;
`;

const ModalOverlayComponent = ({ toggleButtonClick }) => {
  return <ModalOverlay onClick={toggleButtonClick} />;
};

const ModalContent = styled.div`
  position: fixed;
  top:0px;
  max-height: 95%; /* 모달 내용의 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  border-radius: 20px; /* 모달 모서리 둥글게 */
  z-index: 1100;
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
  right:0px;
  cursor: pointer; /* 항상 클릭 가능 */
  transition: background-color 0.2s, color 0.2s;
  z-index: 310;

  &:hover {
    background: #5ba8fb;
    border: solid 1px #afb8c1;
  }
`;

const AllCategoryContainer = styled.div`
/* border: 10px solid black; */
  position: relative;
  top: 80px;
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
  z-index:${(props) => (props.clicked ? "900" : "100")};
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

const BackgroundImage = styled.img`
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

export default AllCategoryPage;
