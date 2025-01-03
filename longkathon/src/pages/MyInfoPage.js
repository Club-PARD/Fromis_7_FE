import React, { useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import { CategoryText1, CategoryText2, Container, MainBenner } from "./MainPage";
import { useNavigate } from "react-router-dom";

import { patchUserNameAPI } from "../API/User.js";
import { patchUserImageAPI } from "../API/User.js";

const EditIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/uwbjfiwe.json"
      trigger="click"
      style={{ width: "40px", height: "40px" }}>
    </lord-icon>
  );
};

const LogOutIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/gpakgfhs.json"
      trigger="hover"
      style={{ width: "40px", height: "40px" }}>
    </lord-icon>
  );
};

const MyInfoPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [showSavePhotoButton, setShowSavePhotoButton] = useState(false); // 프로필 저장 버튼 상태
  const [showSaveNameButton, setShowSaveNameButton] = useState(false); // 이름 저장 버튼 상태
  const [imagePreview, setImagePreview] = useState(null); // 미리보기 이미지 URL


  const handleLogOut = () => {
    navigate("/login");
  };

  const handlePhotoIconClick = () => {
    setShowSavePhotoButton(true); // 프로필 저장 버튼 표시
    document.getElementById("fileInput").click(); // 파일 업로드 창 열기
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      setImage(file); // 이미지 파일 상태 업데이트
      setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const handleNameIconClick = () => {
    setShowSaveNameButton((prev) => !prev); // 이름 저장 버튼 상태 토글
    setShowSavePhotoButton(false); // 프로필 저장 버튼 숨김
  };

  const handleSaveImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image); // 이미지 추가

      console.log("FormData 확인:", Array.from(formData.entries()));
      const response = await patchUserImageAPI(1, formData);

      alert("프로필 이미지가 저장되었습니다.");
      console.log("서버 응답:", response.data);
    } catch (error) {
      alert("프로필 이미지를 저장하는 도중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  const handleSaveName = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      const data = { name }; // JSON 데이터로 전송
      const response = await patchUserNameAPI(1, data); // userId를 적절히 설정;

      alert("이름이 저장되었습니다.");
      console.log("서버 응답:", response.data);
    } catch (error) {
      alert("이름을 저장하는 도중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Container>
      <MainBenner>
        <SideBar />
        <HeaderComponent />
      </MainBenner>
      <MainContainer>
        <CustomCategoryText1>L:nk</CustomCategoryText1>
        <CustomCategoryText2>my page</CustomCategoryText2>
        <InfoText>기본정보</InfoText>
        <InfoText2>프로필을 완성하고 링크를 시작해보세요</InfoText2>
        <InfoEditContainer>
          <EditBox1>
            <InfoImage>
              {imagePreview ? (
                <PreviewImage src={imagePreview} alt="Preview" />
              ) : (
                <PlaceholderImage></PlaceholderImage>
              )}
            </InfoImage>
            <EditText1>프로필 사진</EditText1>

            <EditText2>10MB 이하 PNG, JPG, SVG를 올려주세요.</EditText2>
            <StyledEditIcon1 onClick={handlePhotoIconClick}>
              <EditButton1 />
              <HiddenInput
                id="fileInput"
                type="file"
                accept="image/png, image/jpg, image/svg"
                onChange={handleFileChange}
              />
            </StyledEditIcon1>
            {showSavePhotoButton && <SavePhoto onClick={handleSaveImage}>저장</SavePhoto>}
          </EditBox1>
          <EditBox2>
            <EditText1>이름:</EditText1>
            <InputInfo
              type="text"
              placeholder="닉네임 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <StyledEditIcon2 onClick={handleNameIconClick}>
              <EditButton2 />
            </StyledEditIcon2>
            {showSaveNameButton && <SaveName onClick={handleSaveName}>저장</SaveName>}
          </EditBox2>

          <EditBox2>
            <EditText1>이메일 주소:</EditText1>
            <InputInfo type="email" placeholder="기존 이메일" readOnly />
          </EditBox2>
        </InfoEditContainer>
        <LogOutContainer onClick={handleLogOut}>
          <LogOutText>로그아웃</LogOutText>
          <LogOutButton>
            <LogOutIcon />
          </LogOutButton>
        </LogOutContainer>
      </MainContainer>
    </Container>
  );
};

const MainContainer = styled.div`
position: relative;
margin-left: 82px;
margin-right: 82px;
display: flex;
text-align: center;
height: 824px;
`;

const CustomCategoryText1 = styled(CategoryText1)`
position: absolute;
top:138px;
left: 128px;
color: #040404;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; 
`;

const CustomCategoryText2 = styled(CategoryText2)`
position: absolute;
top: 138px;
left: 181px;
border-radius: 20px;
background: linear-gradient(149deg, #F0F8FF 0.77%, #F2F1F8 99.23%);
border: none;
`;

const InfoText = styled.div`
margin-top:224px;
margin-left: 128px;
color: #040404;
font-family: "Product Sans";
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 100% */
`;

const InfoText2 = styled.div`
position: absolute;
margin-top: 256px;
margin-left: 128px;
color: #AFB8C1;
font-family: "Product Sans";
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
`;

const InfoEditContainer = styled.div`
display: flex;
flex-direction: column;
position: absolute;
margin-top: 318px;
width: 100%;
height: 331px;
`;

const EditBox1 = styled.div`
width: 100%;
height: 117px;
display: flex; 
align-items: flex-start;
position: relative;
`;

const EditBox2 = styled.div`
width: 100%;
height: 117px;
display: flex; 
position: relative;
`;

const InfoImage = styled.div`
position:absolute;
background-color:#d9d9d9;
width: 100px;
height: 100px;
border-radius: 50%; 
margin-left:128px;
`;

const EditText1 = styled.div`
position: absolute;
left:245px;
top:24px;
color: #040404;
font-family: "Product Sans";
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; 
`;

const EditText2 = styled.div`
color: #AFB8C1;
font-family: "Product Sans";
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; 
position: absolute;
top:56px;
left:245px;
`;

const StyledEditIcon1 = styled.div`
  margin-left: 350px; 
  margin-top: 10px;
  cursor: pointer;
`;

const StyledEditIcon2 = styled.div`
  margin-left: 296px; 
  margin-top: 10px;
  cursor: pointer;
`;

const EditButton1 = styled(EditIcon)`
position: absolute;
top:10px;
left: 0px;
`;

const EditButton2 = styled(EditIcon)`
position: absolute;
top:10px;
left: 0px;
`;

const InputInfo = styled.input`
position: absolute;
top:56px;
left: 245px;
width: 439px;
height: 47px;
border-radius: 20px;
border: 0px solid #AFB8C1;
text-indent: 30px;
color: #040404;
font-family: "Product Sans";
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; 
background: linear-gradient(to bottom right, #F0F8FF, #F2F1F8);
`;

const LogOutContainer = styled.div`
position: absolute;
bottom:49px;
left:1095px;
display: flex;
width: 183px;
height: 52px;
padding: 6px 23px 6px 37px;
justify-content: center;
align-items: center;
gap: 9px;
flex-shrink: 0;
`;

const LogOutText = styled.div`
color: #040404;
font-family: "Product Sans";
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 20px; 
`;

const LogOutButton = styled.div``;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const SavePhoto = styled.div`
  width: 52px;
  height: 25px;
  cursor: pointer;
  margin-left: 80px;
  border-radius: 20px;
  background-color: #5ba8fb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FFF;
  margin-top: 20px;
`;

const SaveName = styled.div`
  width: 52px;
  height: 25px;
  cursor: pointer;
  border-radius: 20px;
  background-color: #5ba8fb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FFF;
  margin-top: 20px;
  margin-left: 297px;
`;

const PlaceholderImage = styled.div`
  color: #afb8c1;
  font-family: "Product Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

const HiddenInput = styled.input`
  display: none;
`;

export default MyInfoPage;
