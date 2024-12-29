import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import Dropdown from "../components/CategoryButton";
import ModalAdd from "../components/ModalAdd";

const EmptyMainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        console.log("openModal 함수가 호출되었습니다."); // 콘솔 출력 추가
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("closeModal 함수가 호출되었습니다."); // 콘솔 출력 추가
        setIsModalOpen(false);
    };

    return (
        <PageWrapper>
            <Header />
            <Dropdown />
            <MainContent>
                <SideBarContainer>
                    <SideBar openModal={openModal} />
                </SideBarContainer>
                <ImageContainer>
                    <CenterImage src={require("../Image/MainIcon.png")} alt="centered-image" />
                    <Title>여행의 시작, 함께 링크해요!</Title>
                </ImageContainer>
            </MainContent>

            {/* ModalAdd 컴포넌트 사용 */}
            {isModalOpen && <ModalAdd closeModal={closeModal} />}
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

export default EmptyMainPage;
