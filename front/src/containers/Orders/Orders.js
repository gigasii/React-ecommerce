import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import WithError from '../../hoc/withError';

class Orders extends Component
{
   state = {
      orders: [],
      loading: false
   }

   componentDidMount()
   {
      axios.get('/orders')
         .then(res => {
            const fetchedOrders = [];
            for (let index in res.data) 
            {
               fetchedOrders.push({
                  id: res.data[index]._id,
                  ingredients: res.data[index].ingredients,
                  price: res.data[index].price
               });
            }
            this.setState({
               loading: false,
               orders: fetchedOrders
            });
         })
         .catch(err => {
            this.setState({
               loading: false
            });
         });
   }

   render()
   {
      return (
         <div>
            {
               this.state.orders.map(order => (
                  <Order 
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price}
                  />
               ))
            }
         </div>
      );
   }
}

export default WithError(Orders, axios);