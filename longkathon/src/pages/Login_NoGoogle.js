import React, { useState } from "react";
import styled from "styled-components";
import GoogleLogoImage from "../Image/GoogleLogo.png";
import LoginLogoImage from "../Image/LoginLogo.png";
import { useNavigate } from "react-router-dom";
import { postLoginAPI, postSignInAPI } from '../API/Nogoogle';
// CSS수정해야 합니다. -Sehyun-
function LoginPage() {
  const [nickname, setNickname] = useState('');
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const userData = {
      name: nickname,
      email: credentials.id,
      password: credentials.password,
    };
    try {
      await postSignInAPI(userData);
      navigate('/login');
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleLogin = async () => {
    const loginData = {
      email: credentials.id,
      password: credentials.password,
    };
    console.log('로그인 데이터:', loginData);
    try {
      await postLoginAPI(loginData);
      navigate('/main');
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <LoginContainer>
      <LogoSection>
        <LoginLogo src={LoginLogoImage} alt="Login Logo" />
      </LogoSection>
      <GoogleLoginSection>
        <Title>로그인</Title>
        <InputNickName type="text" placeholder="닉네임을 적어주세요." value={nickname} onChange={(e) => setNickname(e.target.value)} /> 
        <InputEmail type="text" placeholder="이메일을 적어주세요." value={credentials.id} onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}/>
        <InputPassword type="password" placeholder="비밀번호를 적어주세요." value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
        <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>  
        <LoginButton onClick={handleLogin}>로그인</LoginButton>  
      </GoogleLoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  font-family: "Arial", sans-serif;
  background: #fff;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 144px;
`;

const LoginLogo = styled.img`
  width: 479px;
  height: 224px;
`;

const GoogleLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 80px;
  margin-top: -50px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 400;
  color: #040404;
  margin-bottom: 20px;
  margin-left: 300px;
  margin-right: 300px;
`;

const InputNickName = styled.input`
  width: 100%;
  height:40px;
  text-indent: 20px;
  border-radius: 20px;
`;

const InputEmail = styled.input`
  width: 100%;
  height:40px;
  text-indent: 20px;
  border-radius: 20px;
`;

const InputPassword = styled.input`
  width: 100%;
  height:40px;
  text-indent: 20px;
  border-radius: 20px;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: #007bff;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  margin-top: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: #007bff;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  margin-top: 20px;
`;

export default LoginPage;
