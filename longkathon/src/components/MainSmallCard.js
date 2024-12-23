import React from "react";
import styled from "styled-components";

const SmallBigCard = () => {
    return(
        <Card>
        </Card>
    );
};

const Card = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 264px;
    height: 264px;
    left: 389px;
    top: 164px;

    background: #FFFFFF;
    border: 1px solid #5BA8FB;
    box-shadow: inset 2px 2px 20px 2px rgba(0, 46, 209, 0.3);
    border-radius: 50px;
`;

export default SmallBigCard;