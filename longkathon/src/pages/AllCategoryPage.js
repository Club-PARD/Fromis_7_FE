import React, { useState } from "react";
import { Container, MainBenner } from "./MainPage";
import SideBar from "../components/SideBar";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import CategoryCard_Check from "../components/CategoryCard_Check";

const AllCategoryPage = ({ Title }) => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0); // 카운트의 총합
  const [selectedCategories, setSelectedCategories] = useState({}); // 선택된 카테고리 상태

  const handleCountChange = (change, index) => {
    setTotalCount((prevTotal) => {
      const newTotal = prevTotal + change;

      // 디버깅 로그
      console.log("Change:", change, "Previous Total:", prevTotal, "New Total:", newTotal);

      // 선택 상태 업데이트
      setSelectedCategories((prevSelected) => {
        const newSelected = { ...prevSelected };
        if (change > 0) {
          newSelected[index] = true; // 선택됨
        } else {
          delete newSelected[index]; // 선택 해제
        }
        return newSelected;
      });

      return newTotal;
    });
  };

  const handleAddCard = () => {
    if (categoryCount < 8) {
      setCategoryCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <Container>
      <MainBenner>
        <SideBar />
        <HeaderComponent />
      </MainBenner>
      <AllCategoryContainer>
        <CategoryTitle>{Title}</CategoryTitle>
        <CustomCategoryText1>{totalCount}/4</CustomCategoryText1>
        <CustomCategoryText2>highlight</CustomCategoryText2>
        <CustomCategoryText3>edit</CustomCategoryText3>
        <CategoryContainer>
          {Array.from({ length: categoryCount }).map((_, index) => (
            <CategoryCard_Check
              key={index}
              index={index}
              category={`카테고리${index + 1}`}
              colorKey="purple"
              totalCount={totalCount}
              isSelected={!!selectedCategories[index]} // 선택 상태 전달
              isDisabled={!selectedCategories[index] && totalCount >= 4} // 선택되지 않았고 totalCount가 4 이상이면 비활성화
              onCountChange={(change) => handleCountChange(change, index)} // 카운트 변경 함수 전달
            />
          ))}
        </CategoryContainer>
        <AddButton onClick={handleAddCard}>+</AddButton>
      </AllCategoryContainer>
    </Container>
  );
};

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
  line-height: 20px; /* 100% */
  position: absolute;
  top: 0px;
  left: 52px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  width: 127px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 114px;
`;

const CustomCategoryText3 = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
  position: absolute;
  top: 0px;
  left: 52px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  width: 127px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 114px;
  left: 887px;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #4caf50;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #45a049;
  }
`;

const AllCategoryContainer = styled.div`
  position: relative;
  border: 1px solid black;
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
  opacity: 0.7;
  background: linear-gradient(149deg, #f0f8ff 0.77%, #f2f1f8 99.23%);
  position: absolute;
  top: 36px;
  color: #040404;
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
  border: 1px solid black;
  width: 100%;
  position: absolute;
  top: 188px;
  height: 614px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
`;

export default AllCategoryPage;
