import axios from "axios";

const server = process.env.REACT_APP_API_URL;

//LIKE POST
export const postLikeAPI = async (listId, userId, data) => {
    try {
        console.log("Like Post 데이터:", data);
        const response = await axios.post(`${server}/states/likes/${listId}/${userId}`, data);
        return response;
    } catch (error) {
        console.error("Error while saving like data:", error);
        throw error;
    }
};


//UNLIKE POST
export const postUnlikeAPI = async (listId, userId, data) => {
    try{
        console.log("Unlike Post 데이터:", data);
        const response = await axios.post(`${server}/states/unlikes/${listId}/${userId}`);
        return response;
    } catch (error){
        console.error("Error while saving unlike data:", error);
        throw error;
    }
};

//ALIGN POST
export const postAlignAPI = async (listId, userId, data) => {
    try{
        console.log("Align Post 데이터:", data);
        const response = await axios.post(`${server}/states/align/${listId}/${userId}`);
        return response;
    } catch (error){
        console.error("Error while saving unlike data:", error);
        throw error;
    }
};