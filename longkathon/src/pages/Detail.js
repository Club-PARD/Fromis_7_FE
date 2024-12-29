import React, { useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../components/HeaderComponent";

import BackGround from "../Image/DetailBackground.png";
import BeforeShare from "../Image/BeforeShare.png";
import AfterShare from "../Image/AfterShare.png";

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

    const [comments, setComments] = useState([
        { id: 1, name: "김희민", text: "난 ISTP라고... ㅎ", time: "4시간 전", profileImg: "https://via.placeholder.com/50" },
        { id: 2, name: "김세현", text: "그냥 레전드", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 3, name: "김하진", text: "막이래", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 4, name: "유수민", text: "1시간만 자고 올게요", time: "1일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 5, name: "김우현", text: "과자 다 먹을 꼬야", time: "2일 전", profileImg: "https://via.placeholder.com/50" },
        { id: 6, name: "이수인", text: "럭키 비키가 돼...", time: "2일 전", profileImg: "https://via.placeholder.com/50" },
    ]);


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

    return (
        <Container>
            <MainBenner>
                <HeaderComponent />
            </MainBenner>
            <MainContainer showCommentInput={showCommentInput}> {/* showCommentInput 전달 */}
                <CategoryRow>
                    <CategoryBox />
                    <TitleButtonBox>
                        <Title>categories:</Title>
                        <CategoryButton>숙소</CategoryButton>
                    </TitleButtonBox>
                    <EditButton>Edit</EditButton>
                </CategoryRow>
                <InfoContainer>
                    <InputLabel>URL:</InputLabel>
                    <InputBox placeholder="http://fromis_7.link" />
                    <ImageBox>여기는 사진 입니다</ImageBox>
                    <InputBox placeholder="숙소 이름 여기에..." />
                </InfoContainer>
                <MemoWrapper>
                    <MemoContainer>
                        <MemoLabel>메모</MemoLabel>
                        <InputMemo placeholder="메모를 입력해주세요" />

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
                                    <CommentInput
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="댓글을 입력하세요..."
                                    />
                                    <SubmitButton onClick={handleCommentSubmit}>댓글 작성</SubmitButton>
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
    border: 1px solid black;
`;

const MainBenner = styled.div`
    width: 100%;
    border: 1px solid black;
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
    border: 1px solid black;
    background-image: url(${BackGround});
    background-size: cover;
    background-position: center;
    padding-bottom: ${(props) => (props.showCommentInput ? "230px" : "33px")}; /* 댓글 창 여부에 따라 패딩 조정 */
    transition: padding-bottom 0.3s ease; /* 부드러운 애니메이션 효과 */
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
    border: 1px solid black;
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
    width: 439px;
    height: 256px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    margin-left: 35px;
    font-size: 14px; 
    font-family: "Product Sans", sans-serif; 
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
    width: 439px;
    height: 47px;
    border: 1px solid #5BA8FB;
    border-radius: 20px;
    font-size: 14px;
    margin-left: 40px;
`;

const ImageBox = styled.div`
    width: 439px;
    height: 317px;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    margin-left: 40px;
    margin-top:20px;
    margin-bottom: 20px;
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

const CommentInput = styled.textarea`
    border-radius: 10px;
    // padding: 10px;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    margin-top: 10px;
    background-color: #3597ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
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
    border: 1px solid black;
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

export default DetailPage;
