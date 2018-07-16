import React from 'react';
import Styles from "./SideDrawer.css";
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
const sideDrawer = () => (
    <div className={Styles.SideDrawer}>
        <Logo height="11%"/>
        <nav><NavigationItems/></nav>
    </div>
);

export default sideDrawer;