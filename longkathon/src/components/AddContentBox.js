import React from "react";
import styled from "styled-components";

const AddContentBox = ({ onAddInfoCard }) => {
  return (
    <AddBox>
      <lord-icon
        onClick={onAddInfoCard}
        src="https://cdn.lordicon.com/nqtddedc.json"
        trigger="hover"
        colors="primary:#d3d3d3" 
        style={{
          width: "133px",
          height: "133px",
          transform: "rotate(45deg)"
        }}
      ></lord-icon>
    </AddBox>
  );
};

const AddBox = styled.div`
  width: 519px;
  height: 362px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #5ba8fb;
  cursor: pointer;
  transition: all 0.3s;
`;

export default AddContentBox;
