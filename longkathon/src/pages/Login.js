import React from "react";
import styled from "styled-components";

function LoginPage() {
  const handleGoogleLogin = () => {
    const oauthUrl = `http://172.18.152.39:8080/oauth2/authorization/google`;
    window.location.href = oauthUrl; // Google OAuth 로그인 페이지로 이동
  };

  return (
    <LoginContainer>
      <InputContainer>
        <GoogleLoginButton onClick={handleGoogleLogin}>
          Sign in with Google
        </GoogleLoginButton>
      </InputContainer>
    </LoginContainer>
  );
}

export default LoginPage;

// 스타일 정의
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`;

const GoogleLoginButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;
