import React from 'react';
import Class from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
   let transformedIngredients = Object.keys(props.ingredients).map(ingredientName => {
      return [...Array(props.ingredients[ingredientName])].map((_, index) => {
         return <BurgerIngredient
            key={ingredientName + index}
            type={ingredientName}
         />
      })
   }).reduce((sum, current) => {
      return sum.concat(current);
   }, []);

   if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Add ingredients</p>
   }

   return (
      <div className={Class.Burger}>
         <BurgerIngredient type="bread-top" />
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom" />
      </div>
   );
}

export default burger;