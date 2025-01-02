import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import BeforeShare from "../Image/BeforeShare.png";
import AfterShare from "../Image/AfterShare.png";

import { postLikeAPI, postUnlikeAPI, postAlignAPI } from "../API/State";
import { postCommentAPI } from "../API/Comment";
import { getListAPI } from "../API/List";

// 스타일 컴포넌트 임포트
import {
    Container, MainBenner, MainContainer, CancelButton, CategoryRow, CategoryBox, TitleButtonBox,
    Title, InputLabel, InputMemo, EditButton, CategoryButton, InfoContainer, ImageBox, UploadedImage,
    PlaceholderText, MemoWrapper, MemoContainer, MemoHeader, MemoLabel, MemoEdit, MemoSave, IconContainer,
    Div1, ThumbUp, Count, Div2, ThumbDown, Div3, Comment, Div4, Align, ShareImg, CommentList,
    CommentItem, CommentItemContainer, ProfileImage, CommentTextContainer, CommentHeader, CommentUser,
    CommentText, CommentTime, CommentInputContainer, Divider, CommentInputWrapper, CommentInput,
    SubmitStyledButton, InputBox
} from "../styles/DetailStyles";

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
        const fetchUserAndListData = async () => {
            try {
                const listData = await getListAPI(listId);
    
                // 서버 데이터와 로컬 저장소 동기화
                const savedState = JSON.parse(localStorage.getItem("likeDislikeState")) || {};
                const {
                    liked = listData.liked || false,
                    disliked = listData.disliked || false,
                    likeCount = listData.likeCount || 0,
                    dislikeCount = listData.dislikeCount || 0,
                } = savedState;
    
                setLikeCount(likeCount);
                setDislikeCount(dislikeCount);
                setLiked(liked);
                setDisliked(disliked);
                setThumbUpColor(liked ? "#5BA8FB" : "#dcdcdc");
                setThumbDownColor(disliked ? "#5BA8FB" : "#dcdcdc");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchUserAndListData();
    }, [listId]);

    const saveStateToLocalStorage = (newState) => {
        localStorage.setItem("likeDislikeState", JSON.stringify(newState));
    };
    
    const handleLike = async () => {
        try {
            let updatedLikeCount = likeCount;
            let updatedDislikeCount = dislikeCount;
    
            if (liked) {
                // 좋아요 해제
                const response = await postUnlikeAPI(listId, userId);
                updatedLikeCount = response.likeCount ?? likeCount - 1;
                setLiked(false);
                setThumbUpColor("#dcdcdc");
            } else {
                // 좋아요 설정
                const response = await postLikeAPI(listId, userId);
                updatedLikeCount = response.likeCount ?? likeCount + 1;
                setLiked(true);
                setThumbUpColor("#5BA8FB");
    
                // 싫어요 해제
                if (disliked) {
                    updatedDislikeCount = response.unlikeCount ?? dislikeCount - 1;
                    setDisliked(false);
                    setThumbDownColor("#dcdcdc");
                }
            }
    
            setLikeCount(updatedLikeCount);
            setDislikeCount(updatedDislikeCount);
    
            saveStateToLocalStorage({
                liked: !liked,
                disliked: false,
                likeCount: updatedLikeCount,
                dislikeCount: updatedDislikeCount,
            });
        } catch (error) {
            console.error("Error in handleLike:", error);
        }
    };
    
    const handleDislike = async () => {
        try {
            let updatedLikeCount = likeCount;
            let updatedDislikeCount = dislikeCount;
    
            if (disliked) {
                // 싫어요 해제
                const response = await postLikeAPI(listId, userId); // API 호출
                updatedDislikeCount = response.unlikeCount ?? dislikeCount - 1;
                setDisliked(false);
                setThumbDownColor("#dcdcdc");
            } else {
                // 싫어요 설정
                const response = await postUnlikeAPI(listId, userId); // API 호출
                updatedDislikeCount = response.unlikeCount ?? dislikeCount + 1;
                setDisliked(true);
                setThumbDownColor("#5BA8FB");
    
                // 좋아요 해제
                if (liked) {
                    updatedLikeCount = response.likeCount ?? likeCount - 1;
                    setLiked(false);
                    setThumbUpColor("#dcdcdc");
                }
            }
    
            setLikeCount(updatedLikeCount);
            setDislikeCount(updatedDislikeCount);
    
            saveStateToLocalStorage({
                liked: false,
                disliked: !disliked,
                likeCount: updatedLikeCount,
                dislikeCount: updatedDislikeCount,
            });
        } catch (error) {
            console.error("Error in handleDislike:", error);
        }
    };
                            
    const handleSharedClick = async () => {
        try {
            const response = await postAlignAPI(listId, userId);
            const { alignCount, isShared } = response;
    
            setSharedCount(alignCount);
            setIsShared(isShared);
        } catch (error) {
            console.error("Error handling align click:", error);
        }
    };
    
    const handleCommentSubmit = async () => {
        if (commentText.trim()) {
            try {
                const newComment = {
                    name: "사용자", // 사용자 이름은 실제 프로젝트에서 동적으로 가져올 수 있습니다.
                    content: commentText,
                    time: getCurrentTime(),
                };

                console.log("서버로 전송되는 데이터:", newComment);
                // 서버에 댓글 저장
                const response = await postCommentAPI(listId, userId, newComment);

                if (response.status === 201) {
                    // 서버 응답 데이터를 사용하여 상태 업데이트
                    setComments((prev) => [...prev, response.data]);
                    setCommentText(""); // 입력창 초기화
                }
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
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

    // useEffect를 사용하여 댓글 데이터 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                // 댓글 데이터 가져오기
                const response = await getListAPI(listId);
                setComments(response.comments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [listId]); // listId를 의존성 배열에 추가


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
                            <Count>{likeCount || 0}</Count>
                        </Div1>
                        <Div2>
                            <ThumbDown onClick={handleDislike}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wgquubqx.json"
                                    trigger="hover"
                                    colors={`primary:${thumbDownColor}`}
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                                <Count>{dislikeCount || 0}</Count>
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
                                {comments.map((comment, index) => (
                                    <CommentItem key={index}>
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

export default DetailPage;
