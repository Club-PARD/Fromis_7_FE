import React, { useState } from "react";
import styled from "styled-components";
import ColorPalette from "../components/ColorPalette";
import InfoCard from "../components/InfoCard";
import AddContentBox from "../components/AddContentBox";

function AddCategory({ buttons = [] }) {
  const buttonsArray = ["숙소", "식당", "카페", "교통", "장소", "준비물"];
  const [activeIndex, setActiveIndex] = useState(null);
  const [infoCards, setInfoCards] = useState([
    { id: 0, content: "첫 InfoCard" },
  ]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const addInfoCard = () => {
    setInfoCards([...infoCards, { id: Date.now(), content: "새 InfoCard" }]);
  };

  const removeInfoCard = (id) => {
    setInfoCards(infoCards.filter((card) => card.id !== id));
  };

  return (
    <BaseContainer>
      <TopSection>Fromis_7in POHANG</TopSection>

      <ModalContainer>
        <Content>
          <StyledColorPalette />
          <Category>
            <CategoryTitle>링크 조각 카테고리 :</CategoryTitle>
            <ButtonsDiv>
              {buttonsArray.map((button, index) => (
                <Button
                  key={index}
                  isActive={activeIndex === index}
                  onClick={() => handleClick(index)}
                >
                  {button}
                </Button>
              ))}
            </ButtonsDiv>
            <EtcDiv>
              <InputWrapper
                isActive={activeIndex === buttonsArray.length}
                onClick={() => handleClick(buttonsArray.length)}
              >
                <Label>기타:</Label>
                <Input type="text" />
              </InputWrapper>
            </EtcDiv>
          </Category>
          <InfoCardContainer>
            {infoCards.map((infoCard, index) => (
              <InfoCard
                key={infoCard.id}
                id={infoCard.id}
                content={infoCard.content}
                isFirstCard={index === 0}
                onClose={removeInfoCard}
              />
            ))}
            <AddContentBox onAddInfoCard={addInfoCard} />
          </InfoCardContainer>
        </Content>
        <Footer>
          <Buttons bgColor="#AFB8C1" hoverColor="#909090" activeColor="#757575">
            취소
          </Buttons>
          <Buttons bgColor="#5BA8FB" hoverColor="#479CE8" activeColor="#387DBE">
            저장
          </Buttons>
        </Footer>
      </ModalContainer>
    </BaseContainer>
  );
}

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 412px;
  height: 88px;
  margin-top: 116px;
  border-radius: 20px;
  background: #fff;
  margin-bottom: 32px;
  color: #040404;
  font-family: Inter;
  font-size: 26px;
  font-weight: 700;
`;

const ModalContainer = styled.div`
  width: 1275.24px;
  height: 1010px;
  padding-top: 26px;
  padding-bottom: 42px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 100px;
  margin-right: 100px;
  overflow: auto;
`;

const StyledColorPalette = styled(ColorPalette)`
  margin-bottom: 20px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Button = styled.button`
  width: 121px;
  height: 58px;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? "#5ba8fb" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  border: 1px solid #5ba8fb;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#5ba8fb" : "#e6f7ff")};
  }
`;

const InputWrapper = styled.div`
  width: 252px;
  height: 58px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? "#5ba8fb" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  border: 1px solid #5ba8fb;
`;

const Label = styled.div`
  margin-left: 38px;
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Product Sans";
`;

const Input = styled.input`
  width: 170px;
  border: none;
  font-size: 20px;
  font-family: "Product Sans";
  font-weight: bold;
  color: #000;
  background: transparent;
`;

const EtcDiv = styled.div`
  width: 256px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoCardContainer = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
`;

const Footer = styled.div`
  position: relative;
  margin-top: 80px;
  margin-right: 107px;
  display: flex;
  justify-content: flex-end;
  height: 58px;
  margin-bottom: 42px;
`;

const Buttons = styled.button`
  margin-left: 8px;
  width: 153px;
  height: 58px;
  border-radius: 20px;
  background: ${(props) => props.bgColor || "#afb8c1"};
  border: none;
  font-size: 20px;
  color: ${(props) => (props.bgColor === "#5BA8FB" ? "#fff" : "#040404")};
`;

export default AddCategory;
