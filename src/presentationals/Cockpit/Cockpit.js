import React from 'react';
import Class from './Cockpit.css';

const retriveProperties = (className) => {
   return className.join(' ');
}

const cockpit = (props) => {
   console.log('[Cockpit.js is rendered]');
   // Toggle button and text color
   const txtClass = [];
   const btnClass = [];
   if (props.showPeople)
   {
      txtClass.push(Class.red);
      btnClass.push(Class.Red);
   }
   return (
      <div className={Class.Cockpit}>
         <p className={retriveProperties(txtClass)}>React Practice</p>
         <button
            className={retriveProperties(btnClass)}
            onClick={props.clicked}
         >Toggle</button>
      </div>
   );
}

export default React.memo(cockpit);