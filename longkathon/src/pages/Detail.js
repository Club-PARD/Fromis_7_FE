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
                <CategoryRow>
                    <CategoryBox/>
                    <TitleButtonBox>
                        <Title>categories:</Title>
                        <CategoryButton>숙소</CategoryButton>
                    </TitleButtonBox>
                    <EditButton>Edit</EditButton>
                </CategoryRow>
                <InfoContainer>
                    <InputLabel>URL:</InputLabel>
                    <InputBox placeholder="http://fromis_7.link" />
                    <ImageBox>여기는 사진 입니다</ImageBox>
                    <InputBox placeholder="숙소 이름 여기에..." />
                </InfoContainer>
                <MemoContainer>
                    <MemoLabel>메모</MemoLabel>
                    <InputMemo placeholder = "메모를 입력해주세요" />
                </MemoContainer>
            </MainContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
`;

const MainBenner = styled.div`
    width: 100%;
    border: 1px solid black;
`;

const MainContainer = styled.div`
    width: 1280px;
    height: 720px;
    margin-top: 36px;
    display: grid; 
    grid-template-areas:
        "category category close"
        "info memo memo"
        "info memo memo";
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr auto;
    gap: 20px;
    border-radius: 20px;
    border: 1px solid black;
    background-image: url(${BackGround});
    background-size: cover;
    background-position: center;
`;

const CategoryRow = styled.div`
    grid-area: category;
    display: flex;
    align-items: center;
    margin-left: 109px;
    margin-top: 40px;
`;

const CategoryBox = styled.div`
    width: 108px;
    height: 88px;
    border-radius: 20px;
    border: 1px solid black;
    background: #FFF;
    margin-right: 16px;
`;

const TitleButtonBox = styled.div`
    height: 90px; 
    margin-right: 696px;
`;

const Title = styled.div`
    color: #040404;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-bottom: 8px;f
`;

const InputLabel = styled.div`
    color: #040404;
    font-family: "Product Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-left: 40px;
    margin-top: 42px;
    margin-bottom: 8px;
`;

const InputMemo = styled.textarea`
    width: 439px;
    height: 256px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    margin-left: 35px;
    font-size: 14px; 
    font-family: "Product Sans", sans-serif; 
`;

const EditButton = styled.button`
    width: 100px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid #AFB8C1;
    background: #FFF;
    color: #040404;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    padding: 0px;
`;

const CategoryButton = styled.button`
    width:77px;
    height: 32px;
    background-color: #3597ff;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    color: #FFF;
    text-align: center;
    font-family: "Product Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 100% */
`;

const InfoContainer = styled.div`
    width: 519px;
    height: 545px;
    margin-left: 109px;
    grid-area: info;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid black;
    background: #FFF;
`;

const MemoContainer = styled.div`
    width: 519px;
    height: 362px;
    grid-area: memo;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid black;
    background: #FFF;
`;

const MemoLabel = styled.div`
    color: #040404;
    font-family: "Product Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-left: 42px;
    margin-top: 42px;
    margin-bottom: 8px;
`;

const InputBox = styled.input`
    width: 439px;
    height: 47px;
    border: 1px solid #5BA8FB;
    border-radius: 20px;
    font-size: 14px;
    margin-left: 40px;
`;

const ImageBox = styled.div`
    width: 439px;
    height: 317px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    margin-left: 40px;
    margin-top:20px;
    margin-bottom: 20px;
`;


export default DetailPage;
