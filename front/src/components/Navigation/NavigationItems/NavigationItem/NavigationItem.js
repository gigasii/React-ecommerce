import React from 'react';
import Class from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
   <li className={Class.NavigationItem}>
      <NavLink
         to={props.link}
         activeClassName={Class.active}
      >
         {props.children}
      </NavLink>
   </li>
);

export default navigationItem;