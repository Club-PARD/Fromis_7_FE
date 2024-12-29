import React from "react";
import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";

import BackGround from "../Image/DetailBackground.png";

const DetailPage = () => {
    return (
        <Container>
            <MainBenner>
                <HeaderComponent />
            </MainBenner>
            <MainContainer>
                <InfoContainer>
                    <h1>Info Container</h1>
                </InfoContainer>
                <MemoContainer>
                    <h1>Memo Container</h1>
                </MemoContainer>
            </MainContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
`;

const MainBenner = styled.div`
    width: 100%;
    border: 1px solid black;
`;

const MainContainer = styled.div`
    width: 1280px;
    height: 720px;
    display: flex; /* Flexbox 활성화 */
    align-items: flex-start; /* 자식 요소를 상단 정렬 */
    justify-content: flex-start; /* 자식 요소를 왼쪽 정렬 */
    gap: 20px;
    border-radius: 20px;
    border: 1px solid black;
    background-image: url(${BackGround});
    background-position: center;
    background-size: cover;
`;


const InfoContainer = styled.div`
    width: 519px;
    height: 545px;
    margin-top: 148px; /* 오른쪽 여백 */
    margin-left: 109px;
    border-radius: 20px;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.9);
    
`;

const MemoContainer = styled.div`
    width: 519px;
    height: 362px;
    margin-top: 148px; /* 상단 여백 */
    border-radius: 20px;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.9);
`;

export default DetailPage;
