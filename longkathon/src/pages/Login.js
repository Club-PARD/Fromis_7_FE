import React from "react";
import styled from "styled-components";
import GoogleLogoImage from "../Image/GoogleLogo.png";
import LoginLogoImage from "../Image/LoginLogo.png";

function LoginPage() {
  const handleGoogleLogin = () => {
    const oauthUrl = `http://localhost:8080/oauth2/authorization/google`;
    window.location.href = oauthUrl; // Google OAuth 로그인 페이지로 이동
  };

  return (
    <LoginContainer>
      <LogoSection>
        <LoginLogo src={LoginLogoImage} alt="Login Logo" />
      </LogoSection>
      <GoogleLoginSection>
        <Title>로그인</Title>
        <GoogleLoginButton onClick={handleGoogleLogin}>
          <GoogleLogo src={GoogleLogoImage} alt="Google Logo" />
          <Input>Google로 시작하기</Input>
        </GoogleLoginButton>
      </GoogleLoginSection>
    </LoginContainer>
  );
}

// 스타일 정의
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
  margin-left: 142px;
`;

const LoginLogo = styled.img`
  width: 425px;
  height: 160px;
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

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 652px;
  height: 80px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  box-shadow: 2px 2px 2px 0px rgba(217, 217, 217, 0.3),
    -2px -2px 2px 0px rgba(217, 217, 217, 0.3);
  font-weight: 400;
  color: #040404;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const GoogleLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 55px;
`;

const Input = styled.span`
  font-size: 24px;
  font-weight: 400;
  color: #040404;
  display: flex;
  align-items: center;
  margin-left: 177px;
`;

export default LoginPage;
