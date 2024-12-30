import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";

import BackGround from "../Image/DetailBackground.png";
import BeforeShare from "../Image/BeforeShare.png";
import AfterShare from "../Image/AfterShare.png";
import SubmitButton from "../Image/SubmitButton.png";

const DetailPage = () => {
    const [thumbUpColor, setThumbUpColor] = useState("#dcdcdc");
    const [thumbDownColor, setThumbDownColor] = useState("#dcdcdc");
    const [commentColor, setCommentColor] = useState("#dcdcdc")
    const [isShared, setIsShared] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);


    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");

    const [comments, setComments] = useState([ // Mockdata
        { id: 1, name: "김희민", text: "난 ISTP라고... ㅎ", time: "4시간 전", profileImg: "https://via.placeholder.com/50" },
        { id: 2, name: "김세현", text: "그냥 레전드", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 3, name: "김하진", text: "막이래", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 4, name: "유수민", text: "1시간만 자고 올게요", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 5, name: "김우현", text: "과자 다 먹을 꼬야", time: "2일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 6, name: "이수인", text: "럭키 비키가 돼...", time: "2일 전", profileImg: "https://via.placeholder.com/50" },
    ]);

    //댓글 개수 동기화
    useEffect(() => {
        setCommentCount(comments.length);
    }, [comments]);

    const [image, setImage] = useState(null); // 업로드된 이미지를 저장

    const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부를 나타내는 상태
    const [infoData, setInfoData] = useState({ //Mockdata
        url: "http://fromis_7.link",
        name: "숙소 이름 여기에...",
        memo: "메모를 입력해주세요",
    });

    const handleEditToggle = () => {
        setIsEditable((prev) => !prev); // 수정 가능 여부를 토글
    };

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setInfoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    };


    const handleLike = () => {
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
    };

    const handleDislike = () => {
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
    };

    const handleSharedClick = () => {
        setIsShared((prevState) => !prevState);
    }

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

    const toggleColor = (currentColor, setColor) => {
        const newColor = currentColor === "#dcdcdc" ? "#5BA8FB" : "#dcdcdc";
        setColor(newColor);
    };

    const toggleCommentInput = () => {
        setShowCommentInput((prev) => !prev);
        setCommentColor((prevColor) => (prevColor === "#dcdcdc" ? "#5BA8FB" : "#dcdcdc"));
    };

    const handleImageUpload = (event) => {
        if (!isEditable) return; // 수정 가능 여부 확인

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result); // 업로드된 이미지 URL 저장
            };
            reader.readAsDataURL(file);
        }
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
                        {isEditable ? "Save" : "Edit"}
                    </EditButton>
                </CategoryRow>
                <InfoContainer>
                    <InputLabel>URL:</InputLabel>
                    <InputBox
                        name="url"
                        value={infoData.url}
                        onChange={handleInfoChange}
                        disabled={!isEditable} // 수정 가능 여부에 따라 입력 가능/불가능 설정
                    />
                    <ImageBox isEditable={isEditable}>
                        {image ? (
                            <UploadedImage src={image} alt="업로드된 이미지" />
                        ) : (
                            <PlaceholderText>이미지를 업로드 해주세요</PlaceholderText>
                        )}
                        <FileInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={!isEditable} // 수정 가능 여부에 따라 입력 가능/불가능 설정
                        />
                    </ImageBox>
                    <InputBox
                        name="name"
                        value={infoData.name}
                        onChange={handleInfoChange}
                        disabled={!isEditable} // 수정 가능 여부에 따라 입력 가능/불가능 설정
                    />
                </InfoContainer>
                <MemoWrapper>
                    <MemoContainer>
                        <MemoLabel>메모</MemoLabel>
                        <InputMemo
                            name="memo"
                            value={infoData.memo}
                            onChange={handleInfoChange}
                            disabled={!isEditable} // 수정 가능 여부에 따라 입력 가능/불가능 설정
                        />

                    </MemoContainer>
                    <IconContainer>
                        <ThumbUp onClick={handleLike}>
                            <lord-icon
                                src="https://cdn.lordicon.com/svtwhayb.json"
                                trigger="hover"
                                colors={`primary:${thumbUpColor}`}
                                style={{ width: "40px", height: "40px" }}
                            ></lord-icon>
                            <CountText>{likeCount}</CountText>
                        </ThumbUp>
                        <ThumbDown onClick={handleDislike}>
                            <lord-icon
                                src="https://cdn.lordicon.com/wgquubqx.json"
                                trigger="hover"
                                colors={`primary:${thumbDownColor}`}
                                style={{ width: "40px", height: "40px" }}
                            ></lord-icon>
                            <CountText>{dislikeCount}</CountText>
                        </ThumbDown>
                        <Comment onClick={toggleCommentInput}>
                            <lord-icon
                                src="https://cdn.lordicon.com/ayhtotha.json"
                                trigger="hover"
                                colors={`primary:${commentColor}`}
                                style={{ width: "40px", height: "40px" }}
                            ></lord-icon>
                            <CountText>{commentCount}</CountText>
                        </Comment>
                        <Share onClick={handleSharedClick}>
                            <ShareImg
                                src={isShared ? AfterShare : BeforeShare}
                                alt={isShared ? "after share" : "before share"}
                            />
                        </Share>
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
    height: 243px;
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
    flex-shrink: 0;
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
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    background: #FFF;   
`;

const MemoLabel = styled.div`
    color: #040404;
    font-family: "Product Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    margin-left: 42px;
    margin-top: 42px;
    margin-bottom: 8px;
`;

const InputBox = styled.input`
    width: 423px;
    height: 47px;
    border: 1px solid #5ba8fb;
    border-radius: 20px;
    font-size: 14px;
    margin-left: 40px;
    background: #FFF;
    color: ${(props) => (props.disabled ? "black" : "#a0a0a0")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")}; /* 비활성화 상태일 때 클릭 막기 */
    padding-left: 16px; /* 왼쪽 여백 */

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

const PlaceholderText = styled.span`
    color: #a0a0a0;
    font-size: 14px;
    text-align: center;
`;


const FileInput = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0; /* 파일 입력을 숨김 */
    cursor: ${(props) => (props.isEditable ? "pointer" : "not-allowed")};
`;

const IconContainer = styled.div`
    width: 519px;
    display: flex; 
`;

const ThumbUp = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none; 
    border: none; 
`;

const ThumbDown = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none; 
    border: none; 
`;

const Comment = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none; 
    border: none; 
`;

const Share = styled.div`
`;

const ShareImg = styled.img`
    width: 110px;
    height: 44px;
`;

const CountText = styled.span`
    color: #000;
    text-align: center;
    font-family: "Product Sans Black";
    font-size: 12px;
    font-style: normal;
    font-weight: 900;
    line-height: 12px; /* 100% */
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

    &:hover {
      transform: scale(1.1); 
    }
`;

export default DetailPage;