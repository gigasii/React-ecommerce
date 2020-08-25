import React, {Component, Fragment} from 'react';
import Class from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Context from '../../store/context';

class Auth extends Component
{
   // Initialization required for use of context
   static contextType = Context;

   state = {
      form: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your email'
            },
            value: '',
            valid: true
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Your password'
            },
            value: '',
            valid: true
         }
      },
      loading: false,
      signup: true
   }

   loading = (status) => {
      this.setState({
         loading: status
      });
   }

   inputChangedHandler = (identifier, event) => {
      const updatedForm = {...this.state.form};
      const updatedFormElement = {...this.state.form[identifier]};
      updatedFormElement.value = event.target.value;
      updatedForm[identifier] = updatedFormElement;
      this.setState({form: updatedForm});
   }

   switchModeHandler = () => {
      this.setState(prevState => {
         return {signup: !prevState.signup}
      });
   }

   submitHandler = (event) => {
      this.loading(true);
      // Prevent page from reloading after submitting 
      event.preventDefault();
      // Create the order
      const formData = {};
      for (let key in this.state.form)
      {
         formData[key] = this.state.form[key].value;
      }
      // Send a http request to server
      const route = this.state.signup ? '/signup' : '/login';
      axios.post(route, formData)
         .then(res => {
            this.loading(false);
            if (route === '/login')
            {
               localStorage.setItem(process.env.REACT_APP_TOKEN, res.data[process.env.REACT_APP_TOKEN]);
               return this.context.setAuthentication(true);
            }
         })
         .then(result => {
            this.props.history.replace('/');
         })
         .catch(err => this.loading(false));
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

      const formContent = !this.state.loading ? 
      (
         <Fragment>
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
               type="submit"
               styleType="Success"
               clicked={this.submitHandler}
            >SUBMIT</Button>
            <Button
               type="button"
               styleType="Danger"
               clicked={this.switchModeHandler}
            >{this.state.signup ? 'SIGNUP' : 'LOGIN'} MODE</Button>
         </Fragment>
      ) : <Spinner/>;

      return (
         <div className={Class.Auth}>
            <form>
               {formContent}
            </form>
         </div>
      );
   }
}

export default Auth;