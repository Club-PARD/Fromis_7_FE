import React from "react";
import styled from "styled-components";

const CategoryAddContainer = ({ onClickHandler, disabled = false }) => {
  return (
    <AddContainer disabled={disabled} >
      <CategoryFile src={require("../Image/CategoryFile.png")} alt="file-image" />
      <CategotyTitle>categories: </CategotyTitle>

      <lord-icon
        src="https://cdn.lordicon.com/nqtddedc.json"
        trigger="hover"
        colors="primary:#AFB8C1,secondary:#FF5733"
        style={{
          width: "100px", height: "100px", transform: "rotate(-45deg)", position: "absolute", top: "108px", left: "57px"
        }}
        onClick={disabled ? null : onClickHandler} // Disable click if disabled is true
      ></lord-icon>
    </AddContainer>
  );
};

const AddContainer = styled.div`
  display: flex;
  position: relative;
  width: 217px;
  height: 260px;
  ${({ disabled }) => 
    disabled && `
      pointer-events: none; /* Disable all interactions */
    `}
`;

const CategotyTitle = styled.div`
  position: absolute;
  top: 24px;
  left: 22px;
  color: #040404;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
`;

const CategoryFile = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 217px;
  height: 260px;
`;

export default CategoryAddContainer;
