import axios from "axios";
//로그인
const server = process.env.REACT_APP_API_URL;

// POST - Login
export const postLoginAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/signin/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Retdata = response.data;
    return response;
  } catch (error) {
    console.error("로그인에 문제가 있어요ㅜㅜ", error);
    throw error;
  }
};

// POST - SignUp (Duplication Check)
export const postDUPAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/signin/logincheck`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("아이디 중복 확인에 문제가 있어요ㅜㅜ", error);
    throw error;
  }
};

// POST - Register
export const postRegisterAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/signin/access`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("회원가입에 문제가 있어요ㅜㅜ", error);
    throw error;
  }
};
