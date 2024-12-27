import React, { useState } from "react";
import styled from "styled-components";

const InfoCard = () => {
    const [formData, setFormData] = useState({
        url: "",
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleClose = () => {
        alert("닫기 버튼 클릭!");
    };

  return (
    <InformationCard>
        <CloseButton onClick={handleClose}>
            <lord-icon
            src="https://cdn.lordicon.com/nqtddedc.json"
            trigger="hover"
            style={{ width: "40px", height: "40px" }}
            ></lord-icon>
        </CloseButton>
        <Form>
            <Label>URL:</Label>
            <Input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="http://example.com"
            />
        </Form>
        <Form>
            <Label>숙소명:</Label>
            <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="숙소명을 입력하세요."
            />
        </Form>
        <Form>
            <Label>추가사항:</Label>
            <Input
            name="details"
            value={formData.description}
            onChange={handleChange}
            placeholder="추가 정보를 입력하세요"
            />
        </Form>
    </InformationCard>
  );
};

const InformationCard = styled.div`
    width: 500px;
    height: 480px;
    flex-shrink: 0;
    background-color: white;
    border-radius: 50px;
    border: 1px solid #5ba8fb;
    margin-left: 20px;
    position: relative;
    padding: 20px;
`;

const CloseButton = styled.div`
    position: absolute;
    top: -5px;
    right: -5px;
    background: white;
    border: none;
    cursor: pointer;
    color: #5ba8fb;
`;

const Form = styled.div`
    margin-top: 30px;
    margin-bottom: 42px;
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    color: #040404;
    font-family: "Product Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    margin-left: 35px;
    margin-bottom: 24px;
    margin-top: 5px;
`;

const Input = styled.input`
    width: 431px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid #5BA8FB;
    font-size: 16px;
    margin-left: 30px;

    text-indent: 42px;

    /* placeholder 스타일 */
    ::placeholder {
        color: #aaa;
    }
`;

export default InfoCard;
