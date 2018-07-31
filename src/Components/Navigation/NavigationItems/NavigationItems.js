import React from 'react';
import Styles from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
const navigationItems = () => (
    <ul className={Styles.NavigationItems}>
        <NavigationItem link="/" exact>Build Burger</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
);

export default navigationItems;