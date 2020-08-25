import React, { Fragment } from 'react';
import Class from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
   let classes = [Class.SideDrawer]
   props.show ? classes.push(Class.Open) : classes.push(Class.Close);
   return (
      <Fragment>
         <Backdrop
            show={props.show}
            clicked={props.closed}
         />
         <div 
            className={classes.join(' ')}
            onClick={props.closed}
         >
            <div className={Class.Logo}>
               <Logo/>
            </div>
            <nav>
               <NavigationItems auth={props.auth}/>
            </nav>
         </div>
      </Fragment>
   );
}

export default sideDrawer;