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
import BackGround from "../components/BackGround";

function LenderPage() {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate("/login");
  };

  // 이미지 배열과 각 이미지별 크기 정의
  const images = [
    {
      src: Lending1,
      alt: "Lending 1",
      width: "1038px",
      height: "auto",
      marginTop: "500px",
      marginBottom: "100px",
    },
    {
      src: Lending2,
      alt: "Lending 2",
      width: "1440px",
      height: "auto",
      marginBottom: "300px",
    },
    {
      src: Lending3,
      alt: "Lending 3",
      width: "1188px",
      height: "auto",
      marginBottom: "150px",
    },
    {
      src: Lending4,
      alt: "Lending 4",
      width: "1076px",
      height: "auto",
      marginBottom: "180px",
    },
    {
      src: Lending5,
      alt: "Lending 5",
      width: "947px",
      height: "auto",
      marginBottom: "220px",
    },
    {
      src: Lending6,
      alt: "Lending 6",
      width: "1093px",
      height: "auto",
      marginBottom: "180px",
    },
    {
      src: Lending7,
      alt: "Lending 7",
      width: "1173px",
      height: "auto",
      marginBottom: "260px",
    },
    {
      src: Lending8,
      alt: "Lending 8",
      width: "935px",
      height: "auto",
      marginBottom: "342px",
    },
    {
      src: Lending9,
      alt: "Lending 9",
      width: "1440px",
      height: "auto",
    },
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
            {images.map((image, index) => (
              <CustomImage
                key={index}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                marginTop={image.marginTop}
                marginBottom={image.marginBottom}
              />
            ))}
            <Below>
              <BelowButton>
                <BelowLogoImage src={LenderLogo} alt="Link Logo" />
                <Div>
                  <Button
                    img
                    src={ConnectButtonImage}
                    alt="below Button"
                    onClick={handleConnectClick}
                  />
                </Div>
              </BelowButton>
            </Below>
          </ImageContainer>
        </MainContent>
      </Container>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  min-height: 100px;
  height: 745vh;
  font-family: "Arial", sans-serif;
  color: #333;

  background: linear-gradient(
    to bottom,
    #3597ff 5%,
    /* 위쪽 파란색이 5%까지만 표시 */ #ffffff 15%,
    /* 흰색 시작 */ #ffffff 90%,
    /* 흰색이 대부분 차지 */ #5ba8fb 100%
  );
`;


const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

const LogoImage = styled.img`
  width: 100%;
  max-width: 360px;
  height: auto;
  margin-top: 190px;

  @media (max-width: 864px) {
    max-width: 200px;
    margin-top: 50px;
  }
`;

const ConnectButton = styled.div`
  margin-top: 50px;

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
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  align-items: center;
`;

const CustomImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop || "0px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  cursor: pointer;

  @media (max-width: 768px) {
    width: ${(props) =>
      `calc(${props.width} / 1.5)`}; /* 작은 화면에서 이미지 크기 축소 */
    height: ${(props) => `calc(${props.height} / 1.5)`};
  }
`;

const BelowButton = styled.div`
  display: block;
  justify-content: center;
  height: 400px;
  padding-top: 200px;
  /* background: linear-gradient(to bottom, #fff, #7EBCFF); */
`;

const Div = styled.div`
  width: auto;
  background: transparent
`;
const BelowLogoImage = styled.img`
  width: 182px;
  height: 183px;
`;

const Button = styled.img`

  width: 380px;
  height: 80px;
  margin-top: 50px;
`;

const Below = styled.div`
  width: 100%;
  height: 20vh
`;
export default LenderPage;
