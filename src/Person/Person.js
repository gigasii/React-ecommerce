import React from 'react';
import './Person.css';

const person = (props) => {
  return (
    <div className="Person">
      <p>Hi I'm {props.name}, I am {props.age}</p>
      <p onClick={props.click}>Delete this person</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  );
}

export default person;