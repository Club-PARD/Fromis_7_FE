import React, { useState } from "react";
import styled from "styled-components";

const LikeButton = () => {
  // 전체 좋아요 수를 관리하는 상태
  const [globalCount, setGlobalCount] = useState(0);

  // `toggleLike` 함수는 전체 좋아요 수를 증가 또는 감소
  const toggleLike = (like_status) => {
    setGlobalCount((prevCount) => (like_status ? prevCount - 1 : prevCount + 1));
  };

  return (
    <Container>
      <LikeImage
        color="primary:#040404"
        width={65}
        height={65}
        globalCount={globalCount}
        toggleLike={toggleLike}
      />
    </Container>
  );
};

export const LikeImage = ({ color, width, height, globalCount, toggleLike }) => {
  // 개별 사용자의 좋아요 상태 관리
  const [like_status, setLikeStatus] = useState(false);

  const handleClick = () => {
    toggleLike(like_status); // 전체 좋아요 수를 업데이트
    setLikeStatus((prevStatus) => !prevStatus); // 좋아요 상태를 토글
  };

  return (
    <Wrapper>
      <lord-icon
        src="https://cdn.lordicon.com/xyboiuok.json"
        trigger="click"
        state={like_status ? "morph-heart" : undefined} // 좋아요 상태에 따라 애니메이션 적용
        colors={like_status ? color : undefined} // 좋아요 상태에 따라 색상 적용
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={handleClick}
      ></lord-icon>
      <StateText> {globalCount}</StateText> {/* 전체 좋아요 수 출력 */}
    </Wrapper>
  );
};

const Container = styled.div`
  z-index: 100; /* 다른 요소 위로 올라오게 설정 */
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: normal;
  margin-left: 183px;
  margin-top: 23px;
  gap: 26px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 아이콘과 텍스트 사이 간격 */
`;

const StateText = styled.span`
  font-size: 16px;
  color: #000; /* 텍스트 색상 */
`;

export default LikeButton;
