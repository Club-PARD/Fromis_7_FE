import React, { useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

const InfoCard = forwardRef(({ id, onClose, isFirstCard }, ref) => {
  const [formData, setFormData] = useState({
    url: "",
    description: "",
  });

  // 부모 컴포넌트에서 값을 참조할 수 있도록 useImperativeHandle 사용
  useImperativeHandle(ref, () => ({
    getValues: () => formData,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    if (!isFirstCard && onClose) {
      onClose(id);
    }
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
          placeholder="http://fromis_7.link"
        />
        <Label>메모:</Label>
        <Container>
          <Input1
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="화장실 2개, 오션뷰"
          />
        </Container>
      </Form>
    </InformationCard>
  );
});

const InformationCard = styled.div`
  width: 519px;
  height: 362px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #5ba8fb;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: #5ba8fb;
`;

const Form = styled.div`
  margin-top: 18px;
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
  margin-bottom: 8px;
  margin-top: 24px;
`;

const Input = styled.input`
  width: 431px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #5ba8fb;
  font-size: 12px;
  margin-left: 35px;
  text-indent: 16px;
  padding: 0px;

  ::placeholder {
    color: #aaa;
  }
`;

const Container = styled.div`
  width: 438px;
  height: 145px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #5ba8fb;
  margin-left: 35px;
  padding-top: 16px;
`;

const Input1 = styled.textarea`
  width: 405px;
  height: 130px;
  background-color: #fff;
  flex-shrink: 0;
  margin-left: 16px;
  font-size: 12px;
  padding: 0px;
  border: transparent;
  resize: none;
  overflow: hidden;
  ::placeholder {
    color: #aaa;
  }
`;

export default InfoCard;
