import styled from "styled-components";
import { useState } from "react";

import XRed from "../Image/X_red.png";
import XOrange from "../Image/X_orange.png";
import XGreen from "../Image/X_green.png";
import XBlue from "../Image/X_blue.png";
import XSkyblue from "../Image/X_skyblue.png";
import XPurple from "../Image/X_purple.png";
import XPink from "../Image/X_pink.png";
import XGray from "../Image/X_gray.png";
import XBlack from "../Image/X_black.png";

const colors = [
    { color: "#EA7E7A", image: XRed },
    { color: "#FBA96F", image: XOrange },
    { color: "#9ED4B6", image: XGreen },
    { color: "#5BA8FB", image: XSkyblue },
    { color: "#002ED1", image: XBlue },
    { color: "#D9A9ED", image: XPink },
    { color: "#927CFF", image: XPurple },
    { color: "#BDBDBD", image: XGray },
    { color: "#424242", image: XBlack },
];

function ColorPalette({ selectedColor, onChange }) {

    const [selectedImage, setSelectedImage] = useState(XBlue); 

    const handleColorClick = (index) => {
        onChange(colors[index].color); // 부모 상태 업데이트
        setSelectedImage(colors[index].image); // 이미지 상태 업데이트
    };

    return (
        <Container>
            <Title>약속 조각:</Title>
            <Content>
                <LeftBox>
                    <XShape src={selectedImage} alt="X Shape" />
                </LeftBox>
                <ColorWrapper>
                    <ColorRow>
                        {colors.slice(0, 5).map((item, index) => (
                            <ColorContainer
                                key={index}
                                onClick={() => handleColorClick(index)}
                            >
                                {selectedColor === index && <ColorOuterCircle color={item.color} />}
                                <ColorCircle color={item.color} />
                            </ColorContainer>
                        ))}
                    </ColorRow>
                    <ColorRow>
                        {colors.slice(5).map((item, index) => (
                            <ColorContainer
                                key={index + 5}
                                onClick={() => handleColorClick(index + 5)}
                            >
                                {selectedColor === index + 5 && <ColorOuterCircle color={item.color} />}
                                <ColorCircle color={item.color} />
                            </ColorContainer>
                        ))}
                    </ColorRow>
                </ColorWrapper>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    max-width: 1060px;
    // margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    font-family: "Product Sans", sans-serif;
`;

const Content = styled.div`
    display: flex;
    gap: 28px;
    align-items: center;
`;

const LeftBox = styled.div`
    width: 153px;
    height: 124px;
    border: 1px solid #dcdcdc;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const XShape = styled.img`
    width: 304px; //크기 수정 필요!!!//
    height: 170px;
    object-fit: contain;
    border-radius: 20%;
`;

const ColorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

const ColorRow = styled.div`
    display: flex;
    gap: 28px;
`;

const ColorContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ColorOuterCircle = styled.div`
    width: 56px;
    height: 56px;
    position: absolute;
    border-radius: 50%;
    border: 2px solid ${(props) => props.color};
    box-sizing: border-box;
`;

const ColorCircle = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    cursor: pointer;
`;

export default ColorPalette;
