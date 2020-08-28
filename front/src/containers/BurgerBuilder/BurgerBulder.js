import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Context from '../../store/context';

class BurgerBuilder extends Component 
{
   // Initialization required for use of context
   static contextType = Context;

   state = {
      order: false
   }

   componentDidMount()
   {
     this.context.setIngredients();
   }

   orderClickHandler = () => {
      this.setState({
         order: true
      });
   }

   orderCancelHandler = () => {
      this.setState({
         order: false
      });
   }

   orderPurchaseHandler = () => {
      this.props.history.push('/checkout');
   }

   render()
   {
      // Check which button to disable
      const disabledInfo = {...this.context.state.ingredients};
      for (let key in disabledInfo)
      {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      // Check loading
      let orderSummary = this.context.state.ingredients ?
      (
         <OrderSummary
            ingredients={this.context.state.ingredients}
            orderContinued={this.orderPurchaseHandler}
            orderCanceled={this.orderCancelHandler}
            price={this.context.state.totalPrice}
         />
      ) : <Spinner/>;

      let burgerPlusControls = this.context.state.ingredients ?
      (
         <Fragment>
            <Burger
               ingredients={this.context.state.ingredients}
            />
            <BuildControls 
               addIngredient={this.context.addIngredient}
               removeIngredient={this.context.removeIngredient}
               disabled={disabledInfo}
               price={this.context.state.totalPrice}
               purchasable={this.context.state.purchasable}
               ordered={this.orderClickHandler}
            />
         </Fragment>
      ) : <Spinner/>;

      return (
         <Fragment>
            <Modal 
               show={this.state.order}
               modalClosed={this.orderCancelHandler}
            >
               {orderSummary}
            </Modal>
               {burgerPlusControls}
         </Fragment>
      );
   }
}

export default BurgerBuilder;