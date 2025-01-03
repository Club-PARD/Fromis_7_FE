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

// PATCH
export const updateListAPI = async (listId, data) => {
    try {
        const response = await axios.patch(`${server}/lists/${listId}`, data);
        return response;
    } catch (error) {
        console.error("Error updating list data:", error);
        throw error;
    }
};


// DELETE
export const deleteListAPI = async (listId) => {
    try{
        const response = await axios.delete(`${server}/lists/${listId}`);
        return response;
    } catch (error){
        console.error("Error deleting list data:", error);
        throw error;
    }
}