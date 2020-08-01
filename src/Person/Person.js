import React from 'react';
import './Person.css';
import Radium from 'radium';

const person = (props) => {
  const inlineStyle = {
    '@media (min-width: 1000px)': {
      width: '450px'
    }
  }
  return (
    <div className="Person" style={inlineStyle}>
      <p>Hi I'm {props.name}, I am {props.age}</p>
      <p onClick={props.click}>Delete this person</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  );
}

export default Radium(person);