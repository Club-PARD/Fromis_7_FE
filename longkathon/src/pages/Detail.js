import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import BeforeShare from "../Image/BeforeShare.png";
import AfterShare from "../Image/AfterShare.png";
import Logo from "../Image/Logo.png"
import BasicImage from "../Image/BasicImg.png";

import { postLikeAPI, postUnlikeAPI, postAlignAPI } from "../API/State";
import { postCommentAPI } from "../API/Comment";
import { getListAPI, updateListAPI } from "../API/List";
import { getUserAPI } from "../API/User";
import { getImageByColor } from "../components/ColorImageMap";
import { getCategoryAPI } from "../API/Category";


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
    const [userId, setUserId] = useState(propUserId || 2);
    const [listId, setListId] = useState(propListId || 5); // 동적 할당 가능하도록 설정 -> 동적 하게 하려면 1대신 null로 설정

    const [userName, setUserName] = useState("익명"); // Default user name

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

    const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부를 나타내는 상태

    const [infoData, setInfoData] = useState({});

    const [tempMemo, setTempMemo] = useState(infoData.memo); // tempMemo 상태 추가

    const [category, setCategory] = useState(() => {
        const storedCategory = localStorage.getItem("category");
        return storedCategory ? JSON.parse(storedCategory) : null;
    });

    const [categoryId, setCategoryId] = useState(null); // 초기화


    const handleEditToggle = () => {
        setIsEditable((prev) => !prev); // 수정 가능 여부를 토글
    };

    // 시간 변환 함수
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    //댓글 개수 동기화
    useEffect(() => {
        setCommentCount(comments.length);
    }, [comments]);

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [comments]); // 댓글 상태 변경 시 로컬 저장소 업데이트

    //메모 동기화
    useEffect(() => {
        if (infoData.memo) {
            setTempMemo(infoData.memo); // infoData.memo 업데이트 시 tempMemo 동기화
        }
    }, [infoData.memo]);

    useEffect(() => {
        const fetchUserAndListData = async () => {
            try {
                const listData = await getListAPI(listId);
                console.log("listData:", listData);
                if (!listData) {
                    console.error("listData is undefined");
                    return;
                }

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

                // 공유 상태 초기화
                const sharedState = JSON.parse(localStorage.getItem("sharedState")) || {};
                const {
                    isShared = listData.isShared || false,
                    sharedCount = listData.alignCount || 0,
                } = sharedState;

                setSharedCount(sharedCount);
                setIsShared(isShared);

                // 서버 데이터로 infoData 상태 업데이트
                setInfoData({
                    url: listData.url || "http://fromis_7.link", // 기본값 유지
                    name: listData.name || "빈칸을 채워주세요...",
                    memo: listData.description || "메모를 입력해주세요",
                    image: listData.image || BasicImage, // listData.image를 사용하여 이미지 설정
                });


                // 댓글 데이터 매핑 (comments가 없을 경우 빈 배열 사용)
                const mappedComments = (listData.lists[0]?.comments || []).map((comment) => ({
                    name: comment.userName || "익명", // 댓글 작성자 이름
                    content: comment.content || "내용 없음", // 댓글 내용
                    time: comment.createdAt ? formatTime(comment.createdAt) : "시간 정보 없음", // 댓글 작성 시간
                    profileImg: comment.imageUrl || Logo, // 저장된 이미지가 없으면 Logo 이미지를 기본값으로 설정
                }));
                setComments(mappedComments); // 상태에 저장

                // 로깅: 확인용
                console.log("Fetched and mapped comments:", mappedComments);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserAndListData();
    }, [listId]);

    // 사용자 이름 가져오기 (별도의 useEffect 유지)
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await getUserAPI(userId); // API 호출
                const data = response.data; // Axios는 JSON을 자동으로 파싱함
                setUserName(data.name || "익명"); // 사용자 이름 설정
            } catch (error) {
                console.error("사용자 이름 가져오는 중 에러 발생:", error);
            }
        };
        fetchUserName(); // 함수 호출
    }, [userId]); // userId가 변경될 때만 실행

    const saveSharedStateToLocalStorage = (newState) => {
        localStorage.setItem("sharedState", JSON.stringify(newState));
    };

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
            let updatedSharedCount = sharedCount;

            if (isShared) {
                // 공유 해제
                const response = await postAlignAPI(listId, userId, false); // 서버 호출 (공유 해제)
                updatedSharedCount = response.alignCount ?? sharedCount - 1;
                setIsShared(false);
            } else {
                // 공유 설정
                const response = await postAlignAPI(listId, userId, true); // 서버 호출 (공유 설정)
                updatedSharedCount = response.alignCount ?? sharedCount + 1;
                setIsShared(true);
            }

            setSharedCount(updatedSharedCount);

            saveSharedStateToLocalStorage({
                isShared: !isShared,
                sharedCount: updatedSharedCount,
            });
        } catch (error) {
            console.error("Error handling shared click:", error);
        }
    };

    // const handleCommentSubmit = async () => {
    //     if (commentText.trim()) {
    //         try {
    //             const newComment = {
    //                 content: commentText,
    //                 createdAt: new Date().toISOString(),
    //             };

    //             // 서버에 새 댓글 저장
    //             const response = await postCommentAPI(listId, userId, newComment);

    //             if (response.status === 201) {
    //                 const addedComment = {
    //                     name: userName || "익명",
    //                     content: commentText,
    //                     time: formatTime(newComment.createdAt),
    //                     profileImg: response.data.profileImg || Logo,
    //                 };

    //                 // 상태에 즉시 추가
    //                 setComments((prevComments) => [...prevComments, addedComment]);
    //                 setCommentText(""); // 입력 필드 초기화
    //             }
    //         } catch (error) {
    //             console.error("댓글 추가 중 오류 발생:", error);
    //         }
    //     }
    // };

    const handleCommentSubmit = async () => {
        if (commentText.trim()) {
            try {
                const newComment = {
                    content: commentText,
                    createdAt: new Date().toISOString(),
                };
    
                // 서버에 새 댓글 저장
                const response = await postCommentAPI(listId, userId, newComment);
    
                if (response.status === 201) {
                    // 서버 응답에서 댓글 데이터를 추출
                    const addedComment = {
                        name: userName || "익명", // 현재 사용자의 이름
                        content: commentText, // 입력한 댓글 내용
                        time: formatTime(newComment.createdAt), // 작성 시간
                        profileImg: response.data?.profileImg || Logo, // 프로필 이미지 기본값 설정
                    };
    
                    // 댓글 상태 업데이트
                    setComments((prevComments) => [...prevComments, addedComment]);
                    setCommentText(""); // 댓글 입력 필드 초기화
                } else {
                    console.error("댓글 저장 실패:", response.data);
                    alert("댓글 저장에 실패했습니다.");
                }
            } catch (error) {
                console.error("댓글 추가 중 오류 발생:", error);
                alert("댓글을 추가하는 중 문제가 발생했습니다.");
            }
        } else {
            alert("댓글 내용을 입력해주세요.");
        }
    };
    

    const toggleCommentInput = () => {
        setShowCommentInput((prev) => !prev);
        setCommentColor((prevColor) => (prevColor === "#dcdcdc" ? "#5BA8FB" : "#dcdcdc"));
    };

    // 저장 버튼 클릭 시 tempMemo를 infoData.memo에 저장
    const handleMemoSave = async () => {
        try {
            // tempMemo 값이 비어 있을 경우 기본값 설정
            if (!tempMemo.trim()) {
                alert("메모를 입력해주세요.");
                return;
            }

            const updateData = {
                description: tempMemo.trim(), // tempMemo 값을 사용
            };

            // 서버에 메모 업데이트 요청
            const response = await updateListAPI(listId, updateData);

            if (response.status === 200) {
                setInfoData((prev) => ({
                    ...prev,
                    memo: tempMemo, // tempMemo 내용을 infoData.memo에 저장
                }));
                setIsEditable(false); // 수정 모드 비활성화
                console.log("메모 업데이트 완료:", response);
            } else {
                console.error("메모 업데이트 실패:", response);
            }
        } catch (error) {
            console.log("메모 업데이트 중 오류 발생:", error);
        }
    };



    // 댓글 데이터 가져오기
    useEffect(() => {
        const fetchCommentsFromLocalStorage = () => {
            // localStorage에서 댓글 데이터를 가져옴
            const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
            setComments(storedComments);
        };
        fetchCommentsFromLocalStorage();
    }, []); // 컴포넌트 로드시 한 번만 실행

    // 댓글 데이터 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getListAPI(listId);

                if (!response.comments || response.comments.length === 0) {
                    console.warn("댓글 데이터가 비어 있습니다.");
                    setComments([]); // 빈 배열로 초기화
                    return;
                }

                const updatedComments = response.comments.map((comment) => ({
                    name: comment.userName || "익명", // 댓글 작성자 이름
                    content: comment.content || "내용 없음", // 댓글 내용
                    time: comment.createdAt ? formatTime(comment.createdAt) : "시간 정보 없음", // 댓글 시간
                    profileImg: comment.imageUrl || Logo, // 프로필 이미지
                }));

                setComments(updatedComments); // 상태 업데이트

                // 초기 댓글 데이터 로드 시 한 번만 출력
                if (updatedComments.length > 0) {
                    console.log("초기 댓글 데이터:", updatedComments);
                }
            } catch (error) {
                console.error("댓글 데이터 가져오기 오류:", error);
            }
        };

        fetchComments();
    }, [listId]); // listId 변경 시만 실행

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryAPI(categoryId); // 서버 데이터 가져오기
                if (data && Array.isArray(data) && data.length > 0) {
                    setCategory(data[0]); // 첫 번째 항목만 설정
                    localStorage.setItem("category", JSON.stringify(data[0]));
                } else {
                    console.warn("서버 데이터가 유효하지 않습니다:", data);
                }
            } catch (error) {
                console.error("fetchCategory 에러 발생:", error);
            }
        };

        fetchCategory();
    }, [categoryId]);


    //const image = category ? getImageByColor(category.color) : null; // category가 null인지 확인
    const image = category ? getImageByColor(category.color) : Logo;

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
                    <CategoryBox>
                        {image && <UploadedImage src={image} alt="카테고리 이미지" />}
                    </CategoryBox>
                    <TitleButtonBox>
                        <Title>categories:</Title>
                        <CategoryButton>{category?.name || "없음"}</CategoryButton>
                    </TitleButtonBox>
                    <EditButton onClick={handleEditToggle}>
                        Add
                    </EditButton>
                </CategoryRow>
                <InfoContainer>
                    <InputLabel>URL:</InputLabel>
                    <InputBox
                        value={infoData.url} // 서버에서 URL 값 불러온 거
                        placeholder="wwww.example.com"
                        readOnly // 수정 불가능하게 하기 위해서
                    />
                    <ImageBox>
                        {infoData.image ? (
                            <UploadedImage src={infoData.image} alt="업로드된 이미지" />
                        ) : (
                            <PlaceholderText>이미지를 업로드 해주세요</PlaceholderText>
                        )}
                    </ImageBox>

                    <InputBox
                        value={infoData.name}
                        placeholder="숙소 이름"
                        readOnly // 수정 불가능하게 하기 위해서
                    />
                </InfoContainer>
                <MemoWrapper>
                    <MemoContainer>
                        <MemoHeader>
                            <MemoLabel>메모</MemoLabel>
                            <MemoEdit onClick={() => setIsEditable(true)}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/uwbjfiwe.json"
                                    trigger="click"
                                    style={{ width: "40px", height: "40px" }}
                                ></lord-icon>
                            </MemoEdit>
                            {isEditable && (
                                <MemoSave onClick={handleMemoSave}>
                                    저장
                                </MemoSave>
                            )}
                        </MemoHeader>
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
                                                </CommentHeader>
                                                <CommentText>{comment.content}</CommentText>
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