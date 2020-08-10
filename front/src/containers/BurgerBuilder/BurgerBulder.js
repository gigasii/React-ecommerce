import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
   salad: 0.4,
   cheese: 0.5,
   meat: 1.4,
   bacon: 1.5
}

class BurgerBuilder extends Component 
{
   state = {
      ingredients: {
         cheese: 0,
         salad: 0,
         bacon: 0,
         meat: 0
      },
      totalPrice: 3,
      purchasable: false,
      order: false
   }

   updatePurchaseState(ingredients) 
   {
      const sum = Object.keys(ingredients).map(ingredientName => {
         return ingredients[ingredientName];
      }).reduce((sum, current) => {
         return sum + current;
      }, 0);
      
      this.setState({
         purchasable: sum > 0
      });
   }

   addIngredientHandler = (type) => { 
      const newIngredients = {...this.state.ingredients};
      ++newIngredients[type];
      const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({
         ingredients: newIngredients,
         totalPrice: newTotalPrice
      });
      this.updatePurchaseState(newIngredients);
   }

   removeIngredientHandler = (type) => {
      const newIngredients = {...this.state.ingredients};
      --newIngredients[type];
      const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
         ingredients: newIngredients,
         totalPrice: newTotalPrice 
      });
      this.updatePurchaseState(newIngredients);
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

   orderContinueHandler = () => {
   }

   render() 
   {
      const disabledInfo = {...this.state.ingredients};
      for (let key in disabledInfo)
      {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      return (
         <Fragment>
            <Modal 
               show={this.state.order}
               modalClosed={this.orderCancelHandler}
            >
               <OrderSummary 
                  ingredients={this.state.ingredients}
                  orderContinued={this.orderContinueHandler}
                  orderCanceled={this.orderCancelHandler}
                  price={this.state.totalPrice}
               /> 
            </Modal>
            <Burger
               ingredients={this.state.ingredients}
            />
            <BuildControls 
               addIngredient={this.addIngredientHandler}
               removeIngredient={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchasable={this.state.purchasable}
               ordered={this.orderClickHandler}
            />
         </Fragment>
      );
   }
}

export default BurgerBuilder;