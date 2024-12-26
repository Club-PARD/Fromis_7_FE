import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/HeaderComponent";
import SideBar from "../components/SideBar";

const EmptyMainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
        <CategoryFile src={require("../Image/CategoryFile.png")} alt="file-image" />
        <ImageContainer>
          <CenterImage src={require("../Image/MainIcon.png")} alt="centered-image" />
          <Title>카테고리가 생성될 때마다 조각을 연결해요!!</Title>
          <CategotyTitle>Categories: </CategotyTitle>
          <AddButton onClick={openModal}>
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
              colors="primary:#AFB8C1,secondary:#FF5733"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          </AddButton>
        </ImageContainer>
      </MainContent>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>


            {/* 약속 제목 */}
            <ModalGroup>
              <Label>약속 제목: </Label>
              <Input type="text" placeholder="약속 제목을 입력해주세요" />
            </ModalGroup>

            {/* 약속 날짜 */}
            <ModalGroup>
                <Label>약속 날짜: </Label>
                <DateField>
                    <Input placeholder="년도" />
                    <Input placeholder="월" />
                    <Input placeholder="일" />
                    <Dash>-</Dash>
                    <Input placeholder="년도" />
                    <Input placeholder="월" />
                    <Input placeholder="일" />
                </DateField>
            </ModalGroup>

            {/* 약속 멤버 */}
            <ModalGroup>
              <Label>약속 멤버: </Label>
              <DateField>
                <Input placeholder="예) 김링크" />
              </DateField>
            </ModalGroup>

            {/* 하단 버튼 */}
            <ModalActions>
              <Button>취소</Button>
              <Button primary>저장</Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

// 스타일 정의
const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const SideBarContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 10;
`;

const CategoryFile = styled.img`
  position: absolute;
  top: 172px;
  left: 240px;
  width: 217px;
  height: 260px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CenterImage = styled.img`
  width: 467px;
  height: auto;
  border-radius: 12px;
`;

const Title = styled.div`
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

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CategotyTitle = styled.div`
  position: absolute;
  top: 190px;
  left: 260px;
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
`;

const AddButton = styled.div`
  position: absolute;
  width: 133.945px;
  height: 133.945px;
  left: 305px;
  top: 270px;
  transform: rotate(-45deg);
  flex-shrink: 0;
  cursor: pointer;
`;

const Dash = styled.div`
    display: flex;
    font-size: 20px;
    font-color: #AFB8C1;
`;

// 모달 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
    width: 1110px;
    height: 711px;
    flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  text-align: left;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* 반응형 스타일 */
  @media (max-width: 768px) {
    width: 90%; /* 화면의 90% 너비 */
    height: auto; /* 높이를 자동으로 조정 */
    padding: 20px;
  }
`;

const ModalGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #040404;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #afb8c1;
  padding: 0 10px;
  font-size: 16px;
  color: #555;

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    height: 35px;
    font-size: 14px;
  }
`;

const DateField = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const ModalActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.primary
      ? `
      background-color: #3597ff;
      color: #fff;
    `
      : `
      background-color: #e0e0e0;
      color: #555;
    `}

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

export default EmptyMainPage;
