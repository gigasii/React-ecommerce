import React, {Component} from 'react';
import Class from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component
{
   state = {
      form: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name'
            },
            value: '',
            valid: true
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your E-Mail'
            },
            value: '',
            valid: true
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street'
            },
            value: '',
            valid: true
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'ZIP Code'
            },
            value: '',
            valid: true
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' }
               ]
            },
            value: 'fastest',
            valid: true
         }
      },
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
      const formData = {};
      for (let key in this.state.form)
      {
         formData[key] = this.state.form[key].value;
      }
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.totalPrice,
         customer: formData
      };
      // Send a http request to server
      axios.post('/order', order)
         .then(res => {
            if (!res.data.validation)
            {
               this.validationHandler(res.data.field);
               this.loading(false);
               return;
            }
            this.props.history.push('/');
         })
         .catch(err => {
            this.loading(false);
         });
   }

   validationHandler = (identifier) => {
      const updatedForm = {...this.state.form};
      let updatedFormElement;
      // Reset validation
      for (let key in updatedForm)
      {
         updatedFormElement = {...this.state.form[key]};
         updatedFormElement.valid = true;
         updatedForm[key] = updatedFormElement;
      }
      // Set new validation field error
      updatedFormElement = {...this.state.form[identifier]};
      updatedFormElement.valid = false;
      updatedForm[identifier] = updatedFormElement;
      // Set new state
      this.setState({form: updatedForm});
   }

   inputChangedHandler = (identifier, event) => {
      const updatedForm = {...this.state.form};
      const updatedFormElement = {...this.state.form[identifier]};
      updatedFormElement.value = event.target.value;
      updatedForm[identifier] = updatedFormElement;
      this.setState({form: updatedForm});
   }

   render()
   {
      // Dynamically set form inputs
      const formElementsArray = [];
      for (let key in this.state.form)
      {
         formElementsArray.push({
            id: key,
            config: this.state.form[key]
         });
      }

      // Check loading
      let form = !this.state.loading ?
      (
         <form onSubmit={this.orderHandler}>
            {
               formElementsArray.map(formElement => (
                  <Input
                     key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     changed={this.inputChangedHandler.bind(this, formElement.id)}
                     valid={formElement.config.valid}
                  />
               ))
            }
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