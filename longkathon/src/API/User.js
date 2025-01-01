import axios from "axios";

const server = process.env.REACT_APP_API_URL;

//POST
export const postUserAPI = async (data) => {
    try {
        console.log("User Post 데이터:", data);
        const response = await axios.post(`${server}/users`, data);
        return response;
    } catch (error) {
        console.error("Error while saving user data:", error);
        throw error;
    }
};


//GET
export const getUserAPI = async (userId) => {
    try{
        const response = await axios.get(`${server}/users/${userId}`);
        return response;
    } catch (error){
        console.error("Error fetching(userId) user data:", error);
        throw error;
    }
};


//PATCH
//이름
export const patchUserNameAPI = async (userId, data) => {
    try {
        console.log("PATCH 데이터:", data);
        const response = await axios.patch(`${server}/users/${userId}/username`, data, {
            headers: { "Content-Type": "application/json" }, // FormData 사용 시
        });
        return response;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

//이미지
export const patchUserImageAPI = async (userId, formData) => {
    try {
        const response = await axios.patch(`${server}/users/${userId}/uploadImage`, formData);
        return response;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};



//DELETE
export const deleteUserAPI = async (userId) => {
    try{
        const response = await axios.delete(`${server}/users/${userId}`);
        return response;
    } catch (error){
        console.error("Error deleting user data:", error);
        throw error;
    }
}