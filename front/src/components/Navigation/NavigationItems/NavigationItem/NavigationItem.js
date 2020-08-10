import React from 'react';
import Class from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={Class.NavigationItem}>
        <a
            href={props.link}
            className={props.active ? Class.active : null}
        >{props.children}</a>
    </li>
);

export default navigationItem;