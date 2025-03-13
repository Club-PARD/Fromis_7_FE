import React, { useState } from "react";
import styled from "styled-components";
import ColorPalette from "../components/ColorPalette";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

import { postPieceAPI } from "../API/Piece.js";
import { useRecoilValue } from "recoil";
import { userIdState } from "../recoil/recoilState.js";

const ModalAdd = ({ isOpen, onClose, initialData, onAddPiece }) => {
  const userId = useRecoilValue(userIdState); // Recoil에서 userId 값 가져오기

  const [title, setTitle] = useState(initialData?.title || "");
  const [dates, setDates] = useState(
    initialData?.dates || {
      startYear: "",
      startMonth: "",
      startDay: "",
      endYear: "",
      endMonth: "",
      endDay: "",
    }
  );
  const [members, setMembers] = useState(initialData?.members || [""]);
  const [color, setColor] = useState(initialData?.color || "#FFFFFF");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleBlur = (field, value) => {
    if (!/^\d+$/.test(value)) {
      alert("숫자만 입력해주세요."); // 경고창 표시
      setDates((prevDates) => ({
        ...prevDates,
        [field]: "", // 잘못된 값을 초기화
      }));
      return;
    }

    // 유효한 값이라면 포맷팅 수행
    let formattedValue = value;

    if (field.includes("Year")) {
      formattedValue = `${value}년`;
    } else if (field.includes("Month")) {
      formattedValue = value.padStart(2, "0") + "월";
    } else if (field.includes("Day")) {
      formattedValue = value.padStart(2, "0") + "일";
    }

    setDates((prevDates) => ({
      ...prevDates,
      [field]: formattedValue,
    }));
  };

  const handleChange = (field, value) => {
    setDates((prevDates) => ({
      ...prevDates,
      [field]: value,
    }));
  };

  const addMemberField = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleSave = async () => {
    if (isLoading) return;
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (
      !dates.startYear ||
      !dates.startMonth ||
      !dates.startDay ||
      !dates.endYear ||
      !dates.endMonth ||
      !dates.endDay
    ) {
      alert("날짜를 모두 입력해주세요.");
      return;
    }

    if (!members.length || members.some((name) => !name.trim())) {
      alert("멤버 이름을 입력해주세요.");
      return;
    }

    const payload = {
      title,
      memberNames: members,
      startYear: parseInt(dates.startYear, 10),
      startMonth: parseInt(dates.startMonth, 10),
      startDay: parseInt(dates.startDay, 10),
      endYear: parseInt(dates.endYear, 10),
      endMonth: parseInt(dates.endMonth, 10),
      endDay: parseInt(dates.endDay, 10),
      color,
    };

    setIsLoading(true);
    try {
      const response = await postPieceAPI(1, payload); // userId를 1로 고정
      console.log("Payload saved:", response.data);
      alert("저장이 완료되었습니다.");

      onAddPiece(response.data); // 새 데이터를 부모에게 전달

      onClose(); // 모달 닫기

      const pieceId = response.data.pieceId; // API 응답에서 pieceId 추출
      navigate(`/${userId}/main/${pieceId}`); // 동적으로 생성된 경로로 이동
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalGroup>
          <Label>링크 제목: </Label>
          <InputTitle
            type="text"
            placeholder="링크 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalGroup>

        <ModalGroup>
          <Label>링크 날짜: </Label>
          <DateField>
            <InputDate
              placeholder="년도"
              value={dates.startYear}
              onChange={(e) => handleChange("startYear", e.target.value)}
              onBlur={(e) => handleBlur("startYear", e.target.value)}
            />
            <InputDate
              placeholder="월"
              value={dates.startMonth}
              onChange={(e) => handleChange("startMonth", e.target.value)}
              onBlur={(e) => handleBlur("startMonth", e.target.value)}
            />
            <InputDate
              placeholder="일"
              value={dates.startDay}
              onChange={(e) => handleChange("startDay", e.target.value)}
              onBlur={(e) => handleBlur("startDay", e.target.value)}
            />
            <Dash>__</Dash>
            <InputDate
              placeholder="년도"
              value={dates.endYear}
              onChange={(e) => handleChange("endYear", e.target.value)}
              onBlur={(e) => handleBlur("endYear", e.target.value)}
            />
            <InputDate
              placeholder="월"
              value={dates.endMonth}
              onChange={(e) => handleChange("endMonth", e.target.value)}
              onBlur={(e) => handleBlur("endMonth", e.target.value)}
            />
            <InputDate
              placeholder="일"
              value={dates.endDay}
              onChange={(e) => handleChange("endDay", e.target.value)}
              onBlur={(e) => handleBlur("endDay", e.target.value)}
            />
          </DateField>
        </ModalGroup>

        <ModalGroup>
          <Label>링크 멤버: </Label>
          <DateField>
            {members.map((member, index) => (
              <MemberContainer key={index}>
                <CloseButton
                  onClick={() => {
                    if (members.length > 1) {
                      const updatedMembers = members.filter(
                        (_, i) => i !== index
                      );
                      setMembers(updatedMembers);
                    }
                  }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/nqtddedc.json"
                    trigger="hover"
                    colors="primary:#040404,secondary:#FF5733"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                </CloseButton>
                <InputMember
                  placeholder={`멤버 ${index + 1}`}
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                />
              </MemberContainer>
            ))}
            <AddLordicon onClick={addMemberField}>
              <lord-icon
                src="https://cdn.lordicon.com/nqtddedc.json"
                trigger="hover"
                colors="primary:#AFB8C1,secondary:#FF5733"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </AddLordicon>
          </DateField>
        </ModalGroup>

        <ModalGroup>
          <ColorPalette onColorSelect={handleColorChange} />
        </ModalGroup>

        <ModalActions>
          <Button onClick={onClose}>취소</Button>
          <Button primary onClick={handleSave} disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장"}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components for modal styling
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 오버플로 방지 */
  z-index: 1000;
`;
const ModalContent = styled.div`
  margin-top: 4%;
  width: 1110px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px;
  }
`;

const ModalGroup = styled.div`
  margin-top: 42px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-family: "Product Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #040404;
  font-weight: bold;
`;

const InputTitle = styled.input`
  width: 506px;
  height: 58px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  text-indent: 30px;
`;

const DateField = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;
const InputDate = styled.input`
  width: 151px;
  height: 58px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  text-indent: 30px;
  color: #555;
  margin: 0px;
  /* 반응형 스타일 */
  @media (max-width: 768px) {
    height: 35px;
    font-size: 14px;
  }
`;

const Dash = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  margin-bottom: 10px;
  color: #afb8c1;
`;

const MemberContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -5px;
  left: 145px;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const InputMember = styled.input`
  width: 153px;
  height: 58px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  text-indent: 30px;
`;

const AddLordicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 60px;
  margin-left: 8px;
  rotate: 45deg;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 64px;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Button = styled.button`
  width: 153px;
  height: 58px;
  transform: translateY(-27px);
  z-index: 1;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  background: #afb8c1;
  color: #040404;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  ${(props) =>
    props.primary
      ? `
        background-color: #3597ff;
        color: #fff;
        `
      : `
        background-color: #e0e0e0;
        color: #555;
        `}

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

export default ModalAdd;
