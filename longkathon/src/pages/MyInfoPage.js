import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";
import SideBar from "../components/SideBar";
import { CategoryText1, CategoryText2, Container, MainBenner } from "./MainPage";
import { useNavigate } from "react-router-dom";

import { postUserAPI } from "../API/User.js";

const MyInfoPage = () => {
const navigate = useNavigate();

const handleLogOut = () =>{
  navigate("/login");
}

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
            <InfoImage />
            <EditText1>프로필 사진</EditText1>
            <EditText2>10MB 이하 PNG, JPG, SVG를 올려주세요.</EditText2>
            <StyledEditIcon1>
              <EditButton1 />
            </StyledEditIcon1>
          </EditBox1>
          <EditBox2>
            <EditText1>이름:</EditText1>
            <InputInfo type="name"
              placeholder="기존 닉네임"
            />
            <StyledEditIcon2>
              <EditButton2 />
            </StyledEditIcon2>
          </EditBox2>
          <EditBox2>
            <EditText1>이메일 주소:</EditText1>
            <InputInfo type="email"
              placeholder="기존 이메일"
            />
          </EditBox2>
        </InfoEditContainer>
        <LogOutContainer onClick={handleLogOut}>
          <LogOutText>로그아웃
          </LogOutText>
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
display: flex; /* flexbox를 사용 */
  /* align-items: center;  */
  position: relative;
`;

const EditBox2 = styled.div`
width: 100%;
height: 117px;
display: flex; /* flexbox를 사용 */
  /* align-items: center;  */
  position: relative;
`;

const InfoImage = styled.div`
position:absolute;
background-color:#d9d9d9;
width: 100px;
height: 100px;
border-radius: 50%; /* 원형을 만들기 위한 설정 */
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
line-height: 20px; /* 100% */
`;

const EditText2 = styled.div`
color: #AFB8C1;
font-family: "Product Sans";
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
position: absolute;
top:56px;
left:245px;
`;

const StyledEditIcon1 = styled.div`
  margin-left: 350px; 
  margin-top: 10px;
`;

const StyledEditIcon2 = styled.div`
  margin-left: 296px; 
  margin-top: 10px;
`;

const EditIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/uwbjfiwe.json"
      trigger="click"
      style={{ width: "40px", height: "40px" }}>
    </lord-icon>
  );
};

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
    border: 1px solid #AFB8C1;
    text-indent: 30px;
    color: #AFB8C1;
font-family: "Product Sans";
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
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
line-height: 20px; /* 100% */
`;

const LogOutButton = styled.div``;

const LogOutIcon = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/gpakgfhs.json"
      trigger="hover"
      style={{width:"40px",height:"40px"}}>
    </lord-icon>
  );
};

export default MyInfoPage;