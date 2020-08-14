import React, {Component} from 'react';
import Class from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component
{
   state = {
      loading: false
   }

   loading = (status) => {
      this.setState({
         loading: status
      });
   }

   orderHandler = (event) => {
      event.preventDefault();
      this.loading(true);
      // Create the order
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         customer: {
            name: 'Dummy',
            email: 'test@test.com',
            address: {
               street: 'Dummystreet',
               postalCode: 123456
            }
         }
      };
      // Send a http request to server
      axios.post('/order', order)
         .then(res => {
            this.loading(false);
            this.props.history.push('/');
         })
         .catch(err => {
            this.loading(false);
         });
   }

   render()
   {
      // Check loading
      let form = !this.state.loading ?
      (
         <form>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postalcode" placeholder="Postal Code" />
            <Button
               buttonType="Success"
               clicked={this.orderHandler}
            >Order</Button>
         </form>
      ) : <Spinner/>;

      return (
         <div className={Class.ContactData}>
            <h4>Enter your contact data:</h4>
            {form}
         </div>
      );
   }
}

export default ContactData;