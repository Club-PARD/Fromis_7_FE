import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// POST
export const postPieceAPI = async (userId, data) => {
    try {
        console.log("POST 데이터:", data);
        // const response = await axios.post(`${server}/piece/${userId}`, data);
        const response = await axios.post(`${server}/pieces/1`, data);
        return response;
    } catch (error) {
        console.error("Error while saving piece data:", error);
        throw error; 
    }
};

//GET
export const getPieceAPI = async (userId) => { //
    try{
        const response = await axios.get(`${server}/pieces/all/${userId}`);
        return response;
    } catch (error){
        console.error("Error fetching(userId) user data:", error);
        throw error;
    }
};

//PATCH
export const updatePieceAPI = async(pieceId, data) => {
    try{
        const response = await axios.patch(`${server}/pieces/${pieceId}`, data);
        return response;
    } catch (error){
        console.error("Error updating piece data:", error);
        throw error;
    }
}

//DELETE
export const deletePieceAPI = async(pieceId) => {
    try{
        const response = await axios.delete(`${server}/pieces/${pieceId}`);
        return response;
    } catch (error){
        console.error("Error deleting piece data:", error);
        throw error;
    }
}