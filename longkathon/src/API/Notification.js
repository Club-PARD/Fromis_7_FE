import axios from "axios";
const server = process.env.REACT_APP_API_URL;

// 알림 데이터를 가져오는 함수
export const getAlarmAPI = async (userId) => {
  try {
    const response = await axios.get(
      `${server}/notifications?userId=${userId}`
    );
    console.log("데이터를 불러오는데 성공했습니다!");
    console.log("유저아이디: ", userId);
    console.log("data", response.data);
    return {
      notifications: response.data.data,
      createdAt: response.data.createdAt,
    };
  } catch (error) {
    console.error("Error Get notifications:", error); // 에러 출력
    console.log("Failed to fetch notifications."); // 호출 실패 시 메시지 출력
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};
