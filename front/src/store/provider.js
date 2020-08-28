import React, {Component} from 'react';
import Context from './context';
import axios from '../axios';
import withError from '../hoc/withError';

const INGREDIENT_PRICES = {
   salad: 0.4,
   cheese: 0.5,
   meat: 1.4,
   bacon: 1.5
}

class Provider extends Component
{
   state = {
      ingredients: null,
      totalPrice: 0,
      purchasable: null,
      authenticate: false
   }

   setAuthenticationHandler = (status) => {
      return this.setState({authenticate: status});
   }

   setIngredientsHandler = () => {
      axios.get('/ingredients')
         .then(res => {
            this.setState({
               ingredients: res.data.ingredients,
               totalPrice: res.data.totalPrice,
               purchasable: res.data.purchasable
            });
         })
         .catch(err => {});
   }

   addIngredientHandler = (type) => { 
      const newIngredients = {...this.state.ingredients};
      ++newIngredients[type];
      const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({
         ingredients: newIngredients,
         totalPrice: newTotalPrice,
         purchasable: this.updatePurchaseState(newIngredients)
      });
   }

   removeIngredientHandler = (type) => {
      const newIngredients = {...this.state.ingredients};
      --newIngredients[type];
      const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
         ingredients: newIngredients,
         totalPrice: newTotalPrice ,
         purchasable: this.updatePurchaseState(newIngredients)
      });
   }

   updatePurchaseState(ingredients)
   {
      const sum = Object.keys(ingredients).map(ingredientName => {
         return ingredients[ingredientName];
      }).reduce((sum, current) => {
         return sum + current;
      }, 0);
      
      return (sum > 0);
   }

   render()
   {
      return (
         <Context.Provider
            value={{
               state: this.state,
               setIngredients: this.setIngredientsHandler,
               addIngredient: this.addIngredientHandler,
               removeIngredient: this.removeIngredientHandler,
               setAuthentication: this.setAuthenticationHandler
            }}
         >
            {this.props.children}
         </Context.Provider>
      );
   }
}

export default withError(Provider, axios);