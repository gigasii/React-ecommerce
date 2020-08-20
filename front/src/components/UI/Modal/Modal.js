import React, { Component, Fragment } from 'react';
import Class from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component 
{
   shouldComponentUpdate(nextProps, nextState)
   {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
   }

   render() 
   {
      const classes = [Class.Modal];
      this.props.show ? classes.push(Class.Open) : classes.push(Class.Close);
      return (
         <Fragment>
            <Backdrop
               show={this.props.show}
               clicked={this.props.modalClosed}
            />
            <div className={classes.join(' ')}>
               {this.props.children}
            </div>
         </Fragment>
      );
   }
}

export default Modal;