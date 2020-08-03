import React from 'react';
import Class from './Cockpit.css';

const retriveProperties = (className) => {
   return className.join(' ');
}

const cockpit = (props) => {
   // Debugging for rendering
   console.log('[Cockpit.js is rendered]');
   // Toggle button and text color
   const textClass = [];
   const btnClass = [];
   if (props.showPeople)
   {
      textClass.push(Class.red);
      btnClass.push(Class.Red);
   }

   return (
      <div className={Class.Cockpit}>
         <p className={retriveProperties(textClass)}>React Practice</p>
         <button
            className={retriveProperties(btnClass)}
            onClick={props.clicked}
         >Toggle</button>
      </div>
   );
}

export default React.memo(cockpit);