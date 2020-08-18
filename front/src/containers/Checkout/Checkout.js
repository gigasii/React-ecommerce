import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import Contact from './Contact/Contact';
import UIContext from '../../store/context';

class Checkout extends Component 
{
   // Initialization required for use of context
   static contextType = UIContext;

   checkoutCancelled = () => {
      this.props.history.goBack();
   }

   checkoutContinued = () => {
      this.props.history.replace('/checkout/contact-data')
   }

   render()
   {
      return (
         <div>
            <CheckoutSummary 
               ingredients={this.context.ingredients}
               checkoutCancelled={this.checkoutCancelled}
               checkoutContinued={this.checkoutContinued}
            />
            <Route 
               path={`${this.props.match.path}/contact-data`} 
               component={Contact}
            />
         </div>
      );
   }
}

export default Checkout;