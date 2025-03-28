import React, { useState } from "react";
import styled from "styled-components";
import LoginLogoImage from "../Image/LoginLogo.png";
import { useNavigate } from "react-router-dom";
import { postLoginAPI, postRegisterAPI } from "../API/Login";

function LoginPage() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  //login flow
  const handleLogin = async () => {
    const loginData = {
      email: credentials.id,
      password: credentials.password,
    };
    console.log("로그인 데이터", loginData);
    try {
      const result = await postLoginAPI(loginData); // API 호출 결과를 변수에 저장
      console.log("로그인 성공 데이터:", result); // 성공적으로 받은 데이터를 콘솔에 출력

      // userId 추출
      const userId = result.data.userId;

      // userId 확인
      console.log("로그인한 사용자 ID:", userId);

      // 네비게이션
      navigate(`/${userId}/main`);
    } catch (error) {
      alert("계정 정보가 없거나 데이터가 잘못되었습니다.");
      console.error("로그인 실패:", error);
    }
  };

  // console.log("login -",response);
  // navigate("/main");

  return (
    <LoginContainer>
      <LogoSection>
        <LoginLogo src={LoginLogoImage} alt="Login Logo" />
      </LogoSection>
      <GoogleLoginSection>
        <Title>로그인</Title>
        <InputId
          type="text"
          placeholder="아이디를 입력해주세요."
          value={credentials.id}
          onChange={(e) =>
            setCredentials({ ...credentials, id: e.target.value })
          }
        />
        <InputPassword
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <FindIdPassWord>
          <FindID>아이디 찾기</FindID>
          <div> | </div>
          <FindPW>비밀번호 찾기</FindPW>
        </FindIdPassWord>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <RegisterButton onClick={() => navigate("/register")}>
          회원가입
        </RegisterButton>
      </GoogleLoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  background: #fff;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 106px;
`;

const LoginLogo = styled.img`
  width: 479px;
  height: 224px;
`;

const GoogleLoginSection = styled.div`
  display: flex;
  justify-content: end;
  width: 567px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 80px;
  margin-top: -50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 32px;
  font-weight: 400;
  color: #040404;
  margin-bottom: 20px;
  margin-left: 300px;
  margin-right: 300px;
`;

const InputId = styled.input`
  width: 567px;
  height: 84px;
  text-indent: 20px;
  border-radius: 10px;
  border: 1px solid #afb8c1;
  background: #fff;
  color: #000;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 24px;
  padding: 0px;
`;

const InputPassword = styled.input`
  width: 567px;
  height: 84px;
  text-indent: 20px;
  border-radius: 10px;
  border: 1px solid #afb8c1;
  background: #fff;
  color: #e1e1e1;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0px;
  margin-bottom: 24px;
`;

const FindIdPassWord = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  margin-bottom: 50px;
  justify-content: flex-end;
`;

const FindID = styled.button`
  width: 97px;
  height: 100%;
  color: #000;
  text-align: center;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0px;
  margin-right: 10px;
  border: none;
  background-color: #fff;
`;

const FindPW = styled.button`
  width: 115px;
  height: 100%;
  color: #000;
  text-align: center;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0px;
  margin-left: 10px;
  border: none;
  background-color: #fff;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 84px;
  background: #fff;
  color: #5ba8fb;
  font-weight: 400;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 10px;
  border: 1px solid #5ba8fb;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 84px;
  background: #5ba8fb;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  color: #fff;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 10px;
  border: 1px solid #5ba8fb;
`;

export default LoginPage;
