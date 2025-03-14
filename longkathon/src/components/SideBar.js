import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddLinkImage from "../Image/SideBarImage.png";
import UrlShareButton from "../Image/UrlShareButton.png";
import { useNavigate } from "react-router-dom";
import ModalAdd from "./ModalAdd";
import { getPieceAPI } from "../API/Piece";
import axios from "axios";
import { getAlarmAPI } from "../API/Notification";
import { userIdState } from "../recoil/recoilState";
import { useRecoilValue } from "recoil";

// Sidebar Component
const SideBar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const userId = useRecoilValue(userIdState); // Recoil에서 userId 값 가져오기

  console.log("User ID:", userId);

  // 페이지 이동 함수
  const handleConnectHome = () => {
    if (userId) {
      navigate(`/${userId}/main`);
    } else {
      console.error("User ID is not available");
    }
  };

  const handleConnectMakeTitle = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (payload) => {
    console.log("Payload saved:", payload);
    closeModal();
  };

  // 카테고리 데이터를 가져오는 함수
  const fetchCategories = async () => {
    try {
      const response = await getPieceAPI(1); // 서버 API 엔드포인트
      setCategories(response); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [categories, setCategories] = useState([]);

  // 새로운 카테고리 추가
  const handleAddPiece = (newPiece) => {
    setCategories((prevCategories) => [...prevCategories, newPiece]); // 새 데이터를 기존 목록에 추가
  };

  // 알림 데이터를 가져오는 함수
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://fromis7.store:8080/notifications?userId=${userId}`
      );
      console.log("알림 데이터:", response.data); // 서버에서 받은 데이터 로그
      setNotifications(response.data.map((item) => item.data)); // 알림 데이터 저장
      setCreatedAt(response.data.map((item) => item.createdAt)); // 모든 생성 시간 저장
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // 카테고리 데이터 가져오기
    fetchNotifications(); // 알림 데이터 가져오기
  }, []);

  // 링크 복사
  const handleShare = () => {
    const currentUrl = window.location.href; // 현재 페이지의 URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000); // 2초 후 알림 숨기기
      })
      .catch((error) => console.error("Failed to copy the link:", error));
  };

  const handleAlarmButtonClick = async () => {
    try {
      const data = await getAlarmAPI(2); // 사용자 ID를 2로 설정
      console.log("알림 데이터:", data.notifications); // 알림 데이터 출력
      console.log("생성 시간:", data.createdAt); // 생성 시간 출력
      setNotifications(data.notifications); // 알림 데이터를 상태에 저장
      setCreatedAt(data.createdAt); // 생성 시간을 상태에 저장
      setIsAlarmModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  // 모달 열기
  const openCustomModal = () => {
    const contentWithTime = notifications.map((notification, index) => ({
      message: notification,
      time: createdAt[index], // 생성 시간 추가
    }));
    setModalContent(contentWithTime); // 알림 데이터와 시간을 모달에 설정
    setIsCustomModalOpen(true);
  };

  // 모달 닫기
  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
  };

  return (
    <>
      <SidebarContainer>
        <MenuList>
          <AddContainer onClick={handleConnectMakeTitle}>
            <HoverableMenuItem
              icon={SideAddButton}
              // imageSrc={AddLinkImage}
              color="primary:#5ba8fb"
              width={40}
              height={40}
            />
          </AddContainer>
          <MenuItem>
            <HomeContainer onClick={handleConnectHome}>
              <SideHomeButton color="primary:#040404" width={40} height={40} />
            </HomeContainer>
          </MenuItem>
          <MenuItem onClick={handleShare}>
            <SideShareButton color="primary:#040404" width={40} height={40} />
            {isLinkCopied && (
              <ShareImage src={UrlShareButton} alt="URL Shared" />
            )}
          </MenuItem>
          <MenuItem onClick={openCustomModal}>
            <SideAlramButton color="primary:#040404" width={40} height={40} />
          </MenuItem>
        </MenuList>
      </SidebarContainer>

      <ModalAdd
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        onAddPiece={handleAddPiece}
      />
      {isAlarmModalOpen && (
        <AlarmModal
          notifications={notifications}
          createdAt={createdAt}
          onClose={() => setIsAlarmModalOpen(false)}
        />
      )}
      {isCustomModalOpen && (
        <CustomModal onClose={closeCustomModal}>
          {modalContent.length > 0 ? (
            modalContent.map((item, index) => (
              <p key={index}>
                {item.message} - {new Date(item.time).toLocaleString()}
              </p>
            ))
          ) : (
            <p>알림이 없습니다.</p>
          )}
        </CustomModal>
      )}
    </>
  );
};

// HoverableMenuItem Component
const HoverableMenuItem = ({ icon: Icon, color, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MenuItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon color={color} width={width} height={height} />
      <HoverImage $isVisible={isHovered}>
        <CenteredText>함께 링크하기</CenteredText>
      </HoverImage>
    </MenuItem>
  );
};

// Icon Components
const AddContainer = styled.div``;

const HomeContainer = styled.div``;

export const SideAddButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/hqymfzvj.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideHomeButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/cnpvyndp.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideAlramButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/vspbqszr.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

export const SideShareButton = ({ color, width, height }) => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/ercyvufy.json"
      trigger="hover"
      colors={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></lord-icon>
  );
};

// Styled Components
const SidebarContainer = styled.div`
  position: fixed;
  right: 80px;
  top: 62px;
  width: 85px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #afb8c1;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 21px;
  cursor: pointer;
  position: relative;
`;

const HoverImage = styled.div`
  width: 243px;
  height: 59px;
  background-color: #5ba8fb;
  color: #ffffff;
  position: absolute;
  right: 40px;
  transform: translateY(-35%);
  transition: opacity 0.3s ease;
  border-radius: 20px 0 20px 20px;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
`;

const ShareImage = styled.img`
  position: absolute;
  right: 40px;
  align-items: center;
  width: 243px; /* 이미지 크기 */
  height: auto;
  bottom: -40px; /* 아래로 내리기 */
`;

const CenteredText = styled.div`
  font-family: "Product Sans", sans-serif;
  font-size: 20px;
  text-align: center;
  z-index: 2000px;
`;

const AlarmModal = ({ notifications, createdAt, onClose }) => {
  if (!notifications.length) {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <p>알림이 없습니다.</p>
          <button onClick={onClose}>닫기</button>
        </ModalContent>
      </ModalOverlay>
    );
  }

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>알림</h3>
        {notifications.map((notification, index) => (
          <AlarmMessage key={index}>
            {formattedDate} - {notification}
          </AlarmMessage>
        ))}
        <AlarmDate>생성 시간: {formattedDate}</AlarmDate>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  padding-left: 1150px;
  padding-top: 350px;
  z-index: 800;
`;

const ModalContent = styled.div`
  padding-left: 20px;
  padding-right: 45px;
  padding-top: 20px;
  width: 240px;
  height: 248px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border-radius: 20px 0px 20px 20px;
  background: linear-gradient(149deg, #f0f8ff 0.77%, #f2f1f8 99.23%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 900;
  position: relative;
  right: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const AlarmMessage = styled.label`
  width: 175px;
  height: 28px;
  color: #000;
  font-family: "Product Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  background-color: yellow;
`;

const AlarmDate = styled.label`
  background-color: red;
  color: #afb8c1;
  font-family: "Product Sans Black";
  font-size: 8px;
  font-style: normal;
  font-weight: 900;
  line-height: 12px; /* 150% */
`;

// 커스텀 모달 컴포넌트
const CustomModal = ({ onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default SideBar;
