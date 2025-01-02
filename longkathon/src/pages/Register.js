import React, { useState } from "react";
import styled from "styled-components";
import LoginLogoImage from "../Image/LoginLogo.png";
import { useNavigate } from "react-router-dom";
import { postLoginAPI, postDUPAPI, postRegisterAPI } from "../API/Nogoogle";

function Register() {
  const [nickname, setNickname] = useState("");
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false); // 중복 여부 상태 추가
  const [isPasswordMatch, setIsPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가
  const [isEmailValid, setIsEmailValid] = useState(true); // 이메일 유효성 상태 추가
  const [isPasswordValid, setIsPasswordValid] = useState(true); // 비밀번호 유효성 상태 추가
  const navigate = useNavigate();

  //중복 체크
  const handleDUPCheck = async () => {
    const checkData = { email: credentials.id };

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.id)) {
      alert("올바르지 않은 이메일 형식입니다.");
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }
    try {
      const response = await postDUPAPI(checkData);
      setIsIdAvailable(response.data);
      setIsIdDuplicated(!response.data);
      if (response.data) {
        alert("사용할 수 있는 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 확인 실패:", error);
    }
  };

  const handleRegister = async () => {
    // 모든 인풋이 채워졌는지 확인
    if (
      !credentials.id ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !nickname
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (!isIdAvailable) {
      alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!isEmailValid) {
      alert("올바르지 않은 이메일 형식입니다.");
      return;
    }
    if (!isPasswordValid) {
      alert("비밀번호는 영어,숫자, 특수문자포함 8자~20자여야 합니다.");
      return;
    }
    const userData = {
      name: nickname,
      email: credentials.id,
      password: credentials.password,
    };
    try {
      await postRegisterAPI(userData);
      alert("회원가입이 완료되었습니다. 로그인페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <SignUpContainer>
      <LogoSection>
        <LoginLogo src={LoginLogoImage} alt="Login Logo" />
      </LogoSection>
      <GoogleLoginSection>
        <Title>회원가입</Title>
        <Container>
          <FlexDiv>
            <Label>아이디</Label>
            {isIdDuplicated && <RedLabel>중복된 이메일 주소에요</RedLabel>}
          </FlexDiv>
          <InputIdContainer>
            <InputId
              type="text"
              placeholder="이메일 주소를 입력해주세요."
              value={credentials.id}
              onChange={(e) =>
                setCredentials({ ...credentials, id: e.target.value })
              }
            />
            <DuplicationCheckButton onClick={handleDUPCheck}>
              중복 확인
            </DuplicationCheckButton>
          </InputIdContainer>
        </Container>
        <Container>
          <FlexDiv>
            <Label>비밀번호</Label>
            {!isPasswordValid && (
              <RedLabel>
                올바르지 않은 비밀번호 형식이에요
              </RedLabel>
            )}
          </FlexDiv>
          <InputPassword
            type="password"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
            value={credentials.password}
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
              const passwordRegex =
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
              setIsPasswordValid(passwordRegex.test(e.target.value));
              if (
                credentials.confirmPassword &&
                e.target.value !== credentials.confirmPassword
              ) {
                setIsPasswordMatch(false);
              } else {
                setIsPasswordMatch(true);
              }
            }}
          />
        </Container>
        <Container>
          <FlexDiv>
            <Label>비밀번호 확인</Label>
            {!isPasswordMatch && (
              <RedLabel>비밀번호가 일치하지 않아요</RedLabel>
            )}
          </FlexDiv>
          <CheckPassword
            type="password"
            placeholder="비밀번호 재입력"
            value={credentials.confirmPassword}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                confirmPassword: e.target.value,
              });
              if (
                credentials.password &&
                e.target.value !== credentials.password
              ) {
                setIsPasswordMatch(false);
              } else {
                setIsPasswordMatch(true);
              }
            }}
          />
        </Container>
        <Container>
          <FlexDiv>
            <Label>사용자 이름</Label>
          </FlexDiv>
          <InputUserName
            type="text"
            placeholder="이름을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Container>
        <SignUpButton onClick={handleRegister}>가입하기</SignUpButton>
      </GoogleLoginSection>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
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
  margin-right: 105px;
`;

const LoginLogo = styled.img`
  width: 479px;
  height: 224px;
`;

const GoogleLoginSection = styled.div`
  display: flex;
  justify-content: start;
  width: 567px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 32px;
  font-weight: 400;
  color: #040404;
  margin-bottom: 16px;
  margin-left: 300px;
  margin-right: 300px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const InputIdContainer = styled.div`
  display: flex;
  align-items: center;
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
  margin-bottom: 24px;
  padding: 0px;
  justify-content: space-between;
`;

const Label = styled.label`
  padding-left: 30px;
  color: #040404;
  font-family: "Product Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 8px;
`;

const RedLabel = styled.div`
  color: #ff6a6a;
  font-family: "Product Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 8px;
`;

const InputId = styled.input`
  width: 100%;
  height: 84px;
  text-indent: 20px;
  border-radius: 10px;
  border: none;
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
  z-index: 300;
`;

const DuplicationCheckButton = styled.button`
  width: 119px;
  height: 42px;
  padding: 0px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #5ba8fb;
  border: none;
  color: #fff;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
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

const CheckPassword = styled.input`
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
  margin-bottom: 24px;
  padding: 0px;
`;

const InputUserName = styled.input`
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
  margin-bottom: 24px;
  padding: 0px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 84px;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  color: #fff;
  font-family: "Product Sans";
  font-size: 20px;

  font-weight: 400;
  line-height: normal;
  border-radius: 10px;
  border: none;
  background: #5ba8fb;
  padding: 0px;
  margin-top: 30px;
`;

export default Register;
