import React from "react";
import styled from "styled-components";
import GoogleLogoImage from "../Image/GoogleLogo.png";
import LoginLogoImage from "../Image/LoginLogo.png";

function LoginPage() {
  const handleGoogleLogin = () => {
    const oauthUrl = `http://13.124.86.133:8080/test`;
    window.location.href = oauthUrl; // Google OAuth 로그인 페이지로 이동
  };

  return (
    <LoginContainer>
      <LogoSection>
        <LoginLogo src={LoginLogoImage} alt="Login Logo" />
      </LogoSection>
      <LoginTitle>로그인</LoginTitle>
      <GoogleLoginButton onClick={handleGoogleLogin}>
        <GoogleLogo src={GoogleLogoImage} alt="Google Logo" />
        Google로 시작하기
      </GoogleLoginButton>
    </LoginContainer>
  );
}

// 스타일 정의
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  font-family: "Arial", sans-serif;
  background: #fff;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 142px;
`;

const LoginLogo = styled.img`
  width: 425px;
  height: 160px;
`;


const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin-bottom: 40px;
`;

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 652px;
  height: 80px;
  border-radius: 20px;
  border: 1px solid #afb8c1;
  background: #fff;
  box-shadow: 2px 2px 2px 0px rgba(217, 217, 217, 0.3),
    -2px -2px 2px 0px rgba(217, 217, 217, 0.3);
  font-size: 18px;
  font-weight: 500;
  color: #040404;
  cursor: pointer;
  margin-left: 708px;
  &:hover {
    background: #f5f5f5;
  }
`;

const GoogleLogo = styled.img`
  width: 24px;
  height: 24px;
`;

export default LoginPage;
