import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ColorPalette from "../components/ColorPalette";
import InfoCard from "../components/InfoCard";
import AddContentBox from "../components/AddContentBox";
import { postPieceAPI } from "../API/Piece";

function AddCategory({ buttons = [], onClose }) {
  const buttonsArray = ["숙소", "식당", "카페", "교통", "장소", "준비물"];
  const [activeIndex, setActiveIndex] = useState(null);
  const [infoCards, setInfoCards] = useState([{ id: 0 }]);
  const [title, setTitle] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const infoCardRefs = useRef([]);

  const navigate = useNavigate();

  const handleClick = (index) => {
    setActiveIndex(index);
    setSelectedButton(buttonsArray[index]);
  };

  const addInfoCard = () => {
    setInfoCards([...infoCards, { id: Date.now() }]);
  };

  const removeInfoCard = (id) => {
    setInfoCards(infoCards.filter((card) => card.id !== id));
    infoCardRefs.current = infoCardRefs.current.filter((ref) => ref?.id !== id);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSave = async () => {
    // Validate selected button
    if (!selectedButton) {
      alert("버튼을 선택해주세요.");
      return;
    }

    // Collect values from InfoCard refs
    const allValues = infoCardRefs.current.map((ref) =>
      ref?.getValues ? ref.getValues() : null
    );

    if (allValues.some((values) => !values || !values.url.trim() || !values.description.trim())) {
      alert("모든 InfoCard의 URL과 메모를 입력해주세요.");
      return;
    }

    const dataToSave = { title, selectedButton, infoCards: allValues, selectedColor };

    alert(
      `저장된 데이터:\n카테고리: ${selectedButton}\n선택한 색상: ${selectedColor}\nInfoCards:\n${allValues
        .map(
          (values, index) =>
            `Card ${index + 1}: URL=${values.url}, 메모=${values.description}`
        )
        .join("\n")}`
    );

    try {
      const userId = 1;
      await postPieceAPI(userId, dataToSave);
      alert("저장 성공");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <BaseContainer>
      <TopSection>Fromis_7in POHANG</TopSection>
      <ModalContainer>
        <Content>
          <StyledColorPalette onColorSelect={handleColorSelect} />
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
          </Category>
          <InfoCardContainer>
            {infoCards.map((infoCard, index) => (
              <InfoCard
                key={infoCard.id}
                id={infoCard.id}
                ref={(el) => (infoCardRefs.current[index] = el)} // Assign ref to each InfoCard
                onClose={() => removeInfoCard(infoCard.id)}
              />
            ))}
            <AddContentBox onAddInfoCard={addInfoCard} />
          </InfoCardContainer>
        </Content>
        <Footer>
          <Buttons
            bgColor="#AFB8C1"
            hoverColor="#909090"
            activeColor="#757575"
            onClick={handleCancel}
          >
            취소
          </Buttons>
          <Buttons
            bgColor="#5BA8FB"
            hoverColor="#479CE8"
            activeColor="#387DBE"
            onClick={handleSave}
          >
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
  min-height: 100vh;
  background-color: gray;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 412px;
  height: 88px;
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
  padding-top: 26px;
  padding-bottom: 42px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 100px;
  margin-right: 100px;
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
