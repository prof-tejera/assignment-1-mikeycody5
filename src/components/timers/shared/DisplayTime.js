
import React from "react";
import styled from "styled-components";

const Display = styled.div`
  transition: opacity 0.5s ease-in-out;
  font-size: 60px;
  z-index: 0;
  font-weight: 200;
  padding: 7px 7px;
  margin-bottom: 10px;
  color: red;
  text-align: center;
  background-color: #121212;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  position: relative;

  /* Outer background layer with red lines */
  background-image: 
    linear-gradient(135deg, transparent 49.5%, rgba(255, 0, 0, 0.2) 49.5%, rgba(255, 0, 0, 0.2) 50.5%, transparent 50.5%),
    linear-gradient(135deg, transparent 49.5%, rgba(255, 0, 0, 0.2) 49.5%, rgba(255, 0, 0, 0.2) 50.5%, transparent 50.5%),
    linear-gradient(135deg, transparent 49.5%, rgba(255, 0, 0, 0.2) 49.5%, rgba(255, 0, 0, 0.2) 50.5%, transparent 50.5%),
    linear-gradient(135deg, transparent 49.5%, rgba(255, 0, 0, 0.2) 49.5%, rgba(255, 0, 0, 0.2) 50.5%, transparent 50.5%);
  background-size: 30px 30px, 30px 30px, 30px 30px, 30px 30px;
  background-position: 0 0, 10px 10px, 20px 20px, 15px 15px;


  
  }
`;



const DisplayTime = ({ time }) => (
    <Display>{formatTime(time)}</Display>
  );
  
  const formatTime = (time) => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };



export default DisplayTime;