import MainPieceImage from "../Image/MainBackgroundImage.png";
import styled from "styled-components";

const BackGround = styled.div`
background-image: url(${MainPieceImage});
  background-size: cover; 
  background-position: center; /* 이미지를 중앙에 위치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  border-radius: 10px; /* 둥근 테두리, 필요 시 조정 */

`;

export default BackGround;