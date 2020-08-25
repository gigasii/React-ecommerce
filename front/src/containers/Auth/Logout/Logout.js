import React, {Component, Fragment} from 'react';
import Context from '../../../store/context';

class Logout extends Component 
{
   // Initialization required for use of context
   static contextType = Context;

   async componentDidMount()
   {
      localStorage.removeItem(process.env.REACT_APP_TOKEN);
      await this.context.setAuthentication(false);
      this.props.history.replace('/');
   }

   render()
   {
      return (<Fragment></Fragment>);
   }
}

export default Logout; 