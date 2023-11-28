import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  flex: 1;
  display: flex;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  margin: 5px;
  background-color: #630000;
  color: red;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s; 
  box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: black;
  }
`;

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default Button;


