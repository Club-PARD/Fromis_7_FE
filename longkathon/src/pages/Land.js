import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

import LenderLogo from "../Image/LenderLogo.png";
import ConnectButtonImage from "../Image/ConnectButton.png";

import Lending1 from "../Image/Lending1.png";
import Lending2 from "../Image/Lending2.png";
import Lending3 from "../Image/Lending3.png";
import Lending4 from "../Image/Lending4.png";
import Lending5 from "../Image/Lending5.png";
import Lending6 from "../Image/Lending6.png";
import Lending7 from "../Image/Lending7.png";
import Lending8 from "../Image/Lending8.png";
import Lending9 from "../Image/Lending9.png";
import LendingLogo from "../Image/LendingLogo.png";

function LenderPage() {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate("/login");
  };

  // 이미지 배열과 각 이미지별 크기 정의
  const images = [
    { src: Lending1, alt: "Lending 1", width: "1460px", height: "auto" },
    { src: Lending2, alt: "Lending 2", width: "1440px", height: "auto" },
    { src: Lending3, alt: "Lending 3", width: "1304px", height: "auto" },
    { src: Lending4, alt: "Lending 4", width: "1176px", height: "auto" },
    { src: Lending5, alt: "Lending 5", width: "946px", height: "auto" },
    { src: Lending6, alt: "Lending 6", width: "1265.467px", height: "auto" },
    { src: Lending7, alt: "Lending 7", width: "1289px", height: "auto" },
    { src: Lending8, alt: "Lending 8", width: "1248px", height: "auto" },
    { src: Lending9, alt: "Lending 9", width: "1440px", height: "auto" },
    { src: LendingLogo, alt: "Lending Logo", width: "300px", height: "auto" },
  ];

  return (
    <AppContainer>
      <Container>
        <Header>
          <LogoImage src={LenderLogo} alt="Link Logo" />
        </Header>
        <ConnectButton onClick={handleConnectClick}>
          <img src={ConnectButtonImage} alt="Connect Button" />
        </ConnectButton>
        <MainContent>
          <ImageContainer>
            {/* 이미지를 배열로 렌더링 */}
            {images.map((image, index) => (
              <CustomImage
                key={index}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </ImageContainer>
        </MainContent>
      </Container>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(to bottom, #5ba8fb, white);
  min-height: 100vh;
  // height: auto;
  font-family: 'Arial', sans-serif;
  color: #333;
  background: linear-gradient(to bottom, )
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const LogoImage = styled.img`
  width: 100%; 
  max-width: 360px; 
  height: auto; 
  margin-top: 150px;

  @media (max-width: 864px) {
    max-width: 200px; 
    margin-top: 50px; 
  }
`;

const ConnectButton = styled.div`
  margin: 50px 0;

  img {
    width: 100%; 
    max-width: 380px; 
    height: auto; 
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1); 
    }
  }

  @media (max-width: 768px) {
    img {
      max-width: 300px; 
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 200px; 
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 800px;
  margin-bottom: 150px;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center;
  gap: 20px; /* 이미지 간 간격 */
`;

const CustomImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;

  @media (max-width: 768px) {
    width: ${(props) => `calc(${props.width} / 1.5)`}; /* 작은 화면에서 이미지 크기 축소 */
    height: ${(props) => `calc(${props.height} / 1.5)`};
  }
`;

export default LenderPage;
