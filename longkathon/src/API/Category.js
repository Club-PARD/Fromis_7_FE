import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// POST
export const postPieceAPI = async (pieceId, data) => {
    try {
        console.log("POST 데이터:", data);
        //const response = await axios.post(`${sercer}/pieces/${userId}`, data{뭐시기뭐시기로 보내야함})
        const response = await axios.post(`${server}/categories/1`, data, {
            headers: {
              "Content-Type": "application/json", 
            },
          });
        console.log("요청 헤더:", response.config.headers);
        return response;
    } catch (error) {
        console.error("Error while saving piece data:", error);
        console.error("요청 헤더:", error.config?.headers);
        throw error;
    }
};

//GET
export const getCategoryAPI = async (pieceId) => { //
    try{
        //const response = await axios.get(`${server}/categories/all/${pieceId}`);
        const response = await axios.get(`${server}/categories/all/1`);
        return response.data;
    } catch (error){
        console.error("Error fetching categories error:", error);
        throw error;
    }
};

// //DELETE
// export const deletePieceAPI = async(pieceId) => {
//     try{
//         const response = await axios.delete(`${server}/pieces/${pieceId}`);
//         return response;
//     } catch (error){
//         console.error("Error deleting piece data:", error);
//         throw error;
//     }
// };