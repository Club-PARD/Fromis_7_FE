import React from "react";
import styled from "styled-components";

function LoginPage() {
  const handleGoogleLogin = () => {
    // Spring Boot의 Google OAuth 엔드포인트로 이동
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
