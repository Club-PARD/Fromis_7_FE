import React, { useEffect, useState } from "react";
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
import { getCategoryAPI } from "../API/Category";

// 색상 코드와 색상 이름을 매핑하는 객체
const colorCodeMap = {
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

const PieceMap = ({pieceId}) => {
    const [categories, setCategories] = useState([]); 

    const colors = [
        { color: "red", image: RedPiece },
        { color: "orange", image: OrangePiece },
        { color: "green", image: GreenPiece },
        { color: "darkblue", image: BluePiece },
        { color: "lightblue", image: SkyBluePiece },
        { color: "purple", image: PurplePiece },
        { color: "pink", image: PinkPiece },
        { color: "gray", image: GrayPiece },
        { color: "black", image: BlackPiece },
    ];

   // 카테고리 데이터 가져오기
   useEffect(() => {
    const fetchCategories = async () => {
        try {
            
            const data = await getCategoryAPI(pieceId);
            console.log("category", data);

            // color 값을 추출하여 배열로 저장
            const colorArray = data.map((category) => category.color);
            console.log("Colors:", colorArray);

            setCategories(data); // 서버에서 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    fetchCategories();
}, []);

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
                    {categories.slice(0, 9).map((category, index) => {
                        const { x, y } = calculateConnectedPosition(index);
                        const colorName = colorCodeMap[category.color]; // 색상 이름 변환
                        const colorImage = colors.find((c) => c.color === colorName)?.image; // 색상 이미지 매핑

                        return (
                            <Piece
                                key={index}
                                src={colorImage || NoPieceImage} // 매핑 실패 시 기본 이미지
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
