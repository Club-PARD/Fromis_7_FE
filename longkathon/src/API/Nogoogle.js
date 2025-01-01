import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// POST - Login
export const postLoginAPI = async (data) => {
    try {
        console.log("POST - login 데이터:", data);
        const response = await axios.post(`${server}/signin/login`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        const Retdata = response.data;
        console.log(Retdata);
        return response;
    } catch (error) {
        console.error("로그인에 문제가 있어요ㅜㅜ", error);
        throw error; 
    }
};

// POST - SignIn
export const postSignInAPI = async (data) => {
    try {
        console.log("POST - signup:", data);
        const response = await axios.post(`${server}/signin/access`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    } catch (error) {
        console.error("회원가입에 문제가 있어요ㅜㅜ", error);
        throw error; 
    }
};
