import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DayContainerImage from "../Image/DayContainer.png";

const DayCard = ({ width = "217px", height = "332px", style, targetDate }) => {
  const [dayText, setDayText] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDayCount = () => {
      // targetDate가 "2025.01.01" 형식일 때 이를 "YYYY-MM-DD"로 변환
      const formattedTargetDate = targetDate.replace(".", "-");
      const target = new Date(formattedTargetDate); // 날짜 형식에 맞게 변환

      // 현재 날짜와 비교
      const today = new Date();
      const timeDiff = target.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
      const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (dayDiff === 0) {
        setDayText("D-Day");
      } else if (dayDiff > 0) {
        setDayText(`D-${dayDiff}`);
      } else {
        setDayText(`D+${Math.abs(dayDiff)}`);
      }

      // 월과 일을 두 자리로 포맷하여 설정
      const formattedMonth = String(target.getMonth() + 1).padStart(2, "0"); // getMonth는 0부터 시작하므로 +1
      const formattedDate = String(target.getDate()).padStart(2, "0");

      setMonth(formattedMonth);
      setDate(formattedDate);
    };

    // 초기 계산
    updateDayCount();

    // 자정마다 업데이트
    const interval = setInterval(() => {
      updateDayCount();
    }, 1000 * 60 * 60 * 24); // 24시간마다 업데이트

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 정리
  }, [targetDate]);

  return (
    <Container>
      <StyledCard style={{ width, height, ...style }}>
        <DayCount>{dayText}</DayCount>
        <DateText type="month">{month}</DateText>
        <DateText type="date">{date}</DateText>
        <Text1>month</Text1>
        <Text2>date</Text2>
        <DateBar />
      </StyledCard>
    </Container>
  );
};

const Container = styled.div` 
cursor: pointer;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${DayContainerImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayCount = styled.div`
  position: absolute;
  top: 59px;
  color: #040404;
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`;

const DateBar = styled.div`
  width: 88px;
  height: 1px;
  background: #040404;
  position: absolute;
  top: 196px;
`;

const DateText = styled.div`
  position: absolute;
  top: ${(props) => (props.type === "month" ? "120px" : "198px")};
  left: ${(props) => (props.type === "date" ? "101px" : "36px")};
  font-size: 16px;
  color: #040404;
  text-align: right;
  font-family: "Product Sans";
  font-size: 60px;
  font-weight: 700;
  line-height: 80px; /* 133.333% */
`;

const Text1 = styled.div`
  // 원하는 스타일 추가
  color: #AFB8C1;
font-family: "Product Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 12px; /* 100% */
position: absolute;
top:169px;
left:102px;
`;

const Text2 = styled.div`
  // 원하는 스타일 추가
  color: #AFB8C1;
font-family: "Product Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 12px; /* 100% */
position: absolute;
top:249px;
left:77px;
`;

export default DayCard;
