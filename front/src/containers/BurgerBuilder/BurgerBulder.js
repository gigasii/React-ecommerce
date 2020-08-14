import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withError';

const INGREDIENT_PRICES = {
   salad: 0.4,
   cheese: 0.5,
   meat: 1.4,
   bacon: 1.5
}

class BurgerBuilder extends Component 
{
   state = {
      ingredients: null,
      totalPrice: 3,
      purchasable: false,
      order: false
   }

   componentDidMount()
   {
      axios.get('/ingredients')
      .then(res => {
         this.setState({ingredients: res.data});
      })
      .catch(err => {})
   }

   updatePurchaseState(ingredients) 
   {
      const sum = Object.keys(ingredients).map(ingredientName => {
         return ingredients[ingredientName];
      })
      .reduce((sum, current) => {
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

   orderPurchaseHandler = () => {
      const queries = [];
      for (let key in this.state.ingredients)
      {
         queries.push(`${key}=${this.state.ingredients[key]}`);
      }
      queries.push(`price=${this.state.totalPrice}`);
      const queryParams = `?${queries.join('&')}`;
      this.props.history.push({
         pathname: '/checkout',
         search: queryParams
      });
   }

   render() 
   {
      // Check which button to disable
      const disabledInfo = {...this.state.ingredients};
      for (let key in disabledInfo)
      {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      
      // Check loading
      let orderSummary = this.state.ingredients ?
      (
         <OrderSummary
            ingredients={this.state.ingredients}
            orderContinued={this.orderPurchaseHandler}
            orderCanceled={this.orderCancelHandler}
            price={this.state.totalPrice}
         />
      ) : <Spinner/>;

      let burger = this.state.ingredients ?
      (
         <Fragment>
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
      ) : <Spinner/>;

      return (
         <Fragment>
            <Modal 
               show={this.state.order}
               modalClosed={this.orderCancelHandler}
            >
               {orderSummary}
            </Modal>
               {burger}
         </Fragment>
      );
   }
}

export default withError(BurgerBuilder, axios);