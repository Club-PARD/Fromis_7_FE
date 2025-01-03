// utils/colorImageMap.js
import XRed from "../Image/X_red.png";
import XOrange from "../Image/X_orange.png";
import XGreen from "../Image/X_green.png";
import XBlue from "../Image/X_blue.png";
import XSkyblue from "../Image/X_skyblue.png";
import XPurple from "../Image/X_purple.png";
import XPink from "../Image/X_pink.png";
import XGray from "../Image/X_gray.png";
import XBlack from "../Image/X_black.png";

// Color와 Image의 맵핑 데이터
export const colorImageMap = [
    { color: "#EA7E7A", image: XRed },
    { color: "#FBA96F", image: XOrange },
    { color: "#9ED4B6", image: XGreen },
    { color: "#5BA8FB", image: XSkyblue },
    { color: "#002ED1", image: XBlue },
    { color: "#D9A9ED", image: XPink },
    { color: "#927CFF", image: XPurple },
    { color: "#BDBDBD", image: XGray },
    { color: "#424242", image: XBlack },
];

// 특정 Color에 해당하는 Image 가져오는 헬퍼 함수
export const getImageByColor = (color) => {
    const entry = colorImageMap.find((item) => item.color === color);
    return entry ? entry.image : null; // 색상이 없으면 null 반환
};
