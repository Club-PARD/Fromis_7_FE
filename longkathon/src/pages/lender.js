import React from "react";
import styled, { keyframes } from "styled-components";
import LenderLogo from "../Image/LenderLogo.png";
import ConnectButtonImage from "../Image/ConnectButton.png";
import AirPlaneImage from "../Image/AirPlane.png";

function LenderPage() {
  return (
    <AppContainer>
      <AirPlane src={AirPlaneImage} alt="AirPlane" />
      <Container>
        <Header>
          <LogoImage src={LenderLogo} alt="Link Logo" />
        </Header>

        <ConnectButton>
          <img src={ConnectButtonImage} alt="Connect Button" />
        </ConnectButton>

        <MainContent>
          <ImageContainer>
            <ContentImage src={LenderLogo} alt="Left Content Image" />
          </ImageContainer>
          <TextContainer>
            <Heading>Link: 기대의 순간을 더 설레게</Heading>
            <Paragraph>
              여행 준비의 모든 정보를 한 곳에 모아, 주최자와 참여자를 이어주는 여행 약속 아카이빙 서비스 ‘Link’. 여행의 모든
              과정을 시각적으로 통합 관리하고, 효율적인 소통과 정보 공유를 도와드립니다.
            </Paragraph>
            <SubHeading>1. 약속 생성하기</SubHeading>
            <Paragraph>
              여행 약속을 만들고, 주요 정보를 카테고리별로 정리하세요. 링크, 사진, 추가 사항 등을 입력하고, 필요한 정보를
              손쉽게 관리할 수 있습니다.
            </Paragraph>
            <SubHeading>2. 약속 공유 및 소통하기</SubHeading>
            <Paragraph>
              참여자들과 약속 정보를 공유하고, 댓글과 좋아요 기능으로 소통하세요. 참여자들이 선호하는 정보를 한눈에 확인하고,
              가장 중요한 내용은 즐겨찾기로 고정할 수 있습니다.
            </Paragraph>
            <SubHeading>3. 약속 정리하고 우선순위 설정하기</SubHeading>
            <Paragraph>
              D-Day가 가까운 약속부터 중요한 정보를 우선적으로 확인하세요. 효율적으로 정리된 약속 정보로 시간 낭비 없이 여행
              준비를 마무리하세요.
            </Paragraph>
            <Paragraph>
              Link와 함께, 더 즐겁고 편리한 여행 준비를 시작해보세요!
            </Paragraph>
          </TextContainer>
        </MainContent>
      </Container>
    </AppContainer>
  );
}

// 비행기 애니메이션 효과
const flyAnimation = keyframes`
  0% {
    transform: translate(0, 0) scale(1); /* 왼쪽 상단에서 시작, 기본 크기 */
    opacity: 1;
  }
  80% {
    transform: translate(100vw, 100vh) scale(3); /* 오른쪽 하단으로 이동하며 크기 커짐 */
    opacity: 1;
  }
  100% {
    transform: translate(100vw, 120vh) scale(3); /* 화면 바깥으로 이동 */
    opacity: 0; /* 점점 사라짐 */
  }
`;

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(to bottom, #5ba8fb, white);
  min-height: 100vh;
  height: auto;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const AirPlane = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px; 
  height: auto;
  animation: ${flyAnimation} 5s linear 1; /* 7초 동안 1회 실행 */
  animation-fill-mode: forwards;
`;

const Container = styled.div`
  max-width: 1440px;
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
  align-items: flex-start;
  gap: 20px; 
  margin-top: 800px;
  margin-bottom: 150px;

  @media (max-width: 768px) {
    flex-direction: column; /* 화면이 작아지면 세로로 배치 */
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1; /* 이미지가 컨테이너의 1/2 차지 */
`;

const ContentImage = styled.img`
  width: 100%; 
  max-width: 300px; 
  height: auto;
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: left;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #007bff;
`;

const SubHeading = styled.h3`
  font-size: 20px;
  margin-top: 15px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-top: 10px;
`;

export default LenderPage;
