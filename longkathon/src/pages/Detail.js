import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";

import BackGround from "../Image/DetailBackground.png";
import BeforeShare from "../Image/BeforeShare.png";
import AfterShare from "../Image/AfterShare.png";
import SubmitButton from "../Image/SubmitButton.png";

import axios from "axios";

import { postLikeAPI, postUnlikeAPI, postAlignAPI } from "../API/State";

const DetailPage = ({ propUserId, propListId }) => {
    const [userId, setUserId] = useState(propUserId || 1);
    const [listId, setListId] = useState(propListId || 1); // 동적 할당 가능하도록 설정 -> 동적 하게 하려면 1대신 null로 설정


    const [thumbUpColor, setThumbUpColor] = useState("#dcdcdc");
    const [thumbDownColor, setThumbDownColor] = useState("#dcdcdc");
    const [commentColor, setCommentColor] = useState("#dcdcdc")
    const [isShared, setIsShared] = useState(false);
    const [sharedCount, setSharedCount] = useState(0); // 공유 카운트 상태 추가

    const [comments, setComments] = useState([]); // 초기 상태를 빈 배열로 설정

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [image, setImage] = useState(null); // 업로드된 이미지를 저장

    const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부를 나타내는 상태

    const [infoData, setInfoData] = useState({
        url: "http://fromis_7.link",
        name: "숙소 이름 여기에...",
        memo: "메모를 입력해주세요",
    });

    const [tempMemo, setTempMemo] = useState(infoData.memo); // tempMemo 상태 추가
    const handleEditToggle = () => {
        setIsEditable((prev) => !prev); // 수정 가능 여부를 토글
    };


    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    };

    //댓글 개수 동기화
    useEffect(() => {
        setCommentCount(comments.length);
    }, [comments]);

    useEffect(() => {
        const fetchUserAndListIds = async () => {
            try {
                // userId가 없으면 fetch
                if (!userId) {
                    const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/1`);
                    setUserId(userResponse.data.userId);
                }

                // listId가 없으면 fetch
                if (!listId) {
                    const listResponse = await axios.get(`${process.env.REACT_APP_API_URL}/categories/1`);
                    setListId(listResponse.data.listId);
                }
            } catch (error) {
                console.error("Error fetching userId or listId:", error);
            }
        };

        fetchUserAndListIds();
    }, [userId, listId]); // userId와 listId를 의존성 배열에 추가

    const handleLike = async () => {
        try {
            // listId와 userId 확인
            if (!userId || !listId) {
                console.error("User ID 또는 List ID가 없습니다.");
                return;
            }

            // 좋아요 데이터 구성
            const likeData = {
                listId, // 현재 리스트 ID
                userId, // 현재 사용자 ID
            };

            // 서버로 좋아요 요청 보내기
            const response = await postLikeAPI(listId, userId, likeData);

            // 서버 응답 처리
            const isLiked = response.data; // 서버 응답이 true 또는 false라고 가정
            if (liked) {
                // 좋아요 상태 해제
                setLikeCount((prev) => prev - 1);
                setLiked(false);
                setThumbUpColor("#dcdcdc");
            } else {
                // 좋아요 상태 설정
                setLikeCount((prev) => prev + 1);
                setLiked(true);
                setThumbUpColor("#5BA8FB");

                // 싫어요 상태 해제
                if (disliked) {
                    setDislikeCount((prev) => prev - 1);
                    setDisliked(false);
                    setThumbDownColor("#dcdcdc");
                }
            }
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    const handleDislike = () => {
        try {
            if (!listId || !userId) {
                console.error("listId 또는 userId가 정의되지 않았습니다.", listId, userId);
                return;
            }
            const dislikeData = {
                listId,
                userId,
            };
            const response = postUnlikeAPI(listId, userId, dislikeData);
            const isDisliked = response.data;
            if (disliked) {
                // 싫어요 상태 해제
                setDislikeCount((prev) => prev - 1);
                setDisliked(false);
                setThumbDownColor("#dcdcdc");
            } else {
                // 싫어요 상태 설정
                setDislikeCount((prev) => prev + 1);
                setDisliked(true);
                setThumbDownColor("#5BA8FB");

                // 좋아요 상태 해제
                if (liked) {
                    setLikeCount((prev) => prev - 1);
                    setLiked(false);
                    setThumbUpColor("#dcdcdc");
                }
            }
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    const handleSharedClick = async () => {
        try {
            // userId와 listId 기본값 설정
            const currentUserId = userId || 1;
            const currentListId = listId || 1;
    
            const alignData = {
                listId: currentListId,
                userId: currentUserId,
            };
    
            console.log("Align Post 데이터:", alignData);
    
            // 서버로 데이터 전송
            const response = await postAlignAPI(currentListId, currentUserId, alignData);
    
            console.log("Align API 응답 데이터:", response.data);
    
            // 서버 응답 처리
            if (response.status === 201 && response.data === true) {
                setIsShared((prevState) => !prevState); // 이전 상태를 안전하게 참조
                setSharedCount((prevState) => prevState + 1);
            } else if (response.status === 201 && response.data === false) {
                setIsShared((prevState) => !prevState);
                setSharedCount((prevState) => (prevState > 0 ? prevState - 1 : 0)); // 카운트 감소 처리
            } else {
                console.error("Align API 호출 실패:", "응답 데이터가 예상과 다릅니다.");
            }
        } catch (error) {
            console.error("Error during align post:", error.response ? error.response.data : error.message);
        }
    };
        
    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                name: "사용자", // 사용자 이름은 실제 프로젝트에서 동적으로 가져올 수 있습니다.
                text: commentText,
                time: `${getCurrentTime()} 방금 전`, // 현재 시간 추가
            };
            setComments((prev) => [...prev, newComment]);
            setCommentText(""); // 입력창 초기화
        }
    };

    const toggleCommentInput = () => {
        setShowCommentInput((prev) => !prev);
        setCommentColor((prevColor) => (prevColor === "#dcdcdc" ? "#5BA8FB" : "#dcdcdc"));
    };

    // lordicon 클릭 시 수정 모드 활성화
    const handleMemoEdit = () => {
        setIsEditable(true); // 수정 모드 활성화
        setTempMemo(infoData.memo); // 기존 메모를 tempMemo에 복사
    };

    // 저장 버튼 클릭 시 tempMemo를 infoData.memo에 저장
    const handleMemoSave = () => {
        setInfoData((prev) => ({
            ...prev,
            memo: tempMemo, // tempMemo 내용을 infoData.memo에 저장
        }));
        setIsEditable(false); // 수정 모드 비활성화
    };

    return (
        <Container>
            <MainBenner>
                <HeaderComponent />
            </MainBenner>
            <MainContainer showCommentInput={showCommentInput}> {/* showCommentInput 전달 */}
                <CancelButton>
                    <lord-icon
                        src="https://cdn.lordicon.com/zxvuvcnc.json"
                        trigger="hover"
                        colors="primary:#5ba8fb"
                        style={{ width: "80px", height: "80px" }}>
                    </lord-icon>
                </CancelButton>
                <CategoryRow>
                    <CategoryBox />
                    <TitleButtonBox>
                        <Title>categories:</Title>
                        <CategoryButton>숙소</CategoryButton>
                    </TitleButtonBox>
                    <EditButton onClick={handleEditToggle}>
                        Add
                    </EditButton>
                </CategoryRow>
                <InfoContainer>
                    <InputLabel>URL:</InputLabel>
                    <InputBox placeholder="wwww.example.com" />
                    <ImageBox isEditable={isEditable}>
                        {image ? (
                            <UploadedImage src={image} alt="업로드된 이미지" />
                        ) : (
                            <PlaceholderText>이미지를 업로드 해주세요</PlaceholderText>
                        )}

                    </ImageBox>
                    <InputBox placeholder="숙소 이름" />
                </InfoContainer>
                <MemoWrapper>
                    <MemoContainer>
                        <MemoHeader>
                            <MemoLabel>메모</MemoLabel>
                            <MemoEdit onClick={handleMemoEdit}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/uwbjfiwe.json"
                                    trigger="click"
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                            </MemoEdit>
                            <MemoSave onClick={handleMemoSave}>
                                저장
                            </MemoSave>
                        </MemoHeader>

                        {/* 메모 입력 필드 */}
                        <InputMemo
                            name="memo"
                            value={tempMemo} // tempMemo를 사용하여 수정 중인 내용 표시
                            onChange={(e) => setTempMemo(e.target.value)} // tempMemo 업데이트
                            disabled={!isEditable} // 수정 가능 여부에 따라 입력 비활성화
                        />
                    </MemoContainer>
                    <IconContainer>
                        <Div1>
                            <ThumbUp onClick={handleLike}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/svtwhayb.json"
                                    trigger="hover"
                                    colors={`primary:${thumbUpColor}`}
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                            </ThumbUp>
                            <Count>{likeCount}</Count>
                        </Div1>
                        <Div2>
                            <ThumbDown onClick={handleDislike}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wgquubqx.json"
                                    trigger="hover"
                                    colors={`primary:${thumbDownColor}`}
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                                <Count>{dislikeCount}</Count>
                            </ThumbDown>
                        </Div2>
                        <Div3>
                            <Comment onClick={toggleCommentInput}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/ayhtotha.json"
                                    trigger="hover"
                                    colors={`primary:${commentColor}`}
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                                <Count>{commentCount}</Count>
                            </Comment>
                        </Div3>
                        <Div4>
                            <Align onClick={handleSharedClick}>
                                <ShareImg
                                    src={isShared ? AfterShare : BeforeShare}
                                    alt={isShared ? "after share" : "before share"}
                                />
                                <Count>{sharedCount}</Count>
                            </Align>
                        </Div4>

                    </IconContainer>
                    {showCommentInput && (
                        <>
                            <CommentList>
                                {comments.map((comment) => (
                                    <CommentItem key={comment.id}>
                                        <CommentItemContainer>
                                            <ProfileImage src={comment.profileImg} alt={`${comment.name}의 프로필`} />
                                            <CommentTextContainer>
                                                <CommentHeader>
                                                    <CommentUser>{comment.name}</CommentUser>
                                                    <CommentText>{comment.text}</CommentText>
                                                </CommentHeader>
                                                <CommentTime>{comment.time}</CommentTime>
                                            </CommentTextContainer>
                                        </CommentItemContainer>
                                    </CommentItem>
                                ))}
                                <CommentInputContainer>
                                    <Divider />
                                    <CommentInputWrapper>
                                        <ProfileImage src="https://via.placeholder.com/50" alt="사용자 프로필" />
                                        <CommentInput
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="댓글 달기..."
                                        />
                                        <SubmitStyledButton onClick={handleCommentSubmit} />
                                    </CommentInputWrapper>
                                </CommentInputContainer>
                            </CommentList>
                        </>
                    )}
                </MemoWrapper>
            </MainContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const MainBenner = styled.div`
    width: 100%;

`;

const MainContainer = styled.div`
    width: 1280px;
    margin-top: 36px;
    display: grid; 
    grid-template-areas:
        "category category close"
        "info memo memo"
        "info memo memo";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr 1fr auto;
    gap: 20px;
    border-radius: 20px;
    background-image: url(${BackGround});
    background-size: cover;
    background-position: center;
    padding-bottom: ${(props) => (props.showCommentInput ? "230px" : "33px")}; /* 댓글 창 여부에 따라 패딩 조정 */
    transition: padding-bottom 0.3s ease; /* 부드러운 애니메이션 효과 */
    position: relative;
`;

const CancelButton = styled.button`
    position: absolute; /* MainContainer를 기준으로 배치 */
    top: -30px; /* 위쪽 위치 조정 */
    right: -30px; /* 오른쪽 위치 조정 */
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10; /* 다른 요소 위에 표시되도록 설정 */
`;

const CategoryRow = styled.div`
    grid-area: category;
    display: flex;
    align-items: center;
    margin-left: 109px;
    margin-top: 40px;
`;

const CategoryBox = styled.div`
    width: 108px;
    height: 88px;
    border-radius: 20px;
    background: #FFF;
    margin-right: 16px;
`;

const TitleButtonBox = styled.div`
    height: 90px; 
    margin-right: 696px;
`;

const Title = styled.div`
    color: #040404;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-bottom: 8px;
`;

const InputLabel = styled.div`
    color: #040404;
    font-family: "Product Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-left: 40px;
    margin-top: 42px;
    margin-bottom: 8px;
`;

const InputMemo = styled.textarea`
    width: 423px;
    height: 227px;
    border-radius: 20px;
    border: 1px solid #5ba8fb;
    margin-left: 35px;
    font-size: 14px;
    font-family: "Product Sans", sans-serif;
    background: #FFF;
    color: ${(props) => (props.disabled ? "black" : "#a0a0a0")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")}; /* 비활성화 상태일 때 클릭 막기 */
    padding-left: 16px; /* 왼쪽 여백 */
    padding-top: 16px;
`;

const EditButton = styled.button`
    width: 100px;
    height: 48px;
    border-radius: 20px;
    border: 1px solid #AFB8C1;
    background: #FFF;
    color: #040404;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    padding: 0px;
    margin-left: 30px;

`;

const CategoryButton = styled.button`
    width:77px;
    height: 32px;
    background-color: #3597ff;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    color: #FFF;
    text-align: center;
    font-family: "Product Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
`;

const InfoContainer = styled.div`
    width: 519px;
    height: 545px;
    margin-left: 109px;
    grid-area: info;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    background: #FFF;

    // 비활성화된 상태를 명시적으로 설정
    pointer-events: none; /* 모든 자식 요소의 상호작용을 비활성화 */
`;

const MemoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: memo;
    gap: 10px;
`;

const MemoContainer = styled.div`
    width: 519px;
    height: 362px;
    display: flex;
    flex-direction: column;
    position: relative; /* 자식 요소 배치에 필요 */
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    background: #FFF;   
`;
// ---------------------------Start------------------------------------------------
const IconContainer = styled.div`
    display: flex; 
    width: 519px;
    height: 40px;
`;

const Div1 = styled.div`
    display: flex; 
    width: 67px;
    height:40px;
`;
const ThumbUp = styled.div`
`;

const Count = styled.div`
    width: 27px;
    height:27px;
    backgorund: green;
    margin-top:10px;
    // margin-left:14px;
    font-weight: bold;
    margin-left:3px
`;

const Div2 = styled.div`
    display: flex; 
    width: 67px;
    height:40px;
`;
const ThumbDown = styled.div`
    display: flex; 
`;


const Div3 = styled.div`
    display: flex; 
    width: 67px;
    height:40px;
`;
const Comment = styled.div`
display: flex; 
`;

const Div4 = styled.div`
    display: flex; 
    width: 137px;
    height:44px;
`;

const Align = styled.div`
    display: flex; 
    padding: 0px;
`;

const ShareImg = styled.img`
    width: 110px;
    height: 44px;
    `;
//----------------------------End------------------------------------------------
const MemoLabel = styled.div`
    color: #040404;
    font-family: "Product Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    display: inline-block; /* 가로 배치 가능하도록 설정 */
`;


const InputBox = styled.input`
    width: 423px;
    height: 47px;
    border: 1px solid #5ba8fb;
    border-radius: 20px;
    font-size: 14px;
    margin-left: 40px;
    background: #FFF;
    color: black; /* 비활성화된 텍스트 색상 */
    pointer-events: none; /* 비활성화 상태에서 클릭 및 입력 불가 */
    padding-left: 16px;
`;

const ImageBox = styled.div`
    width: 439px;
    height: 317px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    margin-left: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: #FFF;

    ${(props) =>
        !props.isEditable &&
        `
        pointer-events: none; /* 클릭 막기 */
        opacity: 0.5; /* 비활성화 스타일 */
    `}
`;

const UploadedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 박스에 맞도록 조정 */
`;

const PlaceholderText = styled.div`
    width: 200px;
    height: 15px;
    color: #a0a0a0;
    font-size: 12px;
    text-align: center;
`;

const CommentInputWrapper = styled.div`
    display: flex;
    align-items: center; /* 프로필 이미지와 입력창을 같은 줄에 배치 */
    gap: 10px; /* 이미지와 입력창 간격 */
    margin-bottom: 14px; /* 입력창과 버튼 사이 간격 */
    transform: translateY(8px);
`;

const CommentInput = styled.textarea`
    flex: 1; /* 입력창이 남은 공간을 차지하도록 설정 */
    border-radius: 10px;
    font-size: 14px;
    border: 1px solid white;
    
    &::placeholder{
        transform: translateY(8px);
    }
`;

const CommentList = styled.ul`
    width: 499px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    background: #FFF;
    padding: 20px; /* 내부 여백 추가 */
    height: auto; /* 높이를 콘텐츠에 맞게 조정 */
    list-style: none;
`;

const CommentItem = styled.li`
    padding: 10px 0;
    // border-bottom: 1px solid #eaeaea;
    &:last-child {
        border-bottom: none;
    }
`;

const CommentUser = styled.span`
    font-weight: bold;
    font-size: 14px;
    color: #000;
`;

const CommentTime = styled.div`
    font-size: 12px;
    color: gray;
    margin-top: 2px; /* 이름 아래에 시간 배치를 위한 간격 */
`;

const CommentText = styled.span`
    font-size: 14px;
    color: #333;
    margin-left: 8px; /* 이름과 댓글 사이의 간격 */
`;

const CommentInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentItemContainer = styled.div`
    display: flex;
    align-items: flex-start; /* 이미지와 텍스트를 상단 정렬 */
    gap: 10px; /* 이미지와 텍스트 사이 간격 */
`;

const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%; /* 둥근 프로필 이미지 */
    object-fit: cover; /* 이미지가 영역에 맞게 조정 */
`;

const CommentTextContainer = styled.div`
    display: flex;
    flex-direction: column; /* 텍스트를 수직으로 정렬 */
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center; /* 이름과 댓글 내용을 가로로 배치 */
    gap: 8px; /* 이름과 댓글 사이 간격 */
    margin-bottom: 1px; /* 이름+댓글과 시간 사이 간격 */
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #eaeaea; /* 라인 색상 */
    margin: 10px 0; /* 위아래 간격 */
`;

const SubmitStyledButton = styled.button`
    width: 40px;
    height: 40px;
    background-image: url(${SubmitButton}); 
    background-size: cover;
    background-position: center;
    background-color: #FFF;
    border: none;
    cursor: pointer;
    padding: 0px;

    &:hover {
      transform: scale(1.1); 
    }
`;

const MemoEdit = styled.div`
    display: flex; /* MemoLabel 옆에 가로로 배치 */
    margin-left: 290px; /* 라벨과의 간격 */
    cursor: pointer;
`;


const MemoSave = styled.button`
    width: 52px;
    height: 25px;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 20px;
    background-color: #dcdcdc;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center; /* 텍스트를 중앙에 정렬 */
    font-family: "Product Sans", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #000;

    &:hover {
        background-color: #5ba8fb;
        color: #fff; /* 호버 시 색상 변경 */
    }
`;

const MemoHeader = styled.div`
    display: flex; /* 가로 배치 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-left: 42px;
    margin-top: 42px;
    // margin-bottom: 8px;
`;

export default DetailPage;