import React, {useEffect} from 'react';
import Class from './BurgerIngredient.css';

const burgerIngredient = (props) => {
   useEffect(() => console.log(`BurgerIngredient mounted`), []);

   let ingredient;
   switch (props.type) 
   {
      case 'bread-top':
         ingredient = (
            <div className={Class.BreadTop}>
               <div className={Class.Seeds1}></div>
               <div className={Class.Seeds2}></div>
            </div>
         );
         break;
      case 'bread-bottom':
         ingredient = <div className={Class.BreadBottom}></div>;
         break;
      case 'meat':
         ingredient = <div className={Class.Meat}></div>
         break;
      case 'cheese':
         ingredient = <div className={Class.Cheese}></div>
         break;
      case 'bacon':
         ingredient = <div className={Class.Bacon}></div>
         break;
      case 'salad':
         ingredient = <div className={Class.Salad}></div>
         break;
      default:
         ingredient = null;
         break;
   }
   return ingredient;
};

export default burgerIngredient;