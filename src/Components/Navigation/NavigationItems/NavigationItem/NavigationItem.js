import React from 'react';
import Styles from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={Styles.NavigationItem}>
    <a 
        href={props.link} 
        className={props.active ? Styles.active : null}>
        {props.children}</a>
    </li>
);

export default navigationItem;