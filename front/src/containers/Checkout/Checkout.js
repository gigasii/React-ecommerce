import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component 
{
   constructor(props)
   {
      super(props);

      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      let totalprice;
      for (let param of query.entries())
      {
         param[0] === 'price' ? totalprice = param[1] : ingredients[param[0]] = Number(param[1]);
      }

      this.state = {
         ingredients: ingredients,
         totalprice: totalprice
      }
   }

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
               ingredients={this.state.ingredients}
               checkoutCancelled={this.checkoutCancelled}
               checkoutContinued={this.checkoutContinued}
            />
            <Route 
               path={`${this.props.match.path}/contact-data`} 
               render={(props) => (
                  <ContactData
                     {...props}
                     ingredients={this.state.ingredients}
                     totalPrice={this.state.totalprice}
                  />
               )}
            />
         </div>
      );
   }
}

export default Checkout;