import React from 'react';
import Styles from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
const navigationItems = () => (
    <ul className={Styles.NavigationItems}>
        <NavigationItem link="/" active>Build Burger</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems;