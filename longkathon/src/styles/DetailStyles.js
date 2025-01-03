import styled from "styled-components";
import BackGround from "../Image/DetailBackground.png";
import SubmitButton from "../Image/SubmitButton.png";


const Container = styled.div`
    margin-top: 50px;
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
    overflow-y: auto;
`;

const CancelButton = styled.button`
    position: absolute; /* MainContainer를 기준으로 배치 */
    top: 5px; /* 위쪽 위치 조정 */
    right: 5px; /* 오른쪽 위치 조정 */
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
    border: 0px solid #5ba8fb;
    background: linear-gradient(to bottom right, #F0F8FF, #F2F1F8);
    margin-left: 35px;
    font-size: 14px;
    font-family: "Product Sans", sans-serif;
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
    border: 0px solid #5ba8fb;
    border-radius: 20px;
    font-size: 14px;
    margin-left: 40px;
    background: linear-gradient(to bottom right, #F0F8FF, #F2F1F8);
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
    z-index: 100; /* 다른 요소 위에 표시되도록 설정 */
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

export const ScrollableInfoContainer = styled.div`
    max-height: 300px; /* 높이 제한 */
    overflow-y: auto; /* 세로 스크롤 활성화 */
    border: 1px solid #ddd; /* 스크롤 컨테이너 구분 */
    padding: 10px;
    margin-top: 20px;
`;

export {
    Container,
    MainBenner,
    MainContainer,
    CancelButton,
    CategoryRow,
    CategoryBox,
    TitleButtonBox,
    Title,
    InputLabel,
    InputMemo,
    EditButton,
    CategoryButton,
    InfoContainer,
    ImageBox,
    UploadedImage,
    PlaceholderText,
    MemoWrapper,
    MemoContainer,
    MemoHeader,
    MemoLabel,
    MemoEdit,
    MemoSave,
    IconContainer,
    Div1,
    ThumbUp,
    Count,
    Div2,
    ThumbDown,
    Div3,
    Comment,
    Div4,
    Align,
    ShareImg,
    CommentList,
    CommentItem,
    CommentItemContainer,
    ProfileImage,
    CommentTextContainer,
    CommentHeader,
    CommentUser,
    CommentText,
    CommentTime,
    CommentInputContainer,
    Divider,
    CommentInputWrapper,
    CommentInput,
    SubmitStyledButton,
    InputBox
    
};
