import React from 'react';
import Styles from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={Styles.NavigationItem}>
    <NavLink exact={props.exact} activeClassName={Styles.active} to={props.link}>
        {props.children}</NavLink>
    </li>
);

export default navigationItem;