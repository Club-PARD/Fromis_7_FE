//Login.js
import axios from "axios";

//경로 지정
const server = "http://localhost:8080"; //.env에 넣기

//get
export const getLogin = async (userId) => {
    try{
        const response = await axios.get(`${server}/api/login/${userId}`);
    return response.data;
    } catch(error){
        console.error("Error fetching() user data: ", error);  
        throw error;
    } 
};

//post
export const postLogin = async (data) => {
    try{
        console.log(data);
        const response = await axios.post(`${server}/api/login`, data);
        return data;
    } catch(error){
        console.error("Error fetching() user data: ", error);
        throw error;
    }
};

//patch
export const patchLogin = async (data, userId) => {
    try{
        console.log(data);
        const response = await axios.patch(`${server}/api/login/${userId}`, data);
        return data;
    } catch(error){
        console.error("Error fetching() user data: ", error);
        throw error;
    }
};

//delete
export const deleteLogin = async (userId) => {
    try{
        const response = await axios.delete(`${server}/api/login/${userId}`);
        return response.data;
    } catch(error){
        console.error("Error fetching() user data: ", error);
        throw error;
    }
};