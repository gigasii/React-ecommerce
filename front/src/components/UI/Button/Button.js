import React from 'react';
import Class from './Button.css';

const button = (props) => (
   <button
      className={[Class.Button, Class[props.styleType]].join(' ')}
      type={props.type}
      onClick={props.clicked}
   >
      {props.children}
   </button>
);

export default button;