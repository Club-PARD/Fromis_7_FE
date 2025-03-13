import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userIdState } from "../recoil/recoilState";

const UserIdProvider = ({ userId, children }) => {
  const setUserId = useSetRecoilState(userIdState);

  React.useEffect(() => {
    setUserId(userId); // userId 상태 업데이트
  }, [userId, setUserId]);

  return <RecoilRoot>{children}</RecoilRoot>; // children에 있는 모든 컴포넌트를 RecoilRoot로 감쌈
};

export default UserIdProvider;
