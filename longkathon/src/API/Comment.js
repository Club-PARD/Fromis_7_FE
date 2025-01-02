import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// POST
export const postCommentAPI = async (listId, userId, data) => {
    try {
        console.log("전달된 데이터:", data); // 데이터 확인
        const response = await axios.post(`${server}/comment/2/5`, data); // 경로 수정 필요 시 반영
        return response;
    } catch (error) {
        console.error("Error while saving comment data:", error);
        throw error;
    }
};

// DELETE
export const deleteCommentAPI = async (commentId) => {
    try {
        const response = await axios.delete(`${server}/comment/${commentId}`);
        return response;
    } catch (error) {
        console.error("Error while deleting comment data:", error);
        throw error;
    }
};
