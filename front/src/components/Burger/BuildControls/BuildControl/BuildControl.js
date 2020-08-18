import React from 'react';
import Class from './BuildControl.css';

const buildControl = (props) => (
   <div className={Class.BuildControl}>
      <div className={Class.Label}>{props.label}</div>
      <button
         className={Class.Less}
         onClick={props.remove}
         disabled={props.disableButton}
      >Less</button>
      <button
         className={Class.More}
         onClick={props.add}
      >More</button>
   </div>
);

export default buildControl;