import React from "react";
import styled from "styled-components";
import Header from "../components/HeaderComponent";
import SideBar from "../components/SideBar";

const EmptyMainPage = () => {
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
          <AddButton>
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
              colors="primary:#AFB8C1,secondary:#FF5733"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
          </AddButton>
        </ImageContainer>
      </MainContent>
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
`;

export default EmptyMainPage;
