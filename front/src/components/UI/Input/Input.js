import React from 'react';
import Class from './Input.css';

const input = (props) => {
   // Check validation css
   const inputClasses = [Class.InputElement];
   if (!props.valid)
   {
      inputClasses.push(Class.Invalid);
   }
   // Check input type
   let inputElement;
   switch(props.elementType)
   {
      case 'input':
         inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
         />;
         break;
      
      case 'textarea':
         inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
         />;
         break;

      case 'select':
         inputElement = (
            <select
               className={inputClasses.join(' ')}
               value={props.value}
               onChange={props.changed}
            >
               {
                  props.elementConfig.options.map(option => (
                     <option
                        key={option.value}
                        value={option.value}
                     >{option.displayValue}</option>
                  ))
               }
            </select>
         )
         break;

      default:
         inputElement = null;
         break;
   }

   return (
      <div className={Class.input}>
         <label className={Class.Label}>{props.label}</label>
         {inputElement}
      </div>
   );
};

export default input;