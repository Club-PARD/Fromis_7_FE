import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// GET => lists/{listId}
export const getListAPI = async (listId) => {
    try {
        // const response = await axios.get(`${server}/lists/${listId}`);
        const response = await axios.get(`${server}/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching(listId) list data:", error);
        throw error;
    }
};

// GET => lists/all/{categoryId}
export const getAllListAPI = async (categoryId) => {
    try{
        //const response = await axios.get(`${server}/lists/all/${categoryId}`);
        const response = await axios.get(`${server}/lists/all/${categoryId}`);
        return response.data;
    } catch (error){
        console.error("Error fetching(categoryId) list data:", error);
        throw error;
    }
};