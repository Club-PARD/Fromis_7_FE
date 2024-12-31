import axios from "axios";

const server = process.env.REACT_APP_API_URL;

//POST
export const postLikeAPI = async (listId, userId, data) => {
    try{
        console.log("Like Post 데이터:", data);
        const response = await axios.post(`${server}/likes/${listId}/${userId}`, data);
        return response;
    } catch (error) {
        console.error("Error while saving like data:", error);
        throw error;
    }
}