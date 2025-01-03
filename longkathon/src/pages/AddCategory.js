import React, { useState, useRef } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import ColorPalette from "../components/ColorPalette";
import InfoCard from "../components/InfoCard";
import AddContentBox from "../components/AddContentBox";
import { postCategoryAPI } from "../API/Category";


function AddCategory({ clicked, onClose, findPieceId, pieceTitle }) {
  const buttonsArray = ["숙소", "식당", "카페", "교통", "장소", "준비물"];
  const [activeIndex, setActiveIndex] = useState(null);
  const [infoCards, setInfoCards] = useState([{ id: 0 }]); // 첫 번째 인포박스를 항상 포함
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [title, setTitle] = useState("");

  const infoCardRefs = useRef([]);

  const handleClick = (index) => {
    setActiveIndex(index);
    setSelectedButton(buttonsArray[index]);
    setTitle(buttonsArray[index]); // 선택한 버튼의 이름으로 제목을 설정
  };

  const addInfoCard = () => {
    setInfoCards([...infoCards, { id: Date.now() }]);
  };

  const removeInfoCard = (id) => {
    // 첫 번째 인포박스는 삭제하지 않도록 조건 추가
    if (infoCards.length > 1) {
      setInfoCards(infoCards.filter((card) => card.id !== id));
      infoCardRefs.current = infoCardRefs.current.filter((ref) => ref?.id !== id);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSave = async () => {
    if (!selectedColor || !title.trim()) {
      alert("색상과 제목을 입력해주세요.");
      return;
    }
  
    const allValues = infoCardRefs.current.map(ref =>
      ref?.getValues ? ref.getValues() : { url: "", description: "" }
    );
  
    if (allValues.some(value => !value.url.trim() || !value.description.trim())) {
      alert("모든 URL과 설명을 입력해주세요.");
      return;
    }
  
    const PostArray = {
      color: selectedColor,
      name: title,
      listups: allValues.map(value => ({
        url: value.url.trim(),
        description: value.description.trim()
      }))
    };
  
    try {
      const response = await postCategoryAPI(findPieceId, PostArray); // 지금 userId 하드 코딩 되어 있음 바꿔야함;;
      const savedData = response.data;
      alert("저장 성공");
      if (onClose) onClose(savedData);
    } catch (error) {
      console.error("저장 실패:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
      alert("저장 중 오류가 발생했습니다.");
    }
  };
  

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <BaseContainer clicked={clicked}>
      <TopSection>{pieceTitle}</TopSection>
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
              <EtcDiv>
              <InputWrapper
                isActive={activeIndex === buttonsArray.length}
                onClick={() => handleClick(buttonsArray.length)}
              >
                <Label>기타:</Label>
                <Input type="text" onChange={(e) => setTitle(e.target.value)} />
              </InputWrapper>
            </EtcDiv>
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

const TopSection=styled.div`
width: 412px;
height: 88px;
border-radius: 20px;
opacity: 1;
background: linear-gradient(149deg, #F0F8FF 0.77%, #F2F1F8 99.23%);
margin-top:116px;
color: #040404;
font-family: Inter;
font-size: 26px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 100% */
display: flex;
align-items: center;
justify-content: center;
text-align: center;
`;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: none;
  z-index:${(props) => (props.clicked ? "1000" : "100")};
`;

const ModalContainer = styled.div`
margin-top: 32px;
  width: 1280px;
  padding-top: 26px;
  padding-bottom: 42px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 90vh; /* 화면 크기 제한 */
  overflow-y: auto; /* 콘텐츠가 넘치면 수직 스크롤 가능 */
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

const EtcDiv = styled.div`
  width: 256px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  }`;

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
