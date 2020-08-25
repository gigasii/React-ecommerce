import React from 'react';
import Class from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
   <ul className={Class.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {
         !props.auth ? <NavigationItem link="/auth">Authenticate</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>
      }
   </ul>
);

export default navigationItems;