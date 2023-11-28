import React from "react";
import styled from "styled-components";

const StyledProgressBar = styled.div`
  width: 100%;
  height: 94px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  background-color: black;
  overflow: hidden;
  opacity: ${(props) => (props.value > 0 ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  & > div {
    width: ${(props) => props.value}%;
    height: 100%;
    border-radius: 10px;
    background-color: darkred;
    transition: width 1s linear; 
  }
`;

const ProgressBar = ({ value, max }) => (
  <StyledProgressBar value={(value / max) * 100}>
    <div />
  </StyledProgressBar>
);

export default ProgressBar;
