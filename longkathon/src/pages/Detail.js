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
                <MainBackGround src={BackGround} alt="background" />
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 20px;
    border: 1px solid black;
    overflow: hidden; /* 이미지가 컨테이너를 넘지 않도록 설정 */
`;

const MainBackGround = styled.img`
`;

export default DetailPage;
