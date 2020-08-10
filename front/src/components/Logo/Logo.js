import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import Class from './Logo.css';

const logo = (props )=> (
    <div className={Class.Logo}>
        <img src={burgerLogo} alt="BurgerLogo"/>
    </div>
);

export default logo;