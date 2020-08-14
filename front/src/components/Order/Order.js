import React from 'react';
import Class from './Order.css';

const order = (props) => {
   const ingredients = [];
   for (let ingredientName in props.ingredients)
   {
      ingredients.push({
         name: ingredientName,
         amount: props.ingredients[ingredientName]
      });
   }
   const ingredientsOutput = ingredients.map(ig => {
      return <span key={ig.name}>{ig.name} ({ig.amount})</span>
   });
   
   return (
      <div className={Class.Order}>
         <p>Ingredients: {ingredientsOutput}</p>
         <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
      </div>
   );
};

export default order;