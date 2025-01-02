import React, { useEffect, useState } from "react";
import styled from "styled-components";
// 각 색상 코드에 해당하는 이미지들을 미리 import
import b_red from "../Image/b_red.png";
import b_orange from "../Image/b_orange.png";
import b_lightblue from "../Image/b_lightblue.png";
import b_darkblue from "../Image/b_darkblue.png";
import b_green from "../Image/b_green.png";
import b_purple from "../Image/b_purple.png";
import b_pink from "../Image/b_pink.png";
import b_white from "../Image/b_white.png";
import b_black from "../Image/b_black.png";
import MainPieceImage from "../Image/MainBackgroundImage.png"; // 기본 이미지

// 색상 코드와 이름 매핑
const colorToNameMap = {
  "#EA7E7A": "b_red",
  "#FBA96F": "b_orange",
  "#5BA8FB": "b_lightblue",
  "#002ED1": "b_darkblue",
  "#9ED4B6": "b_green",
  "#927CFF": "b_purple",
  "#D9A9ED": "b_pink",
  "#BDBDBD": "b_white",
  "#424242": "b_black",
};

// Styled component for background
const StyledBackGround = styled.div`
  position: fixed;
  top: 0px;
  width: 1440px;
  height: 864px;
  background-image: ${(props) =>
    props.imagePath ? `url(${props.imagePath})` : `url(${MainPieceImage})`}; /* 기본 이미지 사용 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
`;

const BackGround = ({ color, children }) => {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    // 색상 코드로 이름 가져오기
    const colorName = colorToNameMap[color] || null;

    if (colorName) {
      // 해당하는 이미지를 미리 import한 이미지를 기반으로 설정
      switch (colorName) {
        case "b_red":
          setImagePath(b_red);
          break;
        case "b_orange":
          setImagePath(b_orange);
          break;
        case "b_lightblue":
          setImagePath(b_lightblue);
          break;
        case "b_darkblue":
          setImagePath(b_darkblue);
          break;
        case "b_green":
          setImagePath(b_green);
          break;
        case "b_purple":
          setImagePath(b_purple);
          break;
        case "b_pink":
          setImagePath(b_pink);
          break;
        case "b_white":
          setImagePath(b_white);
          break;
        case "b_black":
          setImagePath(b_black);
          break;
        default:
          setImagePath(MainPieceImage); // 기본 이미지 사용
          break;
      }
    } else {
      setImagePath(MainPieceImage); // 색상 코드가 없으면 기본 이미지 사용
    }
  }, [color]); // color가 변경될 때마다 이미지 로드

  return <StyledBackGround imagePath={imagePath}>{children}</StyledBackGround>;
};

export default BackGround;
