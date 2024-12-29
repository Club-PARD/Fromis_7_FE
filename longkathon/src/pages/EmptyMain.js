import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import ColorPalette from "../components/ColorPalette";
import Dropdown from "../components/CategoryButton";

import { postPieceAPI } from "../API/Piece";
import CategoryAddContainer from "../components/CategoryAddContainer";

const EmptyMainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState(""); 
    const [dates, setDates] = useState({
        startYear: "",
        startMonth: "",
        startDay: "",
        endYear: "",
        endMonth: "",
        endDay: "",
    });

    const [members, setMembers] = useState([""]);
    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState("#FFFFFF");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setTitle(""); // 제목 초기화
        setDates({
            startYear: "",
            startMonth: "",
            startDay: "",
            endYear: "",
            endMonth: "",
            endDay: "",
        });
        setMembers([""]); // 멤버 초기화
        setColor("#FFFFFF"); // 색상 초기화
        setIsModalOpen(false);
    };

    const saveDataToServer = async () => {
        //const response = await postPieceAPI(userId, payload);
        if (isLoading) return;
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        if (!dates.startYear || !dates.startMonth || !dates.startDay || !dates.endYear || !dates.endMonth || !dates.endDay) {
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

        try{
            const response = await postPieceAPI(payload);
            if (response?.status === 200) {
                alert("저장 성공!");
                closeModal();
            } else{
                alert(`저장 실패: ${response?.statusText}`);
            } 
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장 중 오류가 발생했습니다.");
        } finally{
            setIsLoading(false);
        }
    };

    const handleBlur = (field, value) => {
        let formattedValue = value;

        // 이미 "년", "월", "일"이 포함되어 있는 경우 포맷팅을 건너뜀
        if (field.includes("Year") && value.endsWith("년")) {
            return;
        } else if (field.includes("Month") && value.endsWith("월")) {
            return;
        } else if (field.includes("Day") && value.endsWith("일")) {
            return;
        }

        // 년, 월, 일 포맷팅 처리
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
    }

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    }

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor); // 선택한 색상을 상태에 저장
    };

    return (
        <PageWrapper>
            <Header />
            <Dropdown />
            <MainContent>
                <SideBarContainer>
                    <SideBar />
                </SideBarContainer>
                <ImageContainer>
                    <CenterImage src={require("../Image/MainIcon.png")} alt="centered-image" />
                    <Title>여행의 시작, 함께 링크해요!</Title>
                    {/* <CategoryAddContainer onClickHandler={openModal}/> */}
                </ImageContainer>
            </MainContent>

            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        {/* 약속 제목 */}
                        <ModalGroup>
                            <Label>약속 제목: </Label>
                            <InputTitle 
                                type="text" 
                                placeholder="약속 제목을 입력해주세요" 
                                value = {title}
                                onChange = {(e) => setTitle(e.target.value)}
                            />
                        </ModalGroup>

                        {/* 약속 날짜 */}
                        <ModalGroup>
                            <Label>약속 날짜: </Label>
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

                        {/* 약속 멤버 */}
                        <ModalGroup>
                            <Label>약속 멤버: </Label>
                            <DateField>
                                {members.map((member, index) => (
                                    <MemberContainer key={index}>
                                        <CloseButton
                                            onClick={() => {
                                                if (members.length > 1) {
                                                    const updatedMembers = members.filter((_, i) => i !== index);
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
                                            placeholder={`예) 멤버 ${index + 1}`}
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

                        {/* 색상 선택 */}
                        <ModalGroup>
                            <ColorPalette selectedColor={color} onChange={handleColorChange} />
                        </ModalGroup>
                        {/* 하단 버튼 */}
                        <ModalActions>
                            <Button onClick={closeModal}>취소</Button>
                            <Button primary onClick={saveDataToServer} disabled={isLoading}>
                                {isLoading ? "저장 중..." : "저장"}
                            </Button>
                        </ModalActions>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageWrapper>
    );
};

// 스타일 정의
const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    position: relative;
`;

const SideBarContainer = styled.div`
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 10;
`;

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const CenterImage = styled.img`
    width: 467px;
    height: auto;
    border-radius: 12px;
`;

const Title = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #3597ff;
    font-family: "Product Sans Thin";
    font-size: 40px;
    font-style: normal;
    font-weight: 350;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* 반응형 스타일 */
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const InputTitle = styled.input`        // 약속 제목 입력 필드
    width: 506px;
    height: 58px;
    border-radius: 20px;
    border: 1px solid #AFB8C1;
    text-indent: 30px;
    
`;

const InputMember = styled.input`       // 약속 멤버 입력 필드
    width: 153px;
    height: 58px;
    border-radius: 20px;
    border: 1px solid #AFB8C1;
    text-indent: 30px;
`;

const Dash = styled.div`
    display: flex;
    font-size: 20px;
    align-items: center;
    margin-bottom: 10px;
    color: #AFB8C1;
`;

// 모달 관련 스타일
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
    background: #AFB8C1;    
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

export default EmptyMainPage;