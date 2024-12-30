import axios from "axios";

const server = "http://fromis7.store:8080"; 

//POST
export const postUserAPI = async (data) => {
    try{
        console.log("User Post 데이터:", data);
        const response = await axios.post(`${server}/users`, data);
        return response;
    } catch (error){
        console.error("Error while saving user data:", error);
        throw error;
    }
};

//GET


//PATCH


//DELETE