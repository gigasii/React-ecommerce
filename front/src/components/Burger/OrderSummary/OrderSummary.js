import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
   const ingredientSummary = Object.keys(props.ingredients).map(ingredientName => {
      return (
         <li key={ingredientName}>
            <span>{ingredientName}</span>: {props.ingredients[ingredientName]}
         </li>
      );
   });

   return (
      <Fragment>
         <h3>Your Order:</h3>
         <p>The burger with:</p>
         <ul>
            {ingredientSummary}
         </ul>
         <p>Total Price: {props.price.toFixed(2)}</p>
         <Button
            styleType="Danger"
            type="button"
            clicked={props.orderCanceled}
         >CANCEL</Button>
         <Button
            styleType="Success"
            type="button"
            clicked={props.orderContinued}
         >CONTINUE</Button>
      </Fragment>
   );
};

export default orderSummary;