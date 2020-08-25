import React from 'react';
import Class from './Backdrop.css';

const backdrop = (props) => (
   props.show ? <div className={Class.Backdrop} onClick={props.clicked}/> : null
);

export default backdrop;