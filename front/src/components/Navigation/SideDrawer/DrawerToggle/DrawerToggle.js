import React from 'react';
import Class from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div 
        className={Class.DrawerToggle} 
        onClick={props.clicked}
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;