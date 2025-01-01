import React from "react";
import styled from "styled-components";

const MainRightViewContainer = ({ width = "411px", height = "383px", style, users = [] }) => {
  const formatDate = (dateString) => {
    if (typeof dateString !== 'string') {
      return "Invalid Date"; // dateString이 문자열이 아니면 에러 메시지 반환
    }

    const [day, month, year] = dateString.split("-"); // 하이픈으로 분리

    if (!year || !month || !day) {
      return "Invalid Date"; // 기본 값 또는 에러 메시지
    }

    const months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    // 월 변환 및 일 앞에 0 붙이기
    const formattedMonth = months[parseInt(month, 10)] || month;
    const formattedDay = day.padStart(2, "0");

    return `${formattedMonth} ${formattedDay}, ${year}`;
  };

  return (
    <StyledCard style={{ width, height, ...style }}>
      <TextContainer>
      {users.map((user, index) => {
          // 날짜를 문자열로 결합하여 formatDate 함수에 전달
          const startDate = formatDate(`${user.startDay}-${user.startMonth}-${user.startYear}`);
          const endDate = formatDate(`${user.endDay}-${user.endMonth}-${user.endYear}`);

          // 날짜 범위가 유효한지 체크
          const dateRange = startDate === "Invalid Date" || endDate === "Invalid Date"
            ? "Invalid Date Range"
            : `${startDate} - ${endDate}`;

          console.log("Date Range:", dateRange); // 디버깅용 콘솔 출력

          return (
            <div key={index}>
              <TitleBox>
                <RightViewText>제목</RightViewText>
                <LinkTitle>{user.title}</LinkTitle>
              </TitleBox>
              <DateBox>
                <RightViewText>날짜</RightViewText>
                <LinkDate>{dateRange}</LinkDate>
              </DateBox>
              <MemberBox>
                <RightViewText>멤버</RightViewText>
                <MemberCard>
                  {user.memberNames.map((name, idx) => (
                    <LinkMember key={idx}>{name}</LinkMember>
                  ))}
                </MemberCard>
              </MemberBox>
            </div>
          );
        })}
      </TextContainer>
    </StyledCard>
  );
};

const StyledCard = styled.div`
cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  opacity: 0.7;
  background: linear-gradient(149deg, #f0f8ff 0.77%, #f2f1f8 99.23%);
`;

const TextContainer = styled.div`
  position: relative;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 33px;
  left: 34px;
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 109px;
  left: 34px;
`;

const MemberBox = styled.div`
  width: 287px;
  height: 136px;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: absolute;
  top: 175px;
  left: 34px;
`;

const MemberCard = styled.div`
  margin-top: 4px;
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 가능하도록 설정 */
  gap: 12px; /* 카드 간격 설정 */
`;

const RightViewText = styled.div`
  color: #afb8c1;
  font-family: "Product Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
`;

const LinkTitle = styled.div`
  color: #040404;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 100% */
  position: absolute;
  top: 16px;
  width: 343px;
  height: 45px;
`;

const LinkDate = styled.div`
  color: #040404;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  position: absolute;
  top: 16px;
  width: 343px;
`;

const LinkMember = styled.div`
  color: #040404;
  font-family: "Product Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  width: 77px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainRightViewContainer;
