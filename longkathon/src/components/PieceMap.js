import React, { useState } from "react";
import styled from "styled-components";
import PieceBox from "../Image/PieceBox.png";

import RedPiece from "../Image/RedPiece.png";
import OrangePiece from "../Image/OrangePiece.png";
import GreenPiece from "../Image/GreenPiece.png";
import BluePiece from "../Image/BlackPiece.png";
import SkyBluePiece from "../Image/SkybluePiece.png";
import PurplePiece from "../Image/PurplePiece.png";
import PinkPiece from "../Image/PinkPiece.png";
import GrayPiece from "../Image/GrayPiece.png";
import BlackPiece from "../Image/BlackPiece.png";
import NoPieceImage from "../Image/NoPiece.png";

const mockCategories = [
    // { id: 1, name: "Category 1" },
    // { id: 2, name: "Category 2" },
    // { id: 3, name: "Category 3" }, 
    { id: 4, name: "Category 4" }, 
    { id: 5, name: "Category 5" }, 
    { id: 6, name: "Category 6" },
    { id: 7, name: "Category 7" },
    { id: 8, name: "Category 8" },
    { id: 9, name: "Category 9" },
];
const calculateConnectedPosition = (index) => {
    // 퍼즐 조각이 연결되는 좌표 설정
    const positions = [
        { x: 43, y: 118 }, 
        { x: 76, y: 106 },  
        { x: 109, y: 94 }, 
        { x: 56.21, y: 151 },    
        { x: 89, y: 139 },   
        { x: 121.91, y: 126.86 },
        { x: 69.21, y: 185 },
        { x: 102, y: 172 },
        { x: 135, y: 160 },
    ];
      
    return positions[index] || { x: 0, y: 0 }; // 기본값
};

const PieceMap = () => {
    const [categories, setCategories] = useState(mockCategories); 

    const colors = [
        { color: "Red", image: RedPiece },
        { color: "Orange", image: OrangePiece },
        { color: "Green", image: GreenPiece },
        { color: "Blue", image: BluePiece },
        { color: "SkyBlue", image: SkyBluePiece },
        { color: "Purple", image: PurplePiece },
        { color: "Pink", image: PinkPiece },
        { color: "Gray", image: GrayPiece },
        { color: "Black", image: BlackPiece },
    ];

    return (
        <Container>
            {categories.length === 0 ? (
                <PuzzleBox>
                    <Message>링크된 퍼즐이 없어요!</Message>
                    <NoPiece src={ NoPieceImage } alt="No piece" />
                </PuzzleBox>
            ) : (
                <PuzzleBox>
                    <Message>{categories.length}개의 퍼즐이 생성되었어요!</Message>
                    <NoPiece src={ NoPieceImage } alt="No piece" />
                    {categories.slice(0, 9).map((_, index) => {
                        const { x, y } = calculateConnectedPosition(index);
                        return (
                            <Piece
                                key={index}
                                src={colors[index % colors.length].image}
                                alt={`Piece ${index}`}
                                style={{
                                    position: "absolute",
                                    left: `${x}px`,
                                    top: `${y}px`,
                                }}
                            />
                        );
                    })}
                </PuzzleBox>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 216px;
    height: 315px;
    font-family: "Arial", sans-serif;
`;

const Message = styled.h2`
    font-size: 12px;
    color: #007bff;
    margin-top: 23px;
    margin-bottom: 57px;
`;

const PuzzleBox = styled.div`
    width: 216px;
    height: 315px;
    flex-direction: column; /* 요소들을 수직으로 정렬 */
    align-items: center; /* 가로 중앙 정렬 */
    justify-content: flex-start;
    background-image: url(${PieceBox});
    background-size: cover;
    background-position: center;
    position: relative;
`;

const NoPiece = styled.img`
    width: 129.68px;
    height: 128.62px;
`;

const Piece = styled.img`
    width: 37.68px;
    height: 37.62px;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.1);
    }
`;

export default PieceMap;
