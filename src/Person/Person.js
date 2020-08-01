import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;
  
  @media (min-width: 1000px) {
    width: 300px;
  }
`;

const person = (props) => {
  return (
    <StyledDiv>
      <p>Hi I'm {props.name}, I am {props.age}</p>
      <p onClick={props.click}>Delete this person</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </StyledDiv>
  );
}

export default person;