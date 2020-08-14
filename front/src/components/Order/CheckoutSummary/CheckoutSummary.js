import React from 'react';
import Class from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
   return (
      <div className={Class.CheckoutSummary}>
         <h3>Your confirmed order:</h3>
         <div className={Class.Burger}>
            <Burger ingredients={props.ingredients} />
         </div>
         <Button 
            buttonType="Danger"
            clicked={props.checkoutCancelled}
         >CANCEL</Button>
         <Button 
            buttonType="Success"
            clicked={props.checkoutContinued}
         >CONTINUE</Button>
      </div>
   );
}

export default checkoutSummary;