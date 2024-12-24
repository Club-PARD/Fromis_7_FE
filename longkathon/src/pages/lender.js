import React from "react";
import styled from "styled-components";
import LenderLogo from "../Image/LenderLogo.png";
import ConnectButtonImage from "../Image/ConnectButton.png"; 

function LenderPage () {
  return (
    <AppContainer>
      <Container>
        <Logo>
            <LogoImage src={LenderLogo} alt="Link Logo" />
        </Logo>

        <ConnectButton>
          <img src={ConnectButtonImage} alt="Connect Button" />
        </ConnectButton>

        <Content>
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
        </Content>
      </Container>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(to bottom, #5ba8fb, white);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;


const Logo = styled.div`
  margin-right: 10px;
`;

const LogoImage = styled.img`
  width: 360px;
  height: 408px;
  margin-top: 200px;
`;

const ConnectButton = styled.div`
  margin-top: 50px;

  img {
    width: 380px; 
    height: 80px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1); 
    }
  }
`;

const Content = styled.div`
  text-align: left;
  margin-top: 20px;
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
