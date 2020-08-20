import React from 'react';
import Class from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
   <div className={Class.BuildControls}>
      <p>Current Price: ${props.price.toFixed(2)}</p>
      {
         controls.map(control => {
            return <BuildControl
               key={control.label}
               label={control.label}
               add={props.addIngredient.bind(this, control.type)}
               remove={props.removeIngredient.bind(this, control.type)}
               disableButton={props.disabled[control.type]}
            />
         })
      }
      <button
         className={Class.OrderButton}
         disabled={!props.purchasable}
         onClick={props.ordered}
      >ORDER NOW</button>
   </div>
);

export default buildControls;