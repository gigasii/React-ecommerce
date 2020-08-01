import React from 'react';
import Class from './Person.css';

const person = (props) => {
  return (
    <div className={Class.Person}>
      <p>Hi I'm {props.name}, I am {props.age}</p>
      <p onClick={props.click}>Delete this person</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  );
}

export default person;