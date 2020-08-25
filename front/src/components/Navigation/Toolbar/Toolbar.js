import React from 'react';
import Class from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
   <header className={Class.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={Class.Logo}>
         <Logo />
      </div>
      <nav className={Class.DesktopOnly}>
         <NavigationItems auth={props.auth}/>
      </nav>
   </header>
);

export default toolbar;